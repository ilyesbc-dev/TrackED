import { useState } from "react";

const initials = (name) =>
  name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

function ProgressBar({ value }) {
  const color =
    value >= 80 ? "bg-green-500" : value >= 60 ? "bg-indigo-600" : "bg-amber-500";

  return (
    <div className="h-2 w-28 overflow-hidden rounded-full bg-stone-100">
      <div
        className={`h-full rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function StatCard({ title, value, hint }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-stone-500">{title}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-stone-500">{hint}</p>}
    </div>
  );
}

function TeacherDashboard() {
  const [students, setStudents] = useState([
    { id: 1, name: "Ahmed Mansouri", level: "L2 Computer Science", progress: 75, attempts: 18 },
    { id: 2, name: "Yacine Karim", level: "L1 Mathematics", progress: 62, attempts: 11 },
    { id: 3, name: "Lina Said", level: "L2 Computer Science", progress: 91, attempts: 24 },
    { id: 4, name: "Amine Haddad", level: "L3 Physics", progress: 68, attempts: 15 },
  ]);

  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();
  const filtered = students.filter((s) => s.name.toLowerCase().includes(query));

  const updateProgress = (id, amount) => {
    setStudents((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, progress: Math.min(100, Math.max(0, s.progress + amount)) }
          : s
      )
    );
  };

  const average =
    students.length === 0
      ? 0
      : Math.round(
          students.reduce((total, s) => total + s.progress, 0) / students.length
        );

  const totalAttempts = students.reduce((total, s) => total + s.attempts, 0);
  const needSupport = students.filter((s) => s.progress < 65).length;

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-700">
            Teacher
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">
            Teacher Dashboard
          </h1>
          <p className="mt-2 text-stone-600">
            Follow your students and update their progress.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <StatCard title="My students" value={students.length} />
          <StatCard
            title="Average progress"
            value={`${average}%`}
            hint={needSupport > 0 ? `${needSupport} below 65%` : "Everyone is on track"}
          />
          <StatCard title="Total attempts" value={totalAttempts} />
        </div>

        <section className="rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-stone-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
            <h2 className="text-lg font-bold">Students</h2>

            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search a student..."
              aria-label="Search a student"
              className="w-full rounded-lg border border-stone-300 bg-white px-4 py-2 text-sm placeholder:text-stone-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 sm:w-64"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px]">
              <thead>
                <tr className="border-b border-stone-100 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                  <th className="px-6 py-3">Student</th>
                  <th className="px-6 py-3">Level</th>
                  <th className="px-6 py-3">Progress</th>
                  <th className="px-6 py-3">Attempts</th>
                  <th className="px-6 py-3">Update</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-stone-100">
                {filtered.map((student) => (
                  <tr key={student.id} className="transition hover:bg-stone-50/70">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700">
                          {initials(student.name)}
                        </div>
                        <div>
                          <p className="font-semibold">{student.name}</p>
                          {student.progress < 65 && (
                            <span className="mt-0.5 inline-block rounded-full bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                              Needs support
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-stone-600">
                      {student.level}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <ProgressBar value={student.progress} />
                        <span className="w-10 text-sm font-medium">
                          {student.progress}%
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm font-semibold">
                      {student.attempts}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => updateProgress(student.id, -5)}
                          disabled={student.progress === 0}
                          aria-label={`Decrease ${student.name}'s progress by 5%`}
                          className="rounded-lg border border-stone-300 px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          −5%
                        </button>
                        <button
                          type="button"
                          onClick={() => updateProgress(student.id, 5)}
                          disabled={student.progress === 100}
                          aria-label={`Increase ${student.name}'s progress by 5%`}
                          className="rounded-lg bg-indigo-700 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-indigo-800 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          +5%
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filtered.length === 0 && (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center text-stone-500">
                      No student found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}

export default TeacherDashboard;