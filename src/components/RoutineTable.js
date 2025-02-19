import { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CameraIcon, DocumentArrowDownIcon } from "@heroicons/react/24/outline";

export default function RoutineTable({ schedule }) {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
  const dayMap = { S: "Sunday", M: "Monday", T: "Tuesday", W: "Wednesday", R: "Thursday" };
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

  const tableRef = useRef(null);

  const handleSaveAsImage = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "routine.png";
        link.click();
      });
    }
  };

  const handleSaveAsPDF = () => {
    if (tableRef.current) {
      html2canvas(tableRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape");
        const imgWidth = 280;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("routine.pdf");
      });
    }
  };

  return (
    <div className="overflow-x-auto p-4 bg-white shadow-lg rounded-lg border border-gray-100">
      <div className="overflow-x-auto">
        <table ref={tableRef} className="w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm md:text-lg">
              <th className="px-4 py-2 md:px-6 md:py-4 text-left rounded-tl-lg">Day</th>
              {courses.map((course) => (
                <th key={course} className="px-4 py-2 md:px-6 md:py-4 text-center">{course}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map((day) => (
              <tr key={day} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2 md:px-6 md:py-4 font-medium bg-gray-100 text-left">{day}</td>
                {courses.map((course) => (
                  <td key={course} className="px-4 py-2 md:px-6 md:py-4 whitespace-pre-line text-xs md:text-sm border-t border-gray-200 text-center">
                    {routine[day][course] ? (
                      <div>
                        <span className="font-bold text-blue-700">{routine[day][course].time}</span>
                        <br />
                        <span className="font-semibold text-gray-600">{routine[day][course].room.number}</span>
                      </div>
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
  );
}