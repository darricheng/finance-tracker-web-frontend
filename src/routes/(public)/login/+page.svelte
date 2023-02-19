<script lang="ts">
	import {
		getAuth,
		signInWithPopup,
		GoogleAuthProvider,
		getAdditionalUserInfo
	} from 'firebase/auth';
	import type { User, UserCredential } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { userStore } from '$lib/stores/userStore';

	// TODO: Add Signin via redirect for mobile devices

	async function loginWithGoogle() {
		const provider = new GoogleAuthProvider();
		const auth = getAuth();
		try {
			const res: UserCredential = await signInWithPopup(auth, provider);
			const user: User = res.user;

			const isNewUser = getAdditionalUserInfo(res)?.isNewUser;

			// If it's a new user, add details to the database then redirect to category setup page.
			// Else do nothing as logged in user will be redirected to dashboard automatically. (See src/routes/(public)/+layout.svelte)
			if (isNewUser) {
				// Add user details to the user store
				userStore.login({
					email: user.email as string,
					firebase_id: user.uid,
					categories: []
				});

				const apiUrl = import.meta.env.VITE_API_URL;
				const res = await fetch(`${apiUrl}/users/add_user`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						firebase_id: user.uid,
						email: user.email
					})
				});

				if (res.status === 201) {
					goto('/app/setup');
				} else {
					console.error('Error adding user to database. Error code: ', res.status);
				}
			}
			// For existing users, fetch their data from the database to store in the userStore
			else {
				const apiUrl = import.meta.env.VITE_API_URL;
				const res = await fetch(`${apiUrl}/users/get_user_by_email?${user.email}`, {
					method: 'GET'
				});

				if (res.status === 200) {
					const data = await res.json();
					userStore.login(data);
				} else {
					console.error('Error fetching user data from database. Error code: ', res.status);
				}
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div on:click={loginWithGoogle} on:keydown={loginWithGoogle} class="google-btn">
	<div class="google-icon-wrapper">
		<img
			class="google-icon"
			alt="Google signin button"
			src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
		/>
	</div>
	<p class="btn-text"><b>Sign in with google</b></p>
</div>

<style>
	/* Styling for the google login button */
	@import url(https://fonts.googleapis.com/css?family=Roboto:500);
	.google-btn {
		display: inline-flex;
		height: 44px;
		background-color: #4285f4;
		border-radius: 2px;
		box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
		cursor: pointer;
	}
	.google-icon-wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 44px;
		height: 44px;
		border-radius: 2px 0 0 2px;
		background-color: #fff;
	}
	.google-icon {
		width: 18px;
		height: 18px;
	}
	.btn-text {
		margin: 12px 12px;
		color: #fff;
		font-size: 14px;
		font-family: 'Roboto';
	}
	.google-btn:hover {
		box-shadow: 0 0 6px #4285f4;
	}
	.google-btn:active {
		background: #1669f2;
	}
</style>
