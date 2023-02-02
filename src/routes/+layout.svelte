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
		auth.onAuthStateChanged((user) => {
			authStore.set({
				isLoggedIn: !!user,
				user,
				firebaseControlled: true
			});
		});
	});
</script>

<slot />
