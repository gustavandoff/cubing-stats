export const convertMilliseconds = (s: number): string => {
	let ms = s % 1000;
	s = (s - ms) / 1000;
	let secs = s % 60;
	s = (s - secs) / 60;
	let mins = s % 60;

	let msString = ('' + ms).substring(0, 2);
	let secsString: string = secs < 10 ? '0' + secs + '.' : secs + '.';
	let minsString: string = '';

	if (mins) {
		minsString = mins < 10 ? '0' + mins + ':' : mins + ':';
	}

	return minsString + secsString + '.' + msString;
};

export const convertDate = (s: number): string => {
    const date = new Date(s * 1000);
    return date.toLocaleDateString();
};

export const calcAo5 = (solves: Solve[]): Average => {
	const unsortedSolves = [...solves];
	solves.sort((a, b) => a.timeInMillis - b.timeInMillis);
	const avgTimeInMillis =
		(solves[1].timeInMillis + solves[2].timeInMillis + solves[3].timeInMillis) / 3;
	return {
		time: convertMilliseconds(avgTimeInMillis),
		timeInMillis: avgTimeInMillis,
		dateOfLast: solves[4].date,
		solves: unsortedSolves
	};
};

export const calcMean = (solves: Solve[]): Average => {
	const unsortedSolves = [...solves];
	solves.sort((a, b) => b.timeInMillis - a.timeInMillis);
	const avgTimeInMillis = solves.reduce((acc, curr) => acc + curr.timeInMillis, 0) / solves.length;
	return {
		time: convertMilliseconds(avgTimeInMillis),
		timeInMillis: avgTimeInMillis,
		dateOfLast: solves[0].date,
		solves: unsortedSolves
	};
}