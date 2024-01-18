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

export const formatedCSTimerData: Readable<Session[]> = derived(
	[csSessionData, rawCSTimerData],
	([$csSessionData, $rawCSTimerData], set) => {
		let formatedData: Session[] = [];

		for (let i = 1; i < $csSessionData.length; i++) {
			const sessionName = $csSessionData[i];
			const session = $rawCSTimerData['session' + i];

			let formatedSession: Solve[] = [];

			session.forEach((solve: SessionSolve) => {
				formatedSession.push({
					time: convertHundredths(solve[0][1]),
					timeInHundredths: Math.floor(solve[0][1] / 10),
					scramble: solve[1],
					comment: solve[2],
					date: convertDate(solve[3])
				});
			});

			if (formatedSession.length !== 0) {
				formatedData.push({
					sessionName: '' + sessionName,
					solves: formatedSession
				});
			}
		}
		set(formatedData);
	}
);

export const allSinglePBs: Readable<Session[]> = derived(formatedCSTimerData, ($formatedCSTimerData, set) => {
	const data = $formatedCSTimerData;
	let allPBs: Session[] = [];
	console.log('$formatedCSTimerData: ', $formatedCSTimerData);
	
	$formatedCSTimerData.forEach((session) => {
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
