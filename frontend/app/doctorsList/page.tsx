"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
interface Doctor {
  id: number;
  name: string;
  specialization: string;
  profileImage: string;
  availability: string[] | null;
}

// Make sure this interface is defined

const LandingPage: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  const API = `${process.env.NEXT_PUBLIC_URL}/api/doctors`; // Adjust to your backend port

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setDoctors(data);
    setLoading(false);
  };

  const getStatus = (doctor: Doctor): string => {
    if (!doctor.availability) return "On Leave";
    if (doctor.availability.length === 0) return "Fully Booked";
    return "Available Today";
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  const filteredDoctors = doctors.filter(
    (doc) =>
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        Book Your Doctor Appointment
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by name or specialization"
          className="w-full px-4 py-2 text-black border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div
            key={doctor.id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition"
          >
            <img
              src={doctor.profileImage}
              alt={doctor.name}
              className="w-24 h-24 rounded-full mx-auto object-cover border"
            />
            <h2 className="text-xl font-semibold text-black text-center mt-4">
              {doctor.name}
            </h2>
            <p className="text-center text-gray-600">{doctor.specialization}</p>
            <p className="text-center mt-2">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  getStatus(doctor) === "Available Today"
                    ? "bg-green-100 text-green-800"
                    : getStatus(doctor) === "Fully Booked"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {getStatus(doctor)}
              </span>
            </p>
            <div className="mt-4 text-center">
              <Link href={`/doctor/${doctor.id}`}>
                <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2 px-4 rounded-lg text-sm">
                  View Profile
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
