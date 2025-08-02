"use client";
import React, { useEffect, useState } from "react";

type Doctor = {
  id: number;
  name: string;
  specialization: string;
  profileImage: string;
  availability: string[];
  experience: string;
  hospital: string;
  qualifications: string;
  bio: string;
};

export default function AdminPanel() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [newDoctor, setNewDoctor] = useState<Partial<Doctor>>({});
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [available, setAvailable] = useState<string[]>([]);
  const [editavailable, seteditAvailable] = useState<string[]>([]);

  const API = `${process.env.NEXT_PUBLIC_URL}/api/doctors`; // Adjust to your backend port

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setDoctors(data);
  };

  const handleAdd = async () => {
    if (
      !newDoctor.name ||
      !newDoctor.specialization ||
      !newDoctor.profileImage ||
      !newDoctor.experience ||
      !newDoctor.hospital ||
      !newDoctor.qualifications ||
      !newDoctor.bio
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const formattedDoctor = {
      ...newDoctor,
      availability: available,
    };

    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedDoctor),
    });

    setNewDoctor({});
    setAvailable([]);
    fetchDoctors();
  };

  const handleDelete = async (id: number) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchDoctors();
  };

  const handleUpdate = async () => {
    if (!editingDoctor) return;
    const newUpdated = { ...editingDoctor, availability: editavailable };
    await fetch(`${API}/${editingDoctor.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUpdated),
    });
    setEditingDoctor(null);
    fetchDoctors();
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Admin Panel - Manage Doctors</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <h2 className="text-xl font-semibold">Add New Doctor</h2>
          {[
            "name",
            "specialization",
            "experience",
            "hospital",
            "qualifications",
            "bio",
            "profileImage",
          ].map((field) => (
            <input
              key={field}
              type="text"
              required={true}
              placeholder={field}
              value={newDoctor[field as keyof Doctor] || ""}
              onChange={(e) =>
                setNewDoctor({ ...newDoctor, [field]: e.target.value })
              }
              className="border p-2 my-1 w-full text-white"
            />
          ))}

          <input
            type="text"
            placeholder="Availability (e.g. 2025-08-01T10:00, 2025-08-01T11:30)"
            className="border p-2 my-1 w-full"
            value={available}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAvailable(e.target.value.split(",").map((d) => d.trim()))
            }
          />
          <button
            onClick={handleAdd}
            className="bg-green-500 text-white px-4 py-2 mt-2 rounded"
          >
            Add Doctor
          </button>
        </div>

        {editingDoctor && (
          <div>
            <h2 className="text-xl font-semibold">Edit Doctor</h2>
            {[
              "name",
              "specialization",
              "experience",
              "hospital",
              "qualifications",
              "bio",
              "profileImage",
            ].map((field) => (
              <input
                key={field}
                type="text"
                placeholder={field}
                value={editingDoctor[field as keyof Doctor] || ""}
                onChange={(e) =>
                  setEditingDoctor({
                    ...editingDoctor,
                    [field]: e.target.value,
                  })
                }
                className="border p-2 my-1 w-full"
              />
            ))}

            <input
              type="text"
              placeholder="Availability (e.g. 2025-08-01T10:00, 2025-08-01T11:30)"
              className="border p-2 my-1 w-full"
              value={editavailable} // display as comma-separated string
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                seteditAvailable(
                  e.target.value
                    .split(",")
                    .map((d) => d.trim())
                    .filter((d) => d !== "") // removes empty values
                )
              }
            />

            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-4 py-2 mt-2 rounded"
            >
              Update Doctor
            </button>
          </div>
        )}
      </div>

      <h2 className="text-xl font-semibold mb-2">Doctor List</h2>
      <table className="w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100 text-black">
            <th className="border p-2">Name</th>
            <th className="border p-2">Specialization</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doc) => (
            <tr key={doc.id}>
              <td className="border p-2">{doc.name}</td>
              <td className="border p-2">{doc.specialization}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => {
                    setEditingDoctor(doc);
                    seteditAvailable(doc.availability);
                  }}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
