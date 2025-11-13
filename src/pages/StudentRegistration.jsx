import { useState } from "react";
export default function StudentRegistration() {
  const [form, setForm] = useState({ name: "", class: "", section: "", roll: "" });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  function handleSubmit(e) {
    e.preventDefault();
    // Save logic here (API/localStorage)
    setMessage("Student registered!");
    setForm({ name: "", class: "", section: "", roll: "" });
  }
  return (
    <div className="pt-28 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4">Register Student</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-[300px] bg-white p-6 rounded-lg shadow">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" required />
        <input name="class" value={form.class} onChange={handleChange} placeholder="Class" className="p-2 border rounded" required />
        <input name="section" value={form.section} onChange={handleChange} placeholder="Section" className="p-2 border rounded" required />
        <input name="roll" value={form.roll} onChange={handleChange} placeholder="Roll No." className="p-2 border rounded" required />
        <button type="submit" className="bg-indigo-600 text-white py-2 rounded font-semibold">Register</button>
      </form>
      {message && <div className="mt-3 text-green-600">{message}</div>}
    </div>
  );
}
