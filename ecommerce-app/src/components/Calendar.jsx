import React, { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const legendItems = [
  { label: "Assignment", color: "bg-blue-500" },
  { label: "holiday", color: "bg-pink-500" },
  { label: "exam", color: "bg-red-500" },
  { label: "class test", color: "bg-orange-500" },
  { label: "result announcement", color: "bg-violet-500" },
  { label: "orientation", color: "bg-sky-500" },
  { label: "convocation", color: "bg-fuchsia-500" },
  { label: "Personal reasons", color: "bg-amber-500" },
  { label: "Festival celebration", color: "bg-orange-500" },
  { label: "Hackathon participation", color: "bg-cyan-500" },
  {
    label: "College events (seminars, workshops, competitions, etc.)",
    color: "bg-blue-500",
  },
  { label: "Sick leave / medical reasons", color: "bg-rose-500" },
  { label: "Placement drives", color: "bg-emerald-500" },
  { label: "Company work (official tasks or visits)", color: "bg-indigo-500" },
  { label: "Interviews", color: "bg-teal-500" },
  { label: "Family functions", color: "bg-pink-500" },
  { label: "Emergency situations", color: "bg-pink-500" },
  { label: "Travel-related reasons", color: "bg-sky-500" },
  { label: "Duty leave", color: "bg-violet-500" },
  { label: "Others", color: "bg-neutral-500" },
];

const weekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const initialMonth = new Date(2026, 2, 1);
const initialSelectedDate = new Date(2026, 2, 28);

const dateKey = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const displayDate = (date) =>
  `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

const buildCalendarDays = (monthDate) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const leadingBlanks = firstDay.getDay();
  const totalDays = lastDay.getDate();

  return [
    ...Array.from({ length: leadingBlanks }, (_, index) => ({
      id: `blank-${index}`,
      empty: true,
    })),
    ...Array.from({ length: totalDays }, (_, index) => {
      const day = new Date(year, month, index + 1);
      return {
        id: dateKey(day),
        empty: false,
        date: day,
      };
    }),
  ];
};

export default function Calendar({ user }) {
  const today = initialSelectedDate;
  const [visibleMonth, setVisibleMonth] = useState(initialMonth);
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);

  const selectedDateLabel = displayDate(selectedDate);
  const calendarDays = useMemo(
    () => buildCalendarDays(visibleMonth),
    [visibleMonth],
  );

  const dateDetails = useMemo(() => {
    const nodeSubject =
      user?.subjects?.find((subject) => subject.includes("NodeJS")) || "NodeJS";
    const noSqlSubject =
      user?.subjects?.find((subject) => subject.includes("NoSQL")) ||
      "NoSQL Database(MongoDB/Redis)";

    return {
      [dateKey(today)]: {
        events: [],
        leaves: [],
        attendance: [
          `${noSqlSubject.replace(/^SU\d+\s-\s/, "")}__STATUS__present`,
          `${nodeSubject.replace(/^SU\d+\s-\s/, "")}__STATUS__present`,
        ],
        assignments: [],
      },
      "2026-03-10": {
        events: ["Hackathon participation"],
        leaves: [],
        attendance: ["JavaScript__STATUS__present"],
        assignments: ["UI/UX FIGMA wireframe submission"],
      },
      "2026-03-17": {
        events: ["Class test - C Language"],
        leaves: [],
        attendance: [
          "C Language__STATUS__present",
          "ReactJS__STATUS__present",
        ],
        assignments: [],
      },
      "2026-03-24": {
        events: ["Placement drives"],
        leaves: ["Travel-related reasons"],
        attendance: ["NodeJS__STATUS__absent"],
        assignments: ["NodeJS API practice sheet"],
      },
    };
  }, [today, user]);

  const details = dateDetails[dateKey(selectedDate)] || {
    events: [],
    leaves: [],
    attendance: [],
    assignments: [],
  };

  const sameDay = (first, second) =>
    first &&
    second &&
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate();

  return (
    <div className="mx-auto max-w-[1880px] px-4 pb-10 sm:px-6 lg:px-10">
      <h1 className="mb-6 text-[24px] font-semibold tracking-tight text-white sm:mb-8 sm:text-[32px] lg:text-[40px]">
        Calendar
      </h1>

      <div className="grid gap-5 sm:gap-7 xl:grid-cols-[minmax(0,1fr)_575px] xl:gap-9">
        <section className="overflow-hidden rounded-[24px] border border-neutral-800 bg-[#171717]">
          <div className="border-b border-neutral-800 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
            <div className="mb-6 grid grid-cols-[auto_auto_1fr_auto] items-center gap-3 sm:mb-8 sm:flex sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleMonth(
                      new Date(
                        visibleMonth.getFullYear(),
                        visibleMonth.getMonth() - 1,
                        1,
                      ),
                    )
                  }
                  className="flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-[#242424] text-white transition hover:bg-neutral-700"
                >
                  <ArrowLeft size={20} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setVisibleMonth(initialMonth);
                    setSelectedDate(initialSelectedDate);
                  }}
                  className="rounded-lg border border-neutral-700 bg-[#242424] px-4 py-3 text-[15px] font-medium text-white transition hover:bg-neutral-700 sm:text-[16px]"
                >
                  Today
                </button>
              </div>

              <h2 className="text-center text-[17px] font-semibold text-white sm:text-[19px] lg:text-[22px]">
                {visibleMonth.toLocaleString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>

              <button
                type="button"
                onClick={() =>
                  setVisibleMonth(
                    new Date(
                      visibleMonth.getFullYear(),
                      visibleMonth.getMonth() + 1,
                      1,
                    ),
                  )
                }
                className="flex h-[50px] w-[50px] items-center justify-center rounded-lg border border-neutral-700 bg-[#242424] text-white transition hover:bg-neutral-700"
              >
                <ArrowRight size={20} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-5 xl:grid-cols-4">
              {legendItems.map((item) => (
                <div key={item.label} className="flex items-center gap-3">
                  <span className={`h-3.5 w-3.5 rounded-full ${item.color}`} />
                  <span className="text-[11px] leading-relaxed text-neutral-100 sm:text-[14px] lg:text-[15px]">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
            <div className="mb-4 grid grid-cols-7 gap-2 sm:gap-3">
              {weekdayLabels.map((day) => (
                <div
                  key={day}
                  className="py-2 text-center text-[11px] text-[#9aa1ad] sm:py-3 sm:text-[13px] lg:text-[14px]"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 sm:gap-3">
              {calendarDays.map((day) => {
                if (day.empty) {
                  return (
                    <div
                      key={day.id}
                      className="h-[100px] rounded-2xl sm:h-[118px]"
                    />
                  );
                }

                const hasDetails = Boolean(dateDetails[day.id]);
                const isSelected = sameDay(day.date, selectedDate);
                const isToday = sameDay(day.date, today);

                  return (
                    <button
                      key={day.id}
                      type="button"
                      onClick={() => setSelectedDate(day.date)}
                      className={`relative flex h-[100px] items-start justify-start rounded-[12px] border p-3 text-left transition sm:h-[118px] sm:rounded-[16px] sm:p-4 ${
                      isSelected
                        ? "border-blue-500 bg-[#1b2230] text-white"
                        : "border-[#2a2a2a] bg-[#171717] text-neutral-100 hover:border-neutral-700 hover:bg-neutral-800/90"
                      }`}
                    >
                      <span className="text-[11px] font-medium sm:text-[13px] lg:text-[14px]">
                        {day.date.getDate()}
                      </span>

                      {isToday && (
                      <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-blue-500" />
                      )}

                      {hasDetails && !isToday && (
                      <span className="absolute bottom-4 right-4 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
        </section>

        <aside className="overflow-hidden rounded-[24px] border border-neutral-800 bg-[#171717]">
          <div className="border-b border-neutral-800 px-5 py-6 sm:px-6 sm:py-7">
            <h2 className="text-[18px] font-semibold tracking-tight text-white sm:text-[20px] lg:text-[22px]">
              {selectedDateLabel}
            </h2>
          </div>

          <div className="space-y-8 px-5 py-6 sm:space-y-10 sm:px-6 sm:py-8">
            <div>
              <h3 className="mb-3 text-[17px] font-semibold sm:mb-4 sm:text-[18px] lg:text-[19px]">
                Events
              </h3>
              {details.events.length === 0 ? (
                <p className="text-[14px] text-neutral-500 sm:text-[15px] lg:text-[16px]">
                  No events.
                </p>
              ) : (
                <div className="space-y-3 text-[14px] text-neutral-200 sm:text-[15px] lg:text-[16px]">
                  {details.events.map((event) => (
                    <p key={event}>{event}</p>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-3 text-[17px] font-semibold sm:mb-4 sm:text-[18px] lg:text-[19px]">
                Leaves
              </h3>
              {details.leaves.length === 0 ? (
                <p className="text-[14px] text-neutral-500 sm:text-[15px] lg:text-[16px]">
                  No leaves.
                </p>
              ) : (
                <div className="space-y-3 text-[14px] text-neutral-200 sm:text-[15px] lg:text-[16px]">
                  {details.leaves.map((leave) => (
                    <p key={leave}>{leave}</p>
                  ))}
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-3 text-[17px] font-semibold sm:text-[18px] lg:text-[19px]">
                Attendance
              </h3>
              {details.attendance.length === 0 ? (
                <p className="text-[14px] text-neutral-500 sm:text-[15px] lg:text-[16px]">
                  No attendance records.
                </p>
              ) : (
                <div className="space-y-3">
                  <p className="text-[14px] text-neutral-400 sm:text-[15px] lg:text-[16px]">
                    Subject entries:
                  </p>
                  {details.attendance.map((entry) => {
                    const [subject, status] = entry.split("__STATUS__");
                    return (
                      <div
                        key={entry}
                        className="flex items-start gap-3 text-[14px] sm:text-[15px] lg:text-[16px]"
                      >
                        <span className="mt-2 h-3.5 w-3.5 rounded-full bg-emerald-400" />
                        <p className="text-neutral-100">
                          {subject}
                          <span className="text-neutral-400"> {"\u2014"} </span>
                          <span className="font-semibold text-white">
                            {status}
                          </span>
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <h3 className="mb-3 text-[17px] font-semibold sm:mb-4 sm:text-[18px] lg:text-[19px]">
                Assignments
              </h3>
              {details.assignments.length === 0 ? (
                <p className="text-[14px] text-neutral-500 sm:text-[15px] lg:text-[16px]">
                  None due.
                </p>
              ) : (
                <div className="space-y-3 text-[14px] text-neutral-200 sm:text-[15px] lg:text-[16px]">
                  {details.assignments.map((assignment) => (
                    <p key={assignment}>{assignment}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
