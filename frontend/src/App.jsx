import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || '';
const minDate = new Date().toISOString().split('T')[0];

const initialForm = {
  branchId: '',
  date: '',
  startTime: '19:00',
  endTime: '20:00',
  name: '',
  phone: '',
};

export default function App() {
  const [branches, setBranches] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [bookingResult, setBookingResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadBranches = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/branches`);
        setBranches(response.data || []);
        if (response.data?.[0]) {
          setFormData((prev) => ({ ...prev, branchId: String(response.data[0].id) }));
        }
      } catch (err) {
        console.error('Failed to load branches', err);
      }
    };

    loadBranches();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setBookingResult(null);

    try {
      const response = await axios.post(`${BACKEND_URL}/api/bookings`, {
        name: formData.name,
        phone: formData.phone,
        branchId: Number(formData.branchId),
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
      });

      setBookingResult(response.data.booking);
    } catch (err) {
      console.error('Booking failed', err);
      setError(err?.response?.data?.error || 'We could not confirm your booking. Please try again in a moment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.14),_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#eefcf6_100%)] p-4 text-slate-800 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-[32px] border border-slate-200 bg-white px-6 py-6 shadow-sm sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-emerald-700">
                Eagle Box Cricket
              </div>
              <h1 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">Book a cricket venue</h1>
              <p className="mt-2 max-w-2xl text-sm text-slate-600 sm:text-base">
                Pick a branch, choose a date and time, and secure your slot with an instant booking confirmation.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600">
              <div className="font-semibold text-slate-900">Secure booking</div>
              <div className="mt-1 text-xs">Fast confirmation with automatic ground allocation</div>
            </div>
          </div>
        </header>

        <main className="mt-8 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-2xl font-semibold text-slate-900">Reserve your slot</h2>
            <p className="mt-3 text-sm text-slate-600 sm:text-base">
              Select a branch, enter your preferred date and timing, and submit your request. The system will find the first available ground automatically.
            </p>
            <div className="mt-8 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">1. Choose your branch</div>
                <div className="mt-1 text-sm text-slate-600">Select the venue location that fits your plan.</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">2. Pick date and time</div>
                <div className="mt-1 text-sm text-slate-600">The system checks availability across all grounds in the branch.</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-sm font-semibold text-slate-900">3. Confirm booking</div>
                <div className="mt-1 text-sm text-slate-600">If a ground is free, the booking is saved immediately.</div>
              </div>
            </div>
          </section>

          <section className="rounded-[32px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Branch</label>
                <select
                  name="branchId"
                  value={formData.branchId}
                  onChange={handleInputChange}
                  required
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                >
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>{branch.branch_name} — {branch.location}</option>
                  ))}
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Date</label>
                  <input
                    type="date"
                    name="date"
                    required
                    min={minDate}
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Time</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="time"
                      name="startTime"
                      required
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                    />
                    <input
                      type="time"
                      name="endTime"
                      required
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    placeholder="10-digit number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500"
                  />
                </div>
              </div>

              {error ? <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div> : null}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-2xl bg-emerald-700 px-4 py-3 font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Confirming booking...' : 'Confirm Booking'}
              </button>
            </form>

            {bookingResult ? (
              <div className="mt-6 rounded-[24px] border border-emerald-200 bg-emerald-50 p-4 text-sm text-slate-700">
                <div className="font-semibold text-emerald-900">Booking confirmed</div>
                <div className="mt-2 space-y-1">
                  <p><span className="font-medium">Customer:</span> {bookingResult.customerName}</p>
                  <p><span className="font-medium">Ground:</span> {bookingResult.groundName}</p>
                  <p><span className="font-medium">Date:</span> {bookingResult.date}</p>
                  <p><span className="font-medium">Time:</span> {bookingResult.startTime} - {bookingResult.endTime}</p>
                </div>
              </div>
            ) : null}
          </section>
        </main>
      </div>
    </div>
  );
}