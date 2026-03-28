import React from "react";

export default function Chat({ user }) {
  const groups = user?.chatGroups || [];

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
      <div className="pt-6">
        <h1 className="text-[28px] font-semibold tracking-tight text-white sm:text-[40px]">
          Chat Groups
        </h1>
        <p className="mt-2 text-[16px] text-neutral-400 sm:text-[18px]">
          Groups assigned to you and universal groups.
        </p>
      </div>

      <div className="mt-12">
        {groups.length === 0 ? (
          <p className="text-[18px] text-neutral-400 sm:text-[20px]">
            No groups assigned to you yet.
          </p>
        ) : (
          <div className="space-y-4">
            {groups.map((group) => (
              <div
                key={group}
                className="rounded-2xl border border-neutral-800 bg-neutral-900 px-5 py-4 text-white"
              >
                {group}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
