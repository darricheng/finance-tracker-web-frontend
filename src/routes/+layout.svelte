<script>
	// Required for using tailwindcss, which itself is a dependency of daisyui
	// See: https://tailwindcss.com/docs/guides/sveltekit
	import '../app.css';

	// This component provides the authStore to all child components, which is the entire app
	// See authStore.ts for more info on how the auth was implemented
	import { initializeApp } from 'firebase/app';
	import { getAuth } from 'firebase/auth';
	import { onMount } from 'svelte';
	import authStore from '$lib/stores/authStore';
	import { userStore } from '$lib/stores/userStore';

	onMount(() => {
		const firebaseConfig = {
			apiKey: 'AIzaSyBbxWGIbu8X8tva7LDb6TZpy7mMffMzhE0',
			authDomain: 'finance-tracker-app-2304e.firebaseapp.com',
			projectId: 'finance-tracker-app-2304e',
			storageBucket: 'finance-tracker-app-2304e.appspot.com',
			messagingSenderId: '830578366819',
			appId: '1:830578366819:web:55d8f2e86a8ae39fa59b56'
		};

		const app = initializeApp(firebaseConfig);

		const auth = getAuth(app);
		auth.onAuthStateChanged(async (user) => {
			authStore.set({
				isLoggedIn: !!user,
				user,
				firebaseControlled: true
			});

			// user won't be null as the user should be logged in for this to be called
			if (!user) return;
			// TODO: userStore probably has to be set here as well, for those users who are already logged in
			// when they visit the app.
			// Need to check how this interacts with the setting of userStore in the login page
			const apiUrl = import.meta.env.VITE_API_URL;
			const res = await fetch(`${apiUrl}/users/get_user_by_email?email=${user.email}`, {
				method: 'GET'
			});

			if (res.status === 200) {
				const data = await res.json();
				userStore.login({
					_id: data._id.$oid,
					email: data.email,
					firebase_id: data.firebase_id,
					categories: data.categories
				});
			} else {
				console.error('Error fetching user data from database. Error code: ', res.status);
			}
		});
	});
</script>

<slot />
