<script>
	import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
	import authStore from '$lib/stores/authStore';

	// TODO: Add Signin via redirect for mobile devices

	async function loginWithGoogle() {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		try {
			const res = await signInWithPopup(auth, provider);
			const credential = GoogleAuthProvider.credentialFromResult(res);
			const user = res.user;
		} catch (error) {
			console.log(error);
		}
	}

	async function logout() {
		const auth = getAuth();
		try {
			await auth.signOut();
		} catch (error) {
			console.log(error);
		}
	}
</script>

{#if $authStore.isLoggedIn}
	<h1>Logged in</h1>
	<h1 on:click={logout} id="google-login">Logout</h1>
{:else}
	<h1>Not logged in</h1>
	<h1 on:click={loginWithGoogle} id="google-login">Login with Google</h1>
{/if}

<style>
	#google-login {
		color: #fff;
		background-color: #4285f4;
		padding: 10px 20px;
		border-radius: 5px;
		cursor: pointer;
	}
</style>
