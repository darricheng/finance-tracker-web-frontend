// Implementation of the auth store
// referenced from: https://phptuts.github.io/svelte-docs/firebase-recipe-site/login/

import { writable } from 'svelte/store';
import type { User } from 'firebase/auth';

const authStore = writable<{
	isLoggedIn: boolean;
	user: User | null;
	firebaseControlled: boolean;
}>({
	isLoggedIn: false,
	user: null,
	firebaseControlled: false
});

export default authStore;
