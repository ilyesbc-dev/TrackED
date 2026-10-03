import { useEffect, useState } from "react";

const emptyForm = {
  firstName: "",
  lastName: "",
  email: "",
  extra: "",
  password: "",
};

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

function PersonCell({ name, email }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-xs font-bold text-indigo-700">
        {initials(name)}
      </div>
      <div className="min-w-0">
        <p className="font-semibold">{name}</p>
        <p className="truncate text-sm text-stone-500">{email}</p>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("teachers");
  const [modalRole, setModalRole] = useState(null); // "teacher" | "student" | null
  const [notice, setNotice] = useState("");

  const [teachers, setTeachers] = useState([
    {
      id: 1,
      name: "Ilyes Bouchaala",
      email: "ilyes@example.com",
      subject: "Mathematics",
      students: 12,
      progress: 78,
      activity: "Updated a student's progress",
    },
    {
      id: 2,
      name: "Mohamed Bounane",
      email: "mohamed@example.com",
      subject: "Physics",
      students: 18,
      progress: 65,
      activity: "Added a new exercise",
    },
    {
      id: 3,
      name: "Lina Meziane",
      email: "lina.m@example.com",
      subject: "Computer Science",
      students: 15,
      progress: 84,
      activity: "Updated student results",
    },
  ]);

  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Ahmed Mansouri",
      email: "ahmed@example.com",
      level: "L2 Computer Science",
      progress: 75,
      attempts: 18,
      lastActivity: "Math Quiz",
    },
    {
      id: 2,
      name: "Yacine Karim",
      email: "yacine@example.com",
      level: "L1 Mathematics",
      progress: 62,
      attempts: 11,
      lastActivity: "Physics Exercise",
    },
    {
      id: 3,
      name: "Lina Said",
      email: "lina.s@example.com",
      level: "L2 Computer Science",
      progress: 91,
      attempts: 24,
      lastActivity: "Programming Quiz",
    },
    {
      id: 4,
      name: "Amine Haddad",
      email: "amine@example.com",
      level: "L3 Physics",
      progress: 68,
      attempts: 15,
      lastActivity: "Physics Test",
    },
  ]);

  // Auto-hide the success message, and clean the timer up properly
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3000);
    return () => clearTimeout(timer);
  }, [notice]);

  const emailExists = (email) =>
    [...teachers, ...students].some(
      (person) => person.email.toLowerCase() === email.toLowerCase()
    );

  // Called by the modal once the form is valid
  const handleAdd = async (role, data) => {
    const name = `${data.firstName.trim()} ${data.lastName.trim()}`;

    if (role === "teacher") {
      const created = {
        id: Date.now(),
        name,
        email: data.email.trim(),
        subject: data.extra.trim(),
        students: 0,
        progress: 0,
        activity: "Account created",
      };
      setTeachers((prev) => [created, ...prev]);
      setActiveTab("teachers");
    } else {
      const created = {
        id: Date.now(),
        name,
        email: data.email.trim(),
        level: data.extra.trim(),
        progress: 0,
        attempts: 0,
        lastActivity: "-",
      };
      setStudents((prev) => [created, ...prev]);
      setActiveTab("students");
    }

    setModalRole(null);
    setNotice(`${role === "teacher" ? "Teacher" : "Student"} ${name} added`);
  };

  const averageProgress =
    students.length === 0
      ? "0%"
      : `${Math.round(
          students.reduce((total, s) => total + s.progress, 0) / students.length
        )}%`;

  const totalAttempts = students.reduce((total, s) => total + s.attempts, 0);

  const tabClass = (name) =>
    `flex items-center gap-2 border-b-2 py-4 text-sm font-semibold transition ${
      activeTab === name
        ? "border-indigo-700 text-indigo-700"
        : "border-transparent text-stone-500 hover:text-stone-800"
    }`;

  const countClass = (name) =>
    `rounded-full px-2 py-0.5 text-xs ${
      activeTab === name
        ? "bg-indigo-50 text-indigo-700"
        : "bg-stone-100 text-stone-600"
    }`;

  const thClass = "px-6 py-3";

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-indigo-700">
              Administration
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="mt-2 text-stone-600">
              See teacher activity, student progress and attempts.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setModalRole("student")}
              className="rounded-lg border border-indigo-700 bg-white px-4 py-2.5 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-50"
            >
              + Add student
            </button>

            <button
              type="button"
              onClick={() => setModalRole("teacher")}
              className="rounded-lg bg-indigo-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800"
            >
              + Add teacher
            </button>
          </div>
        </div>

        {notice && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700"
          >
            {notice}
          </div>
        )}

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Teachers" value={teachers.length} />
          <StatCard title="Students" value={students.length} />
          <StatCard title="Total attempts" value={totalAttempts} />
          <StatCard title="Average progress" value={averageProgress} />
        </div>

        {/* Tabs */}
        <section className="rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="border-b border-stone-100 px-6">
            <div className="flex gap-8" role="tablist" aria-label="People">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "teachers"}
                onClick={() => setActiveTab("teachers")}
                className={tabClass("teachers")}
              >
                Teachers
                <span className={countClass("teachers")}>{teachers.length}</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "students"}
                onClick={() => setActiveTab("students")}
                className={tabClass("students")}
              >
                Students
                <span className={countClass("students")}>{students.length}</span>
              </button>
            </div>
          </div>

          {activeTab === "teachers" && (
            <div className="overflow-x-auto" role="tabpanel">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-stone-100 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                    <th className={thClass}>Teacher</th>
                    <th className={thClass}>Subject</th>
                    <th className={thClass}>Students</th>
                    <th className={thClass}>Progress</th>
                    <th className={thClass}>Last activity</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100">
                  {teachers.map((teacher) => (
                    <tr key={teacher.id} className="transition hover:bg-stone-50/70">
                      <td className="px-6 py-4">
                        <PersonCell name={teacher.name} email={teacher.email} />
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-600">
                        {teacher.subject || "-"}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold">
                        {teacher.students}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <ProgressBar value={teacher.progress} />
                          <span className="w-10 text-sm font-medium">
                            {teacher.progress}%
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-500">
                        {teacher.activity || "-"}
                      </td>
                    </tr>
                  ))}

                  {teachers.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-stone-500">
                        No teacher yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "students" && (
            <div className="overflow-x-auto" role="tabpanel">
              <table className="w-full min-w-[760px]">
                <thead>
                  <tr className="border-b border-stone-100 text-left text-xs font-semibold uppercase tracking-wider text-stone-500">
                    <th className={thClass}>Student</th>
                    <th className={thClass}>Level</th>
                    <th className={thClass}>Progress</th>
                    <th className={thClass}>Attempts</th>
                    <th className={thClass}>Last activity</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-stone-100">
                  {students.map((student) => (
                    <tr key={student.id} className="transition hover:bg-stone-50/70">
                      <td className="px-6 py-4">
                        <PersonCell name={student.name} email={student.email} />
                      </td>
                      <td className="px-6 py-4 text-sm text-stone-600">
                        {student.level || "-"}
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
                      <td className="px-6 py-4 text-sm text-stone-500">
                        {student.lastActivity || "-"}
                      </td>
                    </tr>
                  ))}

                  {students.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-12 text-center text-stone-500">
                        No student yet
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      {modalRole && (
        <AddUserModal
          role={modalRole}
          emailExists={emailExists}
          onClose={() => setModalRole(null)}
          onSubmit={handleAdd}
        />
      )}
    </div>
  );
}

// Popup form used for both teacher and student
function AddUserModal({ role, emailExists, onClose, onSubmit }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);
  const [serverError, setServerError] = useState("");

  const isTeacher = role === "teacher";
  const extraLabel = isTeacher ? "Subject" : "Level";
  const extraPlaceholder = isTeacher ? "Mathematics" : "L2 Computer Science";

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Please enter a valid email address";
    } else if (emailExists(form.email.trim())) {
      newErrors.email = "This email is already used";
    }

    if (!form.extra.trim()) newErrors.extra = `${extraLabel} is required`;

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    setSaving(true);

    try {
      await onSubmit(role, form);
    } catch (err) {
      setServerError(err.message || "Something went wrong");
      setSaving(false);
    }
  };

  const inputClass = (field) =>
    `w-full rounded-lg border bg-white px-4 py-2.5 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 ${
      errors[field]
        ? "border-red-500 focus:ring-red-500/20"
        : "border-stone-300 focus:border-indigo-500 focus:ring-indigo-500/20"
    }`;

  const labelClass = "mb-1 block text-sm font-medium text-stone-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 px-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-user-title"
        className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h3 id="add-user-title" className="text-xl font-bold text-stone-900">
            Add {isTeacher ? "teacher" : "student"}
          </h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-2xl leading-none text-stone-400 transition hover:bg-stone-100 hover:text-stone-600"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {serverError && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="firstName" className={labelClass}>
                First name
              </label>
              <input
                id="firstName"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                autoFocus
                className={inputClass("firstName")}
              />
              {errors.firstName && (
                <p className="mt-1 text-xs text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label htmlFor="lastName" className={labelClass}>
                Last name
              </label>
              <input
                id="lastName"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className={inputClass("lastName")}
              />
              {errors.lastName && (
                <p className="mt-1 text-xs text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="email" className={labelClass}>
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="name@example.com"
              className={inputClass("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="extra" className={labelClass}>
              {extraLabel}
            </label>
            <input
              id="extra"
              name="extra"
              value={form.extra}
              onChange={handleChange}
              placeholder={extraPlaceholder}
              className={inputClass("extra")}
            />
            {errors.extra && (
              <p className="mt-1 text-xs text-red-600">{errors.extra}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className={labelClass}>
              Temporary password
            </label>
            <input
              id="password"
              name="password"
              type="text"
              autoComplete="off"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 8 characters"
              className={inputClass("password")}
            />
            {errors.password && (
              <p className="mt-1 text-xs text-red-600">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-800 disabled:opacity-70"
            >
              {saving ? "Saving..." : `Add ${isTeacher ? "teacher" : "student"}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminDashboard;