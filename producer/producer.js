const express = require("express");
const amqp = require("amqplib");

const app = express();
app.use(express.json());

// Configuration
const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://user:password@rabbitmq:5672";
const QUEUE = process.env.QUEUE_NAME || "order_queue";
const DLQ = process.env.DLQ_NAME || "order_queue.dlq";
const EXCHANGE = process.env.EXCHANGE_NAME || ""; // Default exchange

let channel;

async function connectRabbitMQ() {
  while (true) {
    try {
      console.log("Producer connecting to RabbitMQ...");
      const conn = await amqp.connect(RABBITMQ_URL);
      
      conn.on("error", (err) => {
        console.error("RabbitMQ connection error:", err);
        channel = null;
        setTimeout(connectRabbitMQ, 3000); // Reconnect on connection error
      });

      conn.on("close", () => {
        console.warn("RabbitMQ connection closed");
        channel = null;
        setTimeout(connectRabbitMQ, 3000); // Reconnect on connection close
      });

      channel = await conn.createChannel();

      // Assert DLQ first
      await channel.assertQueue(DLQ, {
        durable: true
      });

      // Assert Main Queue with DLQ arguments
      await channel.assertQueue(QUEUE, {
        durable: true,
        deadLetterExchange: EXCHANGE,
        deadLetterRoutingKey: DLQ,
      });

      console.log("Producer connected to RabbitMQ");
      break;
    } catch (err) {
      console.error("Failed to connect to RabbitMQ:", err.message);
      console.log("Retrying in 3s...");
      await new Promise((r) => setTimeout(r, 3000));
    }
  }
}

app.post("/send", async (req, res) => {
  const { message, orderId } = req.body;

  if (!message || !orderId) {
    return res.status(400).json({ error: "message and orderId are required" });
  }

  if (!channel) {
    return res.status(503).json({ error: "RabbitMQ not connected" });
  }

  const data = {
    message,
    orderId,
    timestamp: new Date().toISOString()
  };

  try {
    const sent = channel.sendToQueue(
      QUEUE,
      Buffer.from(JSON.stringify(data)),
      {
        persistent: true // Ensure message is saved to disk
      }
    );

    if (sent) {
      console.log(`[x] Sent order ${orderId}:`, data);
      res.status(200).json({ status: "sent", data });
    } else {
      console.warn("Message buffer full, failed to send");
      res.status(503).json({ error: "Service busy, please try again" });
    }
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start connection
connectRabbitMQ();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Producer API listening on port ${PORT}`);
});
