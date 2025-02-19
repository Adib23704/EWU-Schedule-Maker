// components/RoutineTable.js
export default function RoutineTable({ schedule }) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayMap = { F: "Friday", M: "Monday", T: "Tuesday", W: "Wednesday", R: "Thursday", A: "Saturday", S: "Sunday" };
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
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-lg">
            <th className="px-6 py-4 text-left rounded-tl-lg">Day</th>
            {courses.map((course) => (
              <th key={course} className="px-6 py-4 text-center">{course}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {days.map((day) => (
            <tr key={day} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 font-medium bg-gray-100 text-left">{day}</td>
              {courses.map((course) => (
                <td key={course} className="px-6 py-4 whitespace-pre-line text-sm border-t border-gray-200">
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
