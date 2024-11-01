// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

interface Solve {
	time: string;
	timeInHundredths: number;
	scramble?: string;
	comment?: string;
	date: string;
}

interface Session {
	sessionName: string;
	solves: Solve[];
}

interface SessionSolve {
	0: number[]; // time in milliseconds
	1: string;   // scramble
	2: string;   // comment
	3: number;   // date
}

type csSessionData = string | number;
