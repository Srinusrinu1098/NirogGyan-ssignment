const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const doctorsPath = path.join(__dirname, "../doctors.json");

const readDoctors = () => JSON.parse(fs.readFileSync(doctorsPath));
const writeDoctors = (data) =>
  fs.writeFileSync(doctorsPath, JSON.stringify(data, null, 2));

// GET all doctors
router.get("/", (req, res) => {
  const doctors = readDoctors();
  res.json(doctors);
});

router.get("/:id", (req, res) => {
  const doctors = readDoctors().filter((doc) => doc.id == req.params.id);
  res.json(doctors);
});

// POST a new doctor
router.post("/", (req, res) => {
  const doctors = readDoctors();
  const newDoctor = { id: Date.now(), ...req.body };
  doctors.push(newDoctor);
  writeDoctors(doctors);
  res.status(201).json(newDoctor);
});

// PUT update doctor
router.put("/:id", (req, res) => {
  const doctors = readDoctors();
  const updatedDoctors = doctors.map((doc) =>
    doc.id == req.params.id ? { ...doc, ...req.body } : doc
  );
  writeDoctors(updatedDoctors);
  res.json({ message: "Doctor updated." });
});

// DELETE doctor
router.delete("/:id", (req, res) => {
  const doctors = readDoctors().filter((doc) => doc.id != req.params.id);
  writeDoctors(doctors);
  res.json({ message: "Doctor deleted." });
});

module.exports = router;
