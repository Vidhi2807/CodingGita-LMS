import React from "react";
import Calendar from "../components/Calendar";
import Navbar from "../components/Navbar";

export default function StudentCalendar() {
  const data = sessionStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  if (!user) return <div>No user</div>;

  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <Navbar />
      <Calendar user={user} />
    </div>
  );
}
