import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CameraIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";

export default function RoutineTable({ schedule }) {
	const [showWarning, setShowWarning] = useState(false);
	const tableRef = useRef(null);

	const isInAppBrowser = () => {
		const userAgent = navigator.userAgent || navigator.vendor || window.opera;
		return /FBAN|FBAV|Instagram|Messenger|Twitter|TikTok/i.test(userAgent);
	};

	useEffect(() => {
		if (isInAppBrowser()) {
			setShowWarning(true);
		}
	}, []);

	const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
	const dayMap = { S: "Sunday", M: "Monday", T: "Tuesday", W: "Wednesday", R: "Thursday" };
	const courses = [...new Set(schedule.map(({ course, section }) => `${course}${section ? ` (${section})` : ""}`))];

	const routine = {};
	days.forEach(day => (routine[day] = {}));

	schedule.forEach(({ course, section, timeSlots }) => {
		const courseKey = `${course}${section ? ` (${section})` : ""}`;
		timeSlots.forEach(({ time, room }) => {
			const [dayCodes, timeString] = time.split(" ");
			dayCodes.split("").forEach(dayCode => {
				const fullDay = dayMap[dayCode];
				if (fullDay) {
					if (!routine[fullDay][courseKey]) {
						routine[fullDay][courseKey] = [];
					}
					routine[fullDay][courseKey].push({ time: timeString, room: room.number });
				}
			});
		});
	});

	const handleSaveAsImage = () => {
		if (tableRef.current) {
			html2canvas(tableRef.current, { scale: 2, useCORS: true }).then(canvas => {
				canvas.toBlob(blob => {
					const link = document.createElement("a");
					link.href = URL.createObjectURL(blob);
					link.download = "routine.png";
					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);
				}, "image/png");
			});
		}
	};


	const handleSaveAsPDF = () => {
		if (tableRef.current) {
			html2canvas(tableRef.current, { scale: 2, useCORS: true }).then(canvas => {
				const imgData = canvas.toDataURL("image/png");
				const pdf = new jsPDF("landscape");
				const imgWidth = 280;
				const imgHeight = (canvas.height * imgWidth) / canvas.width;

				pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
				const blob = pdf.output("blob");

				const link = document.createElement("a");
				link.href = URL.createObjectURL(blob);
				link.download = "routine.pdf";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			});
		}
	};

	return (
		<div className="relative">
			{showWarning && (
				<div className="fixed top-0 left-0 w-full bg-red-600 text-white text-center p-3 z-50 shadow-md">
					⚠️ You&apos;re using an in-app browser, image and PDF saving may not work. Open this page in a regular browser.
				</div>
			)}

			<div className="overflow-x-auto p-4 bg-white shadow-lg rounded-lg border border-gray-100">
				<div className="overflow-x-auto">
					<table ref={tableRef} className="w-full border-collapse">
						<thead>
							<tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm md:text-lg">
								<th className="px-4 py-2 md:px-6 md:py-4 text-left rounded-tl-lg">Day</th>
								{courses.map(course => (
									<th key={course} className="px-4 py-2 md:px-6 md:py-4 text-center">{course}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{days.map(day => (
								<tr key={day} className="hover:bg-gray-50 transition-colors">
									<td className="px-4 py-2 md:px-6 md:py-4 font-medium bg-gray-100 text-left">{day}</td>
									{courses.map(course => (
										<td key={course} className="px-4 py-2 md:px-6 md:py-4 whitespace-pre-line text-xs md:text-sm border-t border-gray-200 text-center">
											{routine[day][course] ? (
												routine[day][course].map(({ time, room }, idx) => (
													<div key={idx} className="mb-1">
														<span className="font-bold text-blue-700">{time}</span>
														<br />
														<span className="font-semibold text-gray-600">{room}</span>
													</div>
												))
											) : (
												"-"
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
				<div className="mt-6 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
					<button
						onClick={handleSaveAsImage}
						className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
					>
						<CameraIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />
						<span>Save as Image</span>
					</button>
					<button
						onClick={handleSaveAsPDF}
						className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center"
					>
						<DocumentArrowDownIcon className="w-4 h-4 md:w-5 md:h-5 mr-2" />
						<span>Save as PDF</span>
					</button>
				</div>
			</div>
		</div>
	);
}
