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
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveAsImage = () => {
    setIsSaving(true);
    if (tableRef.current) {
      html2canvas(tableRef.current).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "routine.png";
        link.click();
        setIsSaving(false);
      });
    }
  };

  const handleSaveAsPDF = () => {
    setIsSaving(true);
    if (tableRef.current) {
      html2canvas(tableRef.current).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("landscape");
        const imgWidth = 280; // Adjust based on your table width
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
        pdf.save("routine.pdf");
        setIsSaving(false);
      });
    }
  };

  return (
    <div className="overflow-x-auto p-6 bg-white shadow-lg rounded-lg border border-gray-100">
      {/* Card Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Class Routine</h2>
      </div>

      {/* Table */}
      <table ref={tableRef} className="w-full border-collapse">
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

      {/* Buttons Section */}
      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={handleSaveAsImage}
          className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center"
        >
          <CameraIcon className="w-5 h-5 mr-2" />
          <span>Save as Image</span>
        </button>
        <button
          onClick={handleSaveAsPDF}
          className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 flex items-center"
        >
          <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
          <span>Save as PDF</span>
        </button>
      </div>

      {/* Loading Spinner */}
      {isSaving && (
        <div className="flex justify-center items-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
    </div>
  );
}