import { writable, derived, get, type Readable } from 'svelte/store';
import { convertMilliseconds, convertDate } from './utils';

export const rawCSTimerData = writable<any>(null);
const csSessionData = writable<csSessionData[]>([]);

export const setRawCSTimerData = (data: any) => {
	console.log('setRawCSTimerData');
	rawCSTimerData.set(data);
	console.log('rawCSTimerData: ', data);

	csSessionData.set(
		[null, ...Object.values(JSON.parse(data.properties.sessionData)).map((session: any) => session.name)]
	);
	console.log(
		'csSessionData: ',
		[null, ...Object.values(JSON.parse(data.properties.sessionData)).map((session: any) => session.name)]
	);
};

export const formatedCSTimerData: Readable<Session[]> = derived(
	[csSessionData, rawCSTimerData],
	([$csSessionData, $rawCSTimerData], set) => {
		let formatedData: Session[] = [];

		console.log('$csSessionData: ', $csSessionData);
		for (let i = 1; i < $csSessionData.length; i++) {
			const sessionName = $csSessionData[i];
			const session = $rawCSTimerData['session' + i];

			let formatedSession: Solve[] = [];

			session.forEach((solve: SessionSolve) => {
				formatedSession.push({
					time: convertMilliseconds(solve[0][1]),
					timeInMillis: solve[0][1],
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
			if (!currentPB || solve.timeInMillis < currentPB.timeInMillis) {
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
