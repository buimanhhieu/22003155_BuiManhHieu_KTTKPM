import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../services/api";
import type { CreateTourRequest } from "../types";

const EMPTY_FORM: CreateTourRequest = {
  name: "",
  destination: "",
  price: 0,
  duration: 1,
  description: "",
  image: "",
  startDate: "",
  rating: undefined,
  maxCapacity: undefined,
};

const SellerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CreateTourRequest>(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "number" ? (value === "" ? undefined : Number(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!form.name.trim() || !form.destination.trim() || !form.description.trim()) {
      setError("Name, destination, and description are required.");
      return;
    }
    if (form.price <= 0) {
      setError("Price must be greater than 0.");
      return;
    }
    if (form.duration < 1) {
      setError("Duration must be at least 1 day.");
      return;
    }

    setSubmitting(true);
    try {
      const payload: CreateTourRequest = {
        name: form.name.trim(),
        destination: form.destination.trim(),
        price: form.price,
        duration: form.duration,
        description: form.description.trim(),
        ...(form.image?.trim() && { image: form.image.trim() }),
        ...(form.startDate?.trim() && { startDate: form.startDate.trim() }),
        ...(form.rating !== undefined && { rating: form.rating }),
        ...(form.maxCapacity !== undefined && { maxCapacity: form.maxCapacity }),
      };

      await apiService.createTour(payload);
      setSuccess(`Tour "${form.name}" has been added successfully!`);
      setForm(EMPTY_FORM);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add tour.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <button
          onClick={() => navigate("/tours")}
          className="mb-6 flex items-center font-semibold text-sky-700 hover:text-sky-800"
        >
          ← Back to Tours
        </button>

        <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-xl">
          <div className="bg-slate-950 px-8 py-8 text-white">
            <p className="mb-2 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-1 text-sm font-medium text-sky-100">
              Seller Dashboard
            </p>
            <h1 className="text-3xl font-bold tracking-tight">Add New Tour</h1>
            <p className="mt-2 text-slate-300">
              Fill in the details below to list a new tour for customers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
                <p className="font-medium text-rose-700">{error}</p>
              </div>
            )}
            {success && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="font-medium text-emerald-700">{success}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Tour Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="e.g. Bali Adventure Tour"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Destination <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  placeholder="e.g. Bali, Indonesia"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Price (USD) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price || ""}
                  onChange={handleChange}
                  min={1}
                  placeholder="e.g. 999"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Duration (days) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  name="duration"
                  value={form.duration || ""}
                  onChange={handleChange}
                  min={1}
                  placeholder="e.g. 7"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Description <span className="text-rose-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Describe the tour itinerary, highlights, and what's included..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200 resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Image URL <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  name="image"
                  value={form.image || ""}
                  onChange={handleChange}
                  placeholder="https://example.com/tour-image.jpg"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Start Date <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={form.startDate || ""}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Max Capacity <span className="text-slate-400 font-normal">(optional)</span>
                </label>
                <input
                  type="number"
                  name="maxCapacity"
                  value={form.maxCapacity ?? ""}
                  onChange={handleChange}
                  min={1}
                  placeholder="e.g. 20"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">
                  Rating <span className="text-slate-400 font-normal">(optional, 1–5)</span>
                </label>
                <input
                  type="number"
                  name="rating"
                  value={form.rating ?? ""}
                  onChange={handleChange}
                  min={1}
                  max={5}
                  step={0.1}
                  placeholder="e.g. 4.5"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder-slate-400 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-200"
                />
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => { setForm(EMPTY_FORM); setError(null); setSuccess(null); }}
                className="rounded-full border border-slate-200 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Reset
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-full bg-slate-950 px-8 py-3 font-bold text-white transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {submitting ? "Adding tour..." : "Add Tour"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
