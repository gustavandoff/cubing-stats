export const convertMilliseconds = (milliseconds: number): string => {
	const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hundredths = Math.floor((milliseconds % 1000) / 10);

    if (minutes > 0) {
        return `${minutes}:${seconds.toString().padStart(2, '0')}.${hundredths.toString().padStart(2, '0')}`;
    } else {
        return `${seconds}.${hundredths.toString().padStart(2, '0')}`;
    }
};

export const convertDate = (s: number): string => {
    const date = new Date(s * 1000);
    return date.toLocaleDateString();
};

export const calcAo5 = (solves: Solve[]): Solve => {
	const unsortedSolves = [...solves];
	solves.sort((a, b) => a.timeInMillis - b.timeInMillis);
	const avgTimeInMillis =
		(solves[1].timeInMillis + solves[2].timeInMillis + solves[3].timeInMillis) / 3;
	return {
		time: convertMilliseconds(avgTimeInMillis),
		timeInMillis: avgTimeInMillis,
		date: solves[4].date
	};
};

export const calcMean = (solves: Solve[]): Solve => {
	const unsortedSolves = [...solves];
	solves.sort((a, b) => b.timeInMillis - a.timeInMillis);
	const avgTimeInMillis = solves.reduce((acc, curr) => acc + curr.timeInMillis, 0) / solves.length;
	return {
		time: convertMilliseconds(avgTimeInMillis),
		timeInMillis: avgTimeInMillis,
		date: solves[0].date
	};
}