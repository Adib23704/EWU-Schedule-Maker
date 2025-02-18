// components/RoutineTable.js
export default function RoutineTable({ schedule }) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"];
  const dayMap = { M: "Monday", T: "Tuesday", W: "Wednesday", R: "Thursday", A: "Saturday", S: "Sunday" };
  const courses = [...new Set(schedule.map(({ course, section }) => `${course}${section ? ` (${section})` : ""}`))];

  const routine = {};
  days.forEach(day => (routine[day] = {}));

  schedule.forEach(({ course, section, time, room }) => {
    const courseKey = `${course}${section ? ` (${section})` : ""}`;
    const timeParts = time.split(" ");
    const dayCodes = timeParts[0].split("");
    const timeString = timeParts.slice(1).join(" ");

    dayCodes.forEach((dayCode) => {
      const fullDay = dayMap[dayCode];
      if (fullDay) {
        routine[fullDay][courseKey] = { time: timeString, room };
      }
    });
  });

  return (
    <div className="overflow-x-auto p-6 bg-white shadow-lg rounded-lg">
      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-blue-600 text-white text-lg">
            <th className="border px-6 py-3 text-left">Day</th>
            {courses.map((course) => (
              <th key={course} className="border px-6 py-3 text-center">{course}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day} className="odd:bg-gray-100 even:bg-white text-center">
              <td className="border px-6 py-3 font-medium bg-gray-200 text-left">{day}</td>
              {courses.map((course) => (
                <td key={course} className="border px-6 py-3 whitespace-pre-line text-sm">
                  {routine[day][course] ? (
                    <div>
                      <span className="font-semibold text-blue-700">{routine[day][course].time}</span>
                      <br />
                      <span className="text-gray-600 text-xs">{routine[day][course].room.number}</span>
                    </div>
                  ) : (
                    "—"
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
