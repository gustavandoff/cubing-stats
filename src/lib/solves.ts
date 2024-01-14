import { writable, derived, get, type Readable } from 'svelte/store';
import { convertMilliseconds, convertDate, calcAo5 } from './utils';

export const rawCSTimerData = writable<any>(null);
const csSessionData = writable<csSessionData[]>([]);

export const setRawCSTimerData = (data: any) => {
	console.log('setRawCSTimerData');
	rawCSTimerData.set(data);
	console.log('rawCSTimerData: ', data);

	csSessionData.set(
		Object.values(JSON.parse(data.properties.sessionData)).map((session: any) => session.name)
	);
	console.log(
		'csSessionData: ',
		Object.values(JSON.parse(data.properties.sessionData)).map((session: any) => session.name)
	);
};

const formatedCSTimerData: Readable<Session[]> = derived(
	[csSessionData, rawCSTimerData],
	([$csSessionData, $rawCSTimerData], set) => {
		let formatedData: Session[] = [];

		for (let i = 1; i < $csSessionData.length; i++) {
			const sessionName = $csSessionData[i].name;
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

const allSinglePBs: Readable<Session[]> = derived(formatedCSTimerData, ($formatedCSTimerData, set) => {
	const data = $formatedCSTimerData;
	let allPBs: Session[] = [];
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

const allAo5 = derived(formatedCSTimerData, ($formatedCSTimerData, set) => {
	let tempAllAo5: Session[] = [];
	$formatedCSTimerData.forEach((session) => {
		let ao5sInThisSession: any[] = [];
		let currentAo5: any = null;

		for (let i = 0; i < session.solves.length - 5; i++) {
			currentAo5 = calcAo5([
				session.solves[i],
				session.solves[i + 1],
				session.solves[i + 2],
				session.solves[i + 3],
				session.solves[i + 4]
			]);
			ao5sInThisSession.push(currentAo5);
		}

		tempAllAo5.push({
			sessionName: session.sessionName,
			solves: ao5sInThisSession
		});
	});

	return set(tempAllAo5);
});
