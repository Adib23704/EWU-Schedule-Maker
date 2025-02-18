import { getText } from 'any-text';

function extractSchedule(data) {
	const rows = data["AdvisingSlip"];

	let courseIndex = null;
	let sectionIndex = null;
	let timeIndex = null;
	let roomIndex = null;
	let feeIndex = null;

	for (let i = 0; i < rows.length; i++) {
		if (rows[i].includes("Course(s)")) {
			courseIndex = rows[i].indexOf("Course(s)");
			sectionIndex = rows[i].indexOf("Sec");
			timeIndex = rows[i].indexOf("Time-WeekDay");
			roomIndex = rows[i].indexOf("Room");
			feeIndex = rows[i].indexOf("Tuition");
			break;
		}
	}

	if (courseIndex === null || sectionIndex === null || timeIndex === null || roomIndex === null || feeIndex === null) {
		console.error("Could not find the required columns.");
		return [];
	}

	const extractedData = [];

	for (let i = 1; i < rows.length; i++) {
		const row = rows[i];

		if (row[courseIndex] && row[timeIndex]) {
			const tuitionFee = row[feeIndex];

			if (tuitionFee !== 0) {
				extractedData.push({
					course: row[courseIndex].trim(),
					section: row[sectionIndex] ? row[sectionIndex] : null,
					time: row[timeIndex] ? row[timeIndex].trim() : "TBA",
					room: row[roomIndex] ? row[roomIndex].trim() : "TBA",
				});
			}
		}
	}

	if (extractedData.length > 0) {
		extractedData.shift();
	}

	return extractedData;
}

function separateRoomInfo(data) {
	return data.map(item => {
		const roomInfo = item.room.split(' (');
		const roomNumber = roomInfo[0];
		const roomName = roomInfo[1] ? roomInfo[1].replace(')', '') : null;
		return {
			course: item.course,
			section: item.section,
			time: item.time,
			room: {
				number: roomNumber,
				name: roomName,
			},
		};
	});
}

export default async function parseXlsx(filePath) {
	const jsonData = await getText(filePath);
	let schedule = extractSchedule(JSON.parse(jsonData));

	if (schedule.length > 0) {
		schedule = separateRoomInfo(schedule);
	}

	return schedule;
}