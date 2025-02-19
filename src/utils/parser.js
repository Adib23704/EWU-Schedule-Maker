import * as XLSX from "xlsx";

function findColumnIndices(rows) {
	for (let i = 0; i < rows.length; i++) {
		if (rows[i].includes("Course(s)")) {
			return {
				courseIndex: rows[i].indexOf("Course(s)"),
				sectionIndex: rows[i].indexOf("Sec"),
				timeIndex: rows[i].indexOf("Time-WeekDay"),
				roomIndex: rows[i].indexOf("Room"),
				feeIndex: rows[i].indexOf("Tuition"),
				remarksIndex: rows[i].indexOf("Remarks")
			};
		}
	}
	console.error("Could not find the required columns.");
	return null;
}

function isTimeSlot(str) {
	if (!str) return false;
	const pattern = /^[MTWRFS]\s+\d{1,2}:\d{2}[AP]M-\d{1,2}:\d{2}[AP]M$/;
	return pattern.test(str.trim());
}

function extractSchedule(rows) {
	const indices = findColumnIndices(rows);
	if (!indices) return [];

	const { courseIndex, sectionIndex, timeIndex, roomIndex, feeIndex, remarksIndex } = indices;
	const extractedData = [];
	let currentCourse = null;
	let currentSection = null;
	let timeSlots = [];

	const headerRowIndex = rows.findIndex(row => row.includes("Course(s)"));

	for (let i = headerRowIndex + 1; i < rows.length; i++) {
		const row = rows[i];

		const remarks = row[remarksIndex];
		const tuitionFee = row[feeIndex];
		if (tuitionFee !== 0 && !remarks) {
			if (row[courseIndex] && row[timeIndex] && !row[courseIndex].includes("Lab)")) {
				if (currentCourse && timeSlots.length > 0) {
					extractedData.push({
						course: currentCourse,
						section: currentSection,
						timeSlots: timeSlots,
					});
				}

				currentCourse = row[courseIndex].trim();
				currentSection = row[sectionIndex] || null;
				timeSlots = [{
					time: row[timeIndex].trim(),
					room: row[roomIndex] ? row[roomIndex].trim() : "TBA"
				}];
			}
			else if (row[timeIndex] && isTimeSlot(row[timeIndex]) && currentCourse) {
				timeSlots.push({
					time: row[timeIndex].trim(),
					room: row[roomIndex] ? row[roomIndex].trim() : "TBA"
				});
			}
			else if (row[courseIndex] && row[courseIndex].includes("Lab)")) {
				if (currentCourse) {
					timeSlots.push({
						time: row[timeIndex].trim(),
						room: row[roomIndex] ? row[roomIndex].trim() : "TBA",
						isLab: true
					});
				}
			}
		}
	}

	if (currentCourse && timeSlots.length > 0) {
		extractedData.push({
			course: currentCourse,
			section: currentSection,
			timeSlots: timeSlots
		});
	}

	return extractedData;
}

function separateRoomInfo(data) {
	return data.map(course => ({
		...course,
		timeSlots: course.timeSlots.map(slot => {
			const roomInfo = slot.room.split(' (');
			const roomNumber = roomInfo[0];
			const roomName = roomInfo[1] ? roomInfo[1].replace(')', '') : null;
			return {
				...slot,
				room: {
					number: roomNumber,
					name: roomName
				}
			};
		})
	}));
}

function convertTo24HourFormat(time) {
	const [timePart, modifier] = time.split(/(AM|PM)/);
	let [hours, minutes] = timePart.split(':').map(Number);
	if (modifier === 'PM' && hours !== 12) hours += 12;
	if (modifier === 'AM' && hours === 12) hours = 0;
	return hours * 60 + minutes;
}

function getDayOrder(day) {
	const dayMap = { S: 0, M: 1, T: 2, W: 3, R: 4, F: 5 };
	return dayMap[day] || 0;
}

function sortSchedule(schedule) {
	return schedule.sort((a, b) => {
		const aFirstSlot = a.timeSlots[0];
		const bFirstSlot = b.timeSlots[0];

		const [aDays, aTimeRange] = aFirstSlot.time.split(' ');
		const [bDays, bTimeRange] = bFirstSlot.time.split(' ');

		const aFirstDay = aDays[0];
		const bFirstDay = bDays[0];

		if (getDayOrder(aFirstDay) !== getDayOrder(bFirstDay)) {
			return getDayOrder(aFirstDay) - getDayOrder(bFirstDay);
		}

		const [aStartTime] = aTimeRange.split('-');
		const [bStartTime] = bTimeRange.split('-');
		return convertTo24HourFormat(aStartTime) - convertTo24HourFormat(bStartTime);
	});
}

export default async function parseXlsx(buffer) {
	const workbook = XLSX.read(buffer, {
		type: "buffer",
		cellStyles: true,
		cellFormulas: true,
		cellDates: true,
		cellNF: true,
		sheetStubs: true
	});

	const sheetName = workbook.SheetNames[0];
	const sheet = workbook.Sheets[sheetName];
	const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

	let schedule = extractSchedule(jsonData);

	if (schedule.length > 0) {
		schedule = separateRoomInfo(schedule);
		schedule = sortSchedule(schedule);
	}

	return schedule;
}