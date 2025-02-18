export default function RoutineTable({ schedule }) {
	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Saturday"];

	// Create table structure
	const courses = [...new Set(schedule.map((item) => item.course))];
	const routine = {};

	days.forEach(day => routine[day] = {});
	schedule.forEach(({ course, time, room }) => {
		const [day] = time.split(" "); // Extract day from "M 1:30PM-3:30PM"
		const dayMap = { M: "Monday", T: "Tuesday", W: "Wednesday", R: "Thursday", A: "Saturday", S: "Sunday" };
		if (dayMap[day]) {
			routine[dayMap[day]][course] = `${time} - ${room}`;
		}
	});

	return (
		<table className="border-collapse border w-full mt-4">
			<thead>
				<tr className="bg-gray-200">
					<th className="border px-4 py-2">Day</th>
					{courses.map((course) => (
						<th key={course} className="border px-4 py-2">{course}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{days.map((day) => (
					<tr key={day}>
						<td className="border px-4 py-2">{day}</td>
						{courses.map((course) => (
							<td key={course} className="border px-4 py-2">
								{routine[day][course] || "—"}
							</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}
