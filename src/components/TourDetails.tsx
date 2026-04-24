import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiService from "../services/api";
import type { Tour } from "../types";
import { useAuth } from "../context/AuthContext";

interface TourLocationState {
  tour?: Tour;
}

const TourDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useAuth();
  const [tour, setTour] = useState<Tour | null>(
    () => (location.state as TourLocationState | null)?.tour ?? null,
  );
  const [loading, setLoading] = useState(
    () => !(location.state as TourLocationState | null)?.tour,
  );
  const [error, setError] = useState<string | null>(null);
  const [booking, setBooking] = useState(false);
  const [bookingResult, setBookingResult] = useState<{
    status: string;
    bookingId?: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const fetchTourDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getTourById(id!);
        setTour(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load tour details";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    if (!tour && id) {
      fetchTourDetails();
    }
  }, [id, tour]);

  const handleBooking = async () => {
    if (!userId) {
      setError("Please log in to book a tour");
      return;
    }

    if (!tour) {
      setError("Tour information not available");
      return;
    }

    setBooking(true);
    setBookingResult(null);
    try {
      const response = await apiService.bookTour({
        userId,
        tourId: tour.id,
      });
      setBookingResult(response);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Booking failed";
      setBookingResult({
        status: "fail",
        message: errorMessage,
      });
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          <button
            onClick={() => navigate("/tours")}
            className="text-indigo-600 hover:text-indigo-700 mb-4 font-semibold"
          >
            ← Back to Tours
          </button>
          <div className="bg-white rounded-lg shadow p-8">
            <p className="text-red-600 text-center">
              {error || "Tour not found"}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <button
          onClick={() => navigate("/tours")}
          className="mb-6 flex items-center font-semibold text-sky-700 hover:text-sky-800"
        >
          ← Back to Tours
        </button>

        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
          <div className="relative flex h-96 items-center justify-center bg-gradient-to-br from-cyan-500 via-sky-600 to-slate-950">
            {tour.image ? (
              <img
                src={tour.image}
                alt={tour.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center text-white">
                <div className="mb-4 text-6xl">✈️</div>
                <p className="text-3xl">{tour.destination}</p>
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-900/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex flex-wrap items-end justify-between gap-4 p-8 text-white">
              <div>
                <p className="mb-3 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] backdrop-blur">
                  Tour detail
                </p>
                <h1 className="text-4xl font-bold">{tour.name}</h1>
                <p className="mt-2 text-lg text-slate-200">
                  {tour.destination}
                </p>
              </div>
              <div className="rounded-[24px] bg-white/10 px-5 py-4 text-right backdrop-blur">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-200">
                  Price
                </p>
                <p className="mt-1 text-3xl font-bold">${tour.price}</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {error && (
              <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <p className="font-medium text-rose-700">{error}</p>
              </div>
            )}

            {bookingResult && (
              <div
                className={`mb-8 rounded-2xl border p-5 ${
                  bookingResult.status === "success"
                    ? "border-emerald-200 bg-emerald-50"
                    : "border-rose-200 bg-rose-50"
                }`}
              >
                <p
                  className={`font-semibold ${bookingResult.status === "success" ? "text-emerald-700" : "text-rose-700"}`}
                >
                  {bookingResult.status === "success"
                    ? "Booking completed"
                    : "Booking failed"}
                </p>
                <p
                  className={`mt-2 ${bookingResult.status === "success" ? "text-emerald-700" : "text-rose-700"}`}
                >
                  {bookingResult.message}
                </p>
                {bookingResult.bookingId && (
                  <p className="mt-3 text-sm font-medium text-slate-700">
                    Booking ID:{" "}
                    <span className="font-bold">{bookingResult.bookingId}</span>
                  </p>
                )}
              </div>
            )}

            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="rounded-[28px] bg-slate-950 p-6 text-white">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                  Duration
                </p>
                <p className="mt-3 text-3xl font-bold">{tour.duration} days</p>
              </div>
              <div className="rounded-[28px] bg-sky-50 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-sky-700">
                  Price per person
                </p>
                <p className="mt-3 text-3xl font-bold text-sky-800">
                  ${tour.price}
                </p>
              </div>
              <div className="rounded-[28px] bg-amber-50 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-amber-700">
                  Rating
                </p>
                <p className="mt-3 text-3xl font-bold text-amber-700">
                  ⭐ {tour.rating || "N/A"}
                </p>
              </div>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_0.75fr]">
              <section className="rounded-[28px] border border-slate-200 bg-slate-50 p-6">
                <h2 className="text-2xl font-bold text-slate-900">
                  About This Tour
                </h2>
                <p className="mt-4 leading-8 text-slate-700">
                  {tour.description}
                </p>
              </section>

              <aside className="rounded-[28px] border border-slate-200 bg-white p-6">
                <h3 className="text-lg font-bold text-slate-900">
                  Tour Snapshot
                </h3>
                <div className="mt-5 space-y-4 text-sm text-slate-600">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">
                      Maximum Capacity
                    </p>
                    <p className="mt-1">{tour.maxCapacity || "N/A"} persons</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">Start Date</p>
                    <p className="mt-1">
                      {tour.startDate || "Contact for available dates"}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="font-semibold text-slate-900">Tour ID</p>
                    <p className="mt-1">{tour.id}</p>
                  </div>
                </div>
              </aside>
            </div>

            {!bookingResult || bookingResult.status !== "success" ? (
              <div className="flex flex-col gap-5 rounded-[28px] bg-slate-950 p-6 text-white md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-300">
                    Book this tour
                  </p>
                  <p className="mt-3 max-w-2xl text-slate-200">
                    This action sends `POST /book-tour` with your authenticated
                    `userId` and the selected `tourId`.
                  </p>
                  <p className="mt-4 text-3xl font-bold">${tour.price}</p>
                </div>
                <button
                  onClick={handleBooking}
                  disabled={booking || !userId}
                  className="rounded-full bg-white px-8 py-3 font-bold text-slate-950 transition hover:bg-sky-100 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {booking
                    ? "Processing booking..."
                    : !userId
                      ? "Log in to book"
                      : "Book now"}
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigate("/tours")}
                className="w-full rounded-full bg-slate-950 py-3 font-bold text-white transition hover:bg-sky-700"
              >
                Return to all tours
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
