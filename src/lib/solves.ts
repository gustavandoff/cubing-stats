import { writable, derived, get, type Readable } from 'svelte/store';
import { convertHundredths, convertDate } from './utils';

export const currentSession = writable<string>();
export const rawCSTimerData = writable<any>(null);
const csSessionData = writable<csSessionData[]>([]);

export const setRawCSTimerData = (data: any) => {
	rawCSTimerData.set(data);

	const tempSessionData = [null, ...Object.values(data.properties.sessionData).map((session: any) => session.name)];
	csSessionData.set(tempSessionData);
	currentSession.set(tempSessionData[1]);
	
	localStorage.setItem('rawCSTimerData', JSON.stringify(data));
	localStorage.setItem('csSessionData', JSON.stringify(tempSessionData));
	localStorage.setItem('currentSession', tempSessionData[1]);
};

export const setDataFromLocalStorage = () => {
	const rawCSTimerDataFromLocalStorage = JSON.parse(localStorage.getItem('rawCSTimerData') || '{}');
	const csSessionDataFromLocalStorage = JSON.parse(localStorage.getItem('csSessionData') || '[]');
	const currentSessionFromLocalStorage = localStorage.getItem('currentSession') || '';

	rawCSTimerData.set(rawCSTimerDataFromLocalStorage);
	csSessionData.set(csSessionDataFromLocalStorage);
	currentSession.set(currentSessionFromLocalStorage);
}

export const addSolve = (solve: SessionSolve) => {
	rawCSTimerData.update(data => {
		const sessionIndex = get(csSessionData).indexOf(get(currentSession));
		data['session' + sessionIndex].push(solve);

		if (!data.properties.sessionData['session' + sessionIndex].hasOwnProperty('stat')) {
			data.properties.sessionData['session' + sessionIndex].stat = [1, 0, solve[0][1]];
			data.properties.sessionData['session' + sessionIndex].date = [solve[3], solve[3]];

			return data;
		}

		const totalSolves = data.properties.sessionData['session' + sessionIndex].stat[0];
		const currentAverage = data.properties.sessionData['session' + sessionIndex].stat[2];
		const newAverage = ((currentAverage * totalSolves) + solve[0][1]) / totalSolves;

		data.properties.sessionData['session' + sessionIndex].stat[0] = totalSolves + 1;
		data.properties.sessionData['session' + sessionIndex].stat[2] = newAverage;
		data.properties.sessionData['session' + sessionIndex].date[1] = solve[3];


		return data;
	});
}

export const removeSolve = (scramble: string, time: number) => {
	rawCSTimerData.update(data => {
		const sessionIndex = get(csSessionData).indexOf(get(currentSession));

		const solve = data['session' + sessionIndex].find((s: SessionSolve) => 
			(s[0][1]).toString().substring(0, time.toString().length) === time.toString() && s[1] === scramble
		);

		if (!solve) return data;

		if (data.properties.sessionData['session' + sessionIndex].stat[0] === 1) {
			data.properties.sessionData['session' + sessionIndex].stat = [0, 0, -1];
			data.properties.sessionData['session' + sessionIndex].date = [null, null];
			data['session' + sessionIndex] = [];
			return data;
		}

		if (data.properties.sessionData['session' + sessionIndex].date[1] === solve[3]) {
			data.properties.sessionData['session' + sessionIndex].date[1] = data['session' + sessionIndex][data['session' + sessionIndex].length - 1][3];
		}

		const totalSolves = data.properties.sessionData['session' + sessionIndex].stat[0];
		const currentAverage = data.properties.sessionData['session' + sessionIndex].stat[2];
		const newAverage = ((currentAverage * totalSolves) - solve[0][1]) / (totalSolves - 1);

		data.properties.sessionData['session' + sessionIndex].stat[0] = totalSolves - 1;
		data.properties.sessionData['session' + sessionIndex].stat[2] = newAverage;

		data['session' + sessionIndex] = data['session' + sessionIndex].filter((s: SessionSolve) => 
			!((s[0][1]).toString().substring(0, time.toString().length) === time.toString() && s[1] === scramble)
		);
		return data;
	});
}

export const formattedCSTimerData: Readable<Session[]> = derived(
	[csSessionData, rawCSTimerData],
	([$csSessionData, $rawCSTimerData], set) => {
		let formattedData: Session[] = [];

		for (let i = 1; i < $csSessionData.length; i++) {
			const sessionName = $csSessionData[i];
			const session = $rawCSTimerData['session' + i];

			let formattedSession: Solve[] = [];

			session.forEach((solve: SessionSolve) => {
				const timeInHundredths = Math.floor(solve[0][1] / 10);
				formattedSession.push({
					time: convertHundredths(timeInHundredths),
					timeInHundredths: timeInHundredths,
					scramble: solve[1],
					comment: solve[2],
					date: convertDate(solve[3])
				});
			});

			formattedData.push({
				sessionName: '' + sessionName,
				solves: formattedSession,
				sessionData: $rawCSTimerData.properties.sessionData[i]
			});
		}
		set(formattedData);
	}
);

export const currentSessionData: Readable<Session> = derived(
	[formattedCSTimerData, currentSession],
	([$formattedCSTimerData, $currentSession], set) => {
		const emptySession: Session = { sessionName: '', solves: [], sessionData: { date: [null, null], name: '', opt: {}, rank: 0, stat: [0, 0, -1] } };
		const session = $formattedCSTimerData.find(s => s.sessionName === $currentSession) || emptySession;
		set(session);
		localStorage.setItem('currentSession', session.sessionName);
	}
);