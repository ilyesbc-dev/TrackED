import { useState } from "react";

const courses = [
  { id: 1, title: "Mathematics", teacher: "Sara Benali", progress: 78, attempts: 6 },
  { id: 2, title: "Physics", teacher: "Mohamed Bounane", progress: 62, attempts: 4 },
  { id: 3, title: "Computer Science", teacher: "Aymen Khelifi", progress: 91, attempts: 8 },
];

const history = [
  { id: 1, name: "Mathematics Quiz", score: 16, date: "2 days ago" },
  { id: 2, name: "Science Quiz", score: 18, date: "4 days ago" },
  { id: 3, name: "Physics Quiz", score: 12, date: "1 week ago" },
];

const filters = [
  { id: "all", label: "All" },
  { id: "progress", label: "In progress" },
  { id: "done", label: "Almost done" },
];

function ProgressBar({ value }) {
  const color =
    value >= 80 ? "bg-green-500" : value >= 60 ? "bg-indigo-600" : "bg-amber-500";

  return (
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-stone-100">
      <div
        className={`h-full rounded-full transition-all duration-300 ${color}`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-stone-500">{title}</p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
        {value}
      </p>
    </div>
  );
}

function StudentDashboard() {
  const [filter, setFilter] = useState("all");

  const visibleCourses = courses.filter((course) => {
    if (filter === "done") return course.progress >= 80;
    if (filter === "progress") return course.progress < 80;
    return true;
  });

  const average = Math.round(
    courses.reduce((total, c) => total + c.progress, 0) / courses.length
  );

  const totalAttempts = courses.reduce((total, c) => total + c.attempts, 0);

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-700">
            Student
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">My Learning</h1>
          <p className="mt-2 text-stone-600">
            Check your progress and your latest results.
          </p>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-5 md:grid-cols-3">
          <StatCard title="Courses" value={courses.length} />
          <StatCard title="Average progress" value={`${average}%`} />
          <StatCard title="Total attempts" value={totalAttempts} />
        </div>

        <section className="mb-8 rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-lg font-bold">My courses</h2>

            <div
              className="inline-flex rounded-lg border border-stone-200 bg-stone-50 p-1"
              role="group"
              aria-label="Filter courses"
            >
              {filters.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setFilter(item.id)}
                  aria-pressed={filter === item.id}
                  className={`rounded-md px-3.5 py-1.5 text-sm font-medium transition ${
                    filter === item.id
                      ? "bg-white text-indigo-700 shadow-sm"
                      : "text-stone-600 hover:text-stone-900"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {visibleCourses.map((course) => (
              <article
                key={course.id}
                className="rounded-2xl border border-stone-200 p-5 transition duration-300 hover:-translate-y-1 hover:shadow-md"
              >
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-sm text-stone-500">{course.teacher}</p>

                <div className="mt-5 flex items-center gap-3">
                  <ProgressBar value={course.progress} />
                  <span className="text-sm font-semibold">{course.progress}%</span>
                </div>

                <p className="mt-3 text-sm text-stone-500">
                  {course.attempts} attempts
                </p>
              </article>
            ))}

            {visibleCourses.length === 0 && (
              <p className="col-span-full py-8 text-center text-stone-500">
                No course in this category
              </p>
            )}
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-2 text-lg font-bold">Recent results</h2>

          <ul className="divide-y divide-stone-100">
            {history.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between py-4"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-stone-500">{item.date}</p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    item.score >= 15
                      ? "bg-green-50 text-green-700"
                      : "bg-amber-50 text-amber-700"
                  }`}
                >
                  {item.score}/20
                </span>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default StudentDashboard;