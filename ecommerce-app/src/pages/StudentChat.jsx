import React from "react";
import Navbar from "../components/Navbar";
import Chat from "../components/Chat";

export default function StudentChat() {
  const data = sessionStorage.getItem("user");
  const user = data ? JSON.parse(data) : null;

  if (!user) return <div>No user</div>;

  return (
    <div className="min-h-screen bg-black pt-20 text-white">
      <Navbar />
      <Chat user={user} />
    </div>
  );
}
