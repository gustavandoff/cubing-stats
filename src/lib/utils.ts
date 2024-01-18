export const convertDate = (s: number): string => {
	const date = new Date(s * 1000);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

export const convertMilliseconds = (milliseconds: number): string => {
	milliseconds *= 10;
	const totalSeconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;
	const hundredths = Math.floor((milliseconds % 1000) / 10);

	const formattedHundredths = hundredths.toString().padStart(2, '0');

	if (minutes > 0) {
		return `${minutes}:${seconds.toString().padStart(2, '0')}.${formattedHundredths}`;
	} else {
		return `${seconds}.${formattedHundredths}`;
	}
};

interface calcedSolve {
	best: Solve[];
	worst: Solve[];
	average: Solve;
}

const calcAvg = (
	solves: Solve[],
	removedCount: number,
	lastBest?: Solve[],
	lastWorst?: Solve[],
	removedSolve?: Solve,
	lastAverage?: Solve
): calcedSolve => {
	if (2 * removedCount > solves.length - 1) {
		throw new Error('Too many solves removed');
	}

	const addedSolve = solves[solves.length - 1];
	if (lastBest && lastWorst && removedSolve && lastAverage) {
		const addedTime = addedSolve.timeInMillis;
		const lastRemovedTime = removedSolve.timeInMillis;
		const lastAverageTime = lastAverage.timeInMillis;

		if (lastRemovedTime === addedTime) {
			return {
				best: lastBest,
				worst: lastWorst,
				average: {
					...lastAverage,
					date: addedSolve.date
				}
			};
		}

		const lastBestTime = lastBest[0].timeInMillis;
		const lastWorstTime = lastWorst[lastWorst.length - 1].timeInMillis;
		if (lastRemovedTime < lastBestTime) {
			if (addedTime < lastBestTime) {
				return {
					best: lastBest,
					worst: lastWorst,
					average: {
						...lastAverage,
						date: addedSolve.date
					}
				};
			}
		} else if (lastRemovedTime > lastWorstTime) {
			if (addedTime > lastWorstTime) {
				return {
					best: lastBest,
					worst: lastWorst,
					average: {
						...lastAverage,
						date: addedSolve.date
					}
				};
			}
		} else {
			if (addedTime > lastBestTime && addedTime < lastWorstTime && lastRemovedTime > lastBestTime && lastRemovedTime < lastWorstTime) {
				const averageSampleSize = solves.length - 2 * removedCount;

				const newAverage =
					0.00001 + ((lastAverageTime * averageSampleSize - lastRemovedTime + addedTime) / averageSampleSize);
				return {
					best: lastBest,
					worst: lastWorst,
					average: {
						time: convertMilliseconds(newAverage),
						timeInMillis: newAverage,
						date: addedSolve.date
					}
				};
			}
		}
	}

	solves.sort((a, b) => b.timeInMillis - a.timeInMillis);

	const worstSolves = solves.splice(0, removedCount);
	const bestSolves = solves.splice(solves.length - removedCount, removedCount);

	return {
		best: bestSolves,
		worst: worstSolves,
		average: {
			...calcMean(solves),
			date: addedSolve.date
		}
	};
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
	console.log('Starting getAllAoX');
	const startTime = new Date().getTime();
	let removedCount = 0;
	switch (x) {
		case 5:
		case 12:
			removedCount = 1;
			break;
		case 25:
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
	const limit = solves.length - x;

	let lastBest: Solve[] = [];
	let lastWorst: Solve[] = [];
	let lastAverage: Solve = { time: '0.00', timeInMillis: 0, date: '' };

	for (let i = 0; i <= limit; i++) {
		const { best, worst, average } = calcAvg(
			solves.slice(i, i + x),
			removedCount,
			lastBest,
			lastWorst,
			solves[i - 1],
			lastAverage
		);
		lastBest = best;
		lastWorst = worst;
		lastAverage = average;
		aoXs.push(average);
	}

	const time = new Date().getTime() - startTime;
	console.log(`getAllAoX Done in ${time}ms`);
	console.log('aoXs', aoXs);
	return aoXs;
};
