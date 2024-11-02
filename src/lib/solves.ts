import { writable, derived, get, type Readable } from 'svelte/store';
import { convertHundredths, convertDate } from './utils';

const defaultCSTimerData = {
	session1: [],
	session2: [],
	session3: [],
	session4: [],
	session5: [],
	session6: [],
	session7: [],
	session8: [],
	session9: [],
	session10: [],
	session11: [],
	session12: [],
	session13: [],
	session14: [],
	session15: [],
	properties: {
		sessionData: {
      1: {
        name: 1,
        opt: {},
        rank: 1,
        stat: [
          0,
          0,
          -1
        ],
        date: [
          null,
          null
        ]
      },
      2: {
        name: 2,
        opt: {},
        rank: 2
      },
      3: {
        name: 3,
        opt: {},
        rank: 3
      },
      4: {
        name: 4,
        opt: {},
        rank: 4
      },
      5: {
        name: 5,
        opt: {},
        rank: 5
      },
      6: {
        name: 6,
        opt: {},
        rank: 6
      },
      7: {
        name: 7,
        opt: {},
        rank: 7
      },
      8: {
        name: 8,
        opt: {},
        rank: 8
      },
      9: {
        name: 9,
        opt: {},
        rank: 9
      },
      10: {
        name: 10,
        opt: {},
        rank: 10
      },
      11: {
        name: 11,
        opt: {},
        rank: 11
      },
      12: {
        name: 12,
        opt: {},
        rank: 12
      },
      13: {
        name: 13,
        opt: {},
        rank: 13
      },
      14: {
        name: 14,
        opt: {},
        rank: 14
      },
      15: {
        name: 15,
        opt: {},
        rank: 15
      }
    }
	}
};


export const currentSession = writable<string>();
export const rawCSTimerData = writable<any>(null);
const csSessionData = writable<csSessionData[]>([]);

export const setRawCSTimerData = (data: any) => {
	Object.values(data.properties.sessionData).forEach((session: any) => {
		if (!session.hasOwnProperty('stat')) {
			session.stat = [0, 0, -1];
		}
		if (!session.hasOwnProperty('date')) {
			session.date = [null, null];
		}
	});

	rawCSTimerData.set(data);

	const tempSessionData = [null, ...Object.values(data.properties.sessionData).map((session: any) => session.name)];
	csSessionData.set(tempSessionData);
	currentSession.set(tempSessionData[1]);

	localStorage.setItem('rawCSTimerData', JSON.stringify(data));
	localStorage.setItem('csSessionData', JSON.stringify(tempSessionData));
	localStorage.setItem('currentSession', tempSessionData[1]);
};

export const setStartingData = () => {
	if (!localStorage.getItem('rawCSTimerData')) {
		setRawCSTimerData(defaultCSTimerData);
		return;
	}

	const rawCSTimerDataFromLocalStorage = JSON.parse(localStorage.getItem('rawCSTimerData') || '{}');
	const csSessionDataFromLocalStorage = JSON.parse(localStorage.getItem('csSessionData') || '[]');
	const currentSessionFromLocalStorage = localStorage.getItem('currentSession') || '';

	rawCSTimerData.set(rawCSTimerDataFromLocalStorage);
	csSessionData.set(csSessionDataFromLocalStorage);
	currentSession.set(currentSessionFromLocalStorage);
}

export const addSolve = (solve: SessionSolve) => {
	rawCSTimerData.update(data => {
		let sessionIndex = -1;

		const sessData = get(csSessionData);
		const currSess = get(currentSession);

		for (let i = 0; i < sessData.length; i++) {
			if (String(sessData[i]) === String(currSess)) {
				sessionIndex = i;
				break;
			}
		}
		
		data['session' + sessionIndex].push(solve);

		if (!data.properties.sessionData[sessionIndex].hasOwnProperty('stat')) {
			data.properties.sessionData[sessionIndex].stat = [1, 0, solve[0][1]];
			data.properties.sessionData[sessionIndex].date = [solve[3], solve[3]];

			return data;
		}

		const countedTime = Math.floor(solve[0][1] / 10) * 10; // round to nearest 10ms

		const totalSolves = data.properties.sessionData[sessionIndex].stat[0];
		const currentAverage = data.properties.sessionData[sessionIndex].stat[2];
		const newAverage = ((currentAverage * totalSolves) + countedTime) / (totalSolves + 1);

		data.properties.sessionData[sessionIndex].stat[0] = totalSolves + 1;
		data.properties.sessionData[sessionIndex].stat[2] = newAverage;
		data.properties.sessionData[sessionIndex].date[1] = solve[3];

		localStorage.setItem('rawCSTimerData', JSON.stringify(data));
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

		if (data.properties.sessionData[sessionIndex].stat[0] === 1) {
			data.properties.sessionData[sessionIndex].stat = [0, 0, -1];
			data.properties.sessionData[sessionIndex].date = [null, null];
			data['session' + sessionIndex] = [];
			return data;
		}

		if (data.properties.sessionData[sessionIndex].date[1] === solve[3]) {
			data.properties.sessionData[sessionIndex].date[1] = data['session' + sessionIndex][data['session' + sessionIndex].length - 1][3];
		}

		const countedTime = Math.floor(solve[0][1] / 10) * 10; // round to nearest 10ms

		const totalSolves = data.properties.sessionData[sessionIndex].stat[0];
		const currentAverage = data.properties.sessionData[sessionIndex].stat[2];
		const newAverage = ((currentAverage * totalSolves) - countedTime) / (totalSolves - 1);

		data.properties.sessionData[sessionIndex].stat[0] = totalSolves - 1;
		data.properties.sessionData[sessionIndex].stat[2] = newAverage;

		data['session' + sessionIndex] = data['session' + sessionIndex].filter((s: SessionSolve) => 
			!((s[0][1]).toString().substring(0, time.toString().length) === time.toString() && s[1] === scramble)
		);

		localStorage.setItem('rawCSTimerData', JSON.stringify(data));
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
				sessionName: sessionName,
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
		const session = $formattedCSTimerData.find(s => s.sessionName == $currentSession) || emptySession;
		set(session);
	}
);