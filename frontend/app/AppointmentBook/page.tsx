import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AppointmentBookProps {
  bool: boolean;
  closeDialog: () => void;
  url: number;
}

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

const AppointmentBook: React.FC<AppointmentBookProps> = ({
  bool,
  closeDialog,
  url,
}) => {
  const [open, setOpen] = useState<boolean>(bool);
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");

  const API = `http://localhost:5000/api/doctors/${url}`;

  useEffect(() => {
    setOpen(bool);
  }, [bool]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(API);
        if (!res.ok) throw new Error("Doctor not found");
        const data = await res.json();
        setDoctor(data[0]);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    if (!isNaN(url)) fetchDoctor();
  }, [url]);

  const handleBooking = () => {
    if (!patientName || !patientEmail || !selectedSlot) {
      setBookingStatus("Please fill all fields.");
      return;
    }

    // Simulate booking or send to backend
    const bookingDetails = {
      patientName,
      patientEmail,
      selectedSlot,
      doctorName: doctor?.name,
    };

    console.log("Booked Appointment:", bookingDetails);
    setBookingStatus("Appointment booked successfully!");
    setTimeout(() => {
      setBookingStatus("");
      closeDialog();
    }, 2000); // Close after 2 seconds
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(val) => {
        setOpen(val);
        if (!val) closeDialog();
      }}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Book Appointment with Dr. {doctor?.name}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-600 mb-2">
            {doctor?.availability?.length
              ? "Select a slot and fill in your details."
              : "Doctor is not available currently."}
          </AlertDialogDescription>

          {doctor?.availability && doctor?.availability.length > 0 && (
            <>
              <div className="space-y-3 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Name
                  </label>
                  <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    className="border rounded px-4 py-2 w-full"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Email
                  </label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    className="border rounded px-4 py-2 w-full"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Time Slot
                  </label>
                  <select
                    value={selectedSlot}
                    onChange={(e) => setSelectedSlot(e.target.value)}
                    className="border rounded px-4 py-2 w-full"
                  >
                    <option value="">-- Choose a time slot --</option>
                    {doctor.availability.map((slot, index) => (
                      <option key={index} value={slot}>
                        {new Date(slot).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {bookingStatus && (
            <p
              className={`mt-4 text-sm ${
                bookingStatus.includes("success")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {bookingStatus}
            </p>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant={"destructive"}
            onClick={closeDialog}
            className="cursor-pointer"
          >
            Cancel
          </Button>

          {doctor?.availability && doctor?.availability.length > 0 && (
            <Button
              variant={"outline"}
              className="bg-green-500 hover:bg-green-500 cursor-pointer text-white hover:text-white"
              onClick={handleBooking}
            >
              Continue
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AppointmentBook;
