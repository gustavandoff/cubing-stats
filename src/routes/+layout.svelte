<script lang="ts">
	import { browser } from '$app/environment';
	
	import '@fortawesome/fontawesome-free/css/all.min.css'

	import LoadTimes from '$lib/components/LoadTimes.svelte';
	import LoginSignupButtons from '$lib/components/login/LoginSignupButtons.svelte';
	import LoginForm from '$lib/components/login/LoginForm.svelte';
	import SignupForm from '$lib/components/login/SignupForm.svelte';

	import { rawCSTimerData, setDataFromLocalStorage } from '$lib/solves';

	$: if (browser && localStorage.getItem('rawCSTimerData') && !$rawCSTimerData) {
		setDataFromLocalStorage();
	}

	$: showLoadTimes = showUpload || (browser && !localStorage.getItem('rawCSTimerData') && !$rawCSTimerData);

	let showLogin = false;
	let showSignup = false;
	let showUpload = false;

	function setShowLogin(show: boolean) {
		showLogin = show;
	}

	function setShowSignup(show: boolean) {
		showSignup = show;
	}

	function setShowUpload(show: boolean) {
		showUpload = show;
	}
</script>

{#if showLoadTimes}
	<LoadTimes on:close={() => setShowUpload(false)} />
{/if}
<LoginSignupButtons on:login={() => setShowLogin(true)} on:signup={() => setShowSignup(true)} on:upload={() => setShowUpload(true)} />
	

{#if showLogin}
	<LoginForm on:close={() => setShowLogin(false)} />
{/if}

{#if showSignup}
	<SignupForm on:close={() => setShowSignup(false)} />
{/if}



<slot />