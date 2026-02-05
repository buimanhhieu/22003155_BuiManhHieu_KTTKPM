const amqp = require("amqplib");

// Configuration
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://user:password@rabbitmq:5672";
const QUEUE = process.env.QUEUE_NAME || "order_queue";
const DLQ = process.env.DLQ_NAME || "order_queue.dlq";
const EXCHANGE = process.env.EXCHANGE_NAME || ""; // Default exchange

async function connectWithRetry() {
  try {
    console.log("Consumer connecting to RabbitMQ...");
    const conn = await amqp.connect(RABBITMQ_URL);
    
    conn.on("error", (err) => {
      console.error("RabbitMQ connection error:", err);
      setTimeout(connectWithRetry, 3000);
    });

    conn.on("close", () => {
      console.warn("RabbitMQ connection closed");
      setTimeout(connectWithRetry, 3000);
    });

    const channel = await conn.createChannel();
    
    // Ensure we process one message at a time appropriately if needed, 
    // but here we can stick to default or prefetch 1 ensures fair dispatch
    await channel.prefetch(1);

    // Assert Quenes (Idempotent)
    await channel.assertQueue(DLQ, { durable: true });
    await channel.assertQueue(QUEUE, {
      durable: true,
      deadLetterExchange: EXCHANGE,
      deadLetterRoutingKey: DLQ,
    });

    console.log(`Waiting for messages in ${QUEUE}...`);

    channel.consume(
      QUEUE,
      async (msg) => {
        if (!msg) return;

        const content = msg.content.toString();
        console.log(`[o] Received: ${content}`);

        try {
          const data = JSON.parse(content);

          // Simulate processing logic
          if (!data.orderId) {
            throw new Error("Missing orderId - Invalid Message");
          }

          // Simulate processing time
          await new Promise(resolve => setTimeout(resolve, 1000));

          console.log(`[v] Processed Order: ${data.orderId}`);
          channel.ack(msg);
          
        } catch (err) {
          console.error(`[x] Error processing message: ${err.message}`);
          console.log("-> NACK (requeue=false), sending to DLQ");
          
          // Requeue = false sends it to DLQ because of deadLetter configurations
          channel.nack(msg, false, false);
        }
      },
      { noAck: false }
    );

  } catch (err) {
    console.error("Consumer failed to connect:", err.message);
    console.log("Retrying in 3s...");
    setTimeout(connectWithRetry, 3000);
  }
}

connectWithRetry();
