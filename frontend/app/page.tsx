"use client";

import Link from "next/link";
import { useRef } from "react";

export default function Home() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 flex flex-col justify-center items-center text-center p-8">
        <h1 className="text-5xl font-extrabold text-blue-800 mb-4">
          Find the Best Doctors Near You
        </h1>
        <p className="text-xl text-blue-700 max-w-xl mb-6">
          Book appointments with trusted professionals across specializations
        </p>
        <Link href={"/doctorsList"}>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 cursor-pointer text-white text-lg font-semibold rounded-lg shadow-md transition">
            View Doctors
          </button>
        </Link>
      </section>

      {/* Doctors List Section */}
    </div>
  );
}
