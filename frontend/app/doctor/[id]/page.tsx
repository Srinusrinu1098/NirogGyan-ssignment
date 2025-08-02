"use client";

import { notFound, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import AppointmentBook from "@/app/AppointmentBook/page";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  profileImage: string;
  availability: string[] | null;
  experience: string;
  hospital: string;
  qualifications: string;
  bio: string;
}

export default function DoctorProfile() {
  const params = useParams();
  const doctorId = Number(params?.id);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [sendbool, setsendbool] = useState<boolean>(false);

  const API = `http://localhost:5000/api/doctors/${doctorId}`;

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("Doctor not found");

        const data = await res.json();
        setDoctor(data[0]);
      } catch (error) {
        console.error("Error fetching doctor:", error);
        setDoctor(null);
      } finally {
        setLoading(false);
      }
    };

    if (!isNaN(doctorId)) fetchDoctor();
    else setLoading(false);
  }, [doctorId]);

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!doctor) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <Link href={"/doctorsList"}>
          <ArrowBigLeft className="cursor-pointer" />
        </Link>

        <div className="flex flex-col md:flex-row items-center gap-8">
          <img
            src={doctor.profileImage}
            alt={`Profile of ${doctor.name}`}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-400 shadow-md"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-blue-700">{doctor.name}</h1>
            <p className="text-lg text-gray-600 mt-1">
              {doctor.specialization}
            </p>
            <p className="mt-2 text-sm text-gray-500 italic">
              {doctor.hospital}
            </p>
          </div>
        </div>

        <div className="mt-8 space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-blue-600">Experience</h2>
            <p className="text-gray-700">{doctor.experience}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600">
              Qualifications
            </h2>
            <p className="text-gray-700">{doctor.qualifications}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600">About</h2>
            <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-blue-600">
              Availability
            </h2>
            {doctor.availability && doctor.availability.length > 0 ? (
              <ul className="list-disc ml-6 text-gray-800">
                {doctor.availability.map((slot, index) => (
                  <li key={index}>
                    {new Date(slot).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-600 font-medium">
                Not Available / On Leave
              </p>
            )}
          </div>

          <div className="text-center pt-4" onClick={() => setsendbool(true)}>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer font-semibold px-6 py-2 rounded-lg shadow">
              Book Appointment
            </Button>
          </div>
          {sendbool && (
            <AppointmentBook
              bool={true}
              closeDialog={() => setsendbool(false)}
              url={doctorId}
            />
          )}
        </div>
      </div>
    </div>
  );
}
