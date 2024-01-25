import { writable, derived, get, type Readable } from 'svelte/store';
import { convertHundredths, convertDate } from './utils';

export const rawCSTimerData = writable<any>(null);
const csSessionData = writable<csSessionData[]>([]);

export const setRawCSTimerData = (data: any) => {
	rawCSTimerData.set(data);

	const tempSessionData = [null, ...Object.values(JSON.parse(data.properties.sessionData)).map((session: any) => session.name)];
	csSessionData.set(tempSessionData);
	
	localStorage.setItem('rawCSTimerData', JSON.stringify(data));
	localStorage.setItem('csSessionData', JSON.stringify(tempSessionData));
};

export const formattedCSTimerData: Readable<Session[]> = derived(
	[csSessionData, rawCSTimerData],
	([$csSessionData, $rawCSTimerData], set) => {
		let formattedData: Session[] = [];

		for (let i = 1; i < $csSessionData.length; i++) {
			const sessionName = $csSessionData[i];
			const session = $rawCSTimerData['session' + i];

			let formattedSession: Solve[] = [];

			session.forEach((solve: SessionSolve) => {
				formattedSession.push({
					time: convertHundredths(solve[0][1]),
					timeInHundredths: Math.floor(solve[0][1] / 10),
					scramble: solve[1],
					comment: solve[2],
					date: convertDate(solve[3])
				});
			});

			if (formattedSession.length !== 0) {
				formattedData.push({
					sessionName: '' + sessionName,
					solves: formattedSession
				});
			}
		}
		set(formattedData);
	}
);

export const allSinglePBs: Readable<Session[]> = derived(formattedCSTimerData, ($formattedCSTimerData, set) => {
	const data = $formattedCSTimerData;
	let allPBs: Session[] = [];
	console.log('$formattedCSTimerData: ', $formattedCSTimerData);
	
	$formattedCSTimerData.forEach((session) => {
		let pbsInThisSession: Solve[] = [];
		let currentPB: Solve | null = null;

		session.solves.forEach((solve) => {
			if (!currentPB || solve.timeInHundredths < currentPB.timeInHundredths) {
				pbsInThisSession.push(solve);
				currentPB = solve;
			}
		});

		allPBs.push({
			sessionName: session.sessionName,
			solves: pbsInThisSession
		});
	});

	set(allPBs);
});
