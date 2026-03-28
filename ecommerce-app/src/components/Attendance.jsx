import React from "react";

const todayEntries = [
  {
    subject: "SU0203 - NoSQL Database(MongoDB/Redis)",
    markedBy: "Reena",
    status: "present",
  },
  {
    subject: "SU0202 - NodeJS",
    markedBy: "Reena",
    status: "present",
  },
  {
    subject: "SU0204 - OOPS(C++)",
    markedBy: "Reena",
    status: "present",
  },
];

export default function Attendance({ user }) {
  const entries = user?.todayAttendance?.length
    ? user.todayAttendance
    : todayEntries;

  return (
    <div className="mx-auto max-w-[1880px] px-4 pb-10 sm:px-6 lg:px-8">
      <section className="overflow-hidden rounded-[24px] border border-neutral-800 bg-[#171717]">
        <div className="border-b border-neutral-800 px-6 py-7">
          <h1 className="text-[22px] font-semibold text-white sm:text-[24px]">
            Overview
          </h1>
        </div>

        <div className="p-6">
          <div className="rounded-[24px] border border-neutral-800 bg-[#171717]">
            <div className="border-b border-neutral-800 px-6 py-7">
              <h2 className="text-[22px] font-semibold text-white sm:text-[24px]">
                Today&apos;s Attendance
              </h2>
              <p className="mt-1 text-[16px] text-neutral-400">
                Date: 2026-03-28
              </p>
            </div>

            <div className="space-y-4 p-6">
              {entries.map((entry) => (
                <div
                  key={entry.subject}
                  className="flex flex-col gap-4 rounded-[18px] border border-neutral-800 bg-black px-5 py-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-[18px] text-white sm:text-[20px]">
                      {entry.subject}
                    </p>
                    <p className="mt-1 text-[15px] text-neutral-400 sm:text-[16px]">
                      Marked by: {entry.markedBy}
                    </p>
                  </div>

                  <span className="inline-flex w-fit items-center rounded-xl border border-emerald-700 bg-emerald-950 px-4 py-1.5 text-[14px] font-medium capitalize text-emerald-300">
                    {entry.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
