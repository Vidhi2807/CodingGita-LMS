import React from "react";
import Navbar from "../components/Navbar";
import Attendance from "../components/Attendance";

export default function StudentAttendance() {
  const data = sessionStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  if (!user) return <div>No user</div>;

  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <Navbar />
      <Attendance user={user} />
    </div>
  );
}
