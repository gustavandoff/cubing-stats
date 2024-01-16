export const convertMilliseconds = (milliseconds: number): string => {
	const totalSeconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const hundredths = Math.floor((milliseconds % 1000) / 10);

	if (minutes > 0) {
		return `${minutes}:${seconds.toString().padStart(2, '0')}.${hundredths
			.toString()
			.padStart(2, '0')}`;
	} else {
		return `${seconds}.${hundredths.toString().padStart(2, '0')}`;
	}
};

export const convertDate = (s: number): string => {
	const date = new Date(s * 1000);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

const calcAvg = (solves: Solve[], removedCount: number): Solve => {
	if (2 * removedCount > solves.length - 1) {
		throw new Error('Too many solves removed');
	}
	solves.sort((a, b) => b.timeInMillis - a.timeInMillis);

	solves.splice(0, removedCount);
	solves.splice(solves.length - removedCount, removedCount);

	return calcMean(solves);
};

const calcMean = (solves: Solve[]): Solve => {
	const avgTimeInMillis = solves.reduce((acc, curr) => acc + curr.timeInMillis, 0) / solves.length;
	return {
		time: convertMilliseconds(avgTimeInMillis),
		timeInMillis: avgTimeInMillis,
		date: solves[0].date
	};
};

export const getAllAoX = (x: number, solves: Solve[]): Solve[] => {
	let removedCount = 0;
	switch (x) {
		case 5:
			removedCount = 1;
			break;
		case 12:
			removedCount = 1;
			break;
		case 25:
			removedCount = 3;
			break;
		case 50:
			removedCount = 3;
			break;
		default:
			if (x % 100 === 0) {
				removedCount = (x / 100) * 5;
			} else {
				throw new Error('Invalid AoX');
			}
			break;
	}

	const aoXs: Solve[] = [];
	for (let i = 0; i < solves.length - x; i++) {
		aoXs.push(calcAvg(solves.slice(i, i + x), removedCount));
	}
	return aoXs;
};
