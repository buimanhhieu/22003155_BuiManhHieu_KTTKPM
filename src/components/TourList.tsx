import React, { useEffect, useState } from "react";
import apiService from "../services/api";
import type { Tour } from "../types";
import { useNavigate } from "react-router-dom";

const TourList: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await apiService.getTours();
        setTours(data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to load tours";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading tours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <section className="mb-10 overflow-hidden rounded-[32px] bg-slate-950 px-8 py-10 text-white shadow-2xl sm:px-10">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-medium text-sky-100">
              Orchestrator-powered booking flow
            </p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Choose the next trip your customers will remember.
            </h1>
            <p className="mt-4 text-base leading-7 text-slate-300 sm:text-lg">
              Browse tours loaded from the Orchestrator, open any itinerary for
              full details, then complete booking in one clean flow.
            </p>
          </div>
        </section>

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-slate-900">
              Available Tours
            </h2>
            <p className="mt-2 text-slate-600">
              Live inventory pulled from `GET /tours`.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm">
            {tours.length} {tours.length === 1 ? "tour" : "tours"} ready to book
          </div>
        </div>

        {error && (
          <div className="mb-6 max-w-2xl rounded-2xl border border-rose-200 bg-rose-50 p-4">
            <p className="font-medium text-rose-700">{error}</p>
          </div>
        )}

        {tours.length === 0 ? (
          <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-16 text-center shadow-sm">
            <p className="text-lg font-semibold text-slate-800">
              No tours available right now.
            </p>
            <p className="mt-2 text-slate-500">
              Try again once the Orchestrator has tour data ready.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="group cursor-pointer overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                onClick={() =>
                  navigate(`/tour/${tour.id}`, { state: { tour } })
                }
              >
                <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-500 via-sky-600 to-slate-900">
                  {tour.image ? (
                    <img
                      src={tour.image}
                      alt={tour.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-center text-white">
                      <div className="mb-2 text-4xl">✈️</div>
                      <p>{tour.destination}</p>
                    </div>
                  )}
                  <div className="absolute left-4 top-4 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                    Tour #{tour.id}
                  </div>
                </div>

                <div className="p-6">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {tour.name}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {tour.destination}
                      </p>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                      ⭐ {tour.rating || "N/A"}
                    </span>
                  </div>

                  <p className="mb-5 line-clamp-2 min-h-[3rem] text-sm leading-6 text-slate-600">
                    {tour.description}
                  </p>

                  <div className="mb-5 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Duration
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {tour.duration} days
                      </p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-4">
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        Capacity
                      </p>
                      <p className="mt-1 font-semibold text-slate-900">
                        {tour.maxCapacity || "N/A"} guests
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                          Price
                        </p>
                        <span className="text-2xl font-bold text-sky-700">
                          ${tour.price}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/tour/${tour.id}`, { state: { tour } });
                        }}
                        className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
                      >
                        View details
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TourList;
