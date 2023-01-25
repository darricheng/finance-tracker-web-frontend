<script>
	import authStore from '$lib/stores/authStore';
	import { goto } from '$app/navigation';

	// Send users who are logged in to their dashboard page
	authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
		if (isLoggedIn && firebaseControlled) {
			await goto('/app/dashboard');
		}
	});
</script>

<div class="navbar bg-base-100 px-8">
	<div class="flex-1">
		<a href="/" class="btn btn-ghost normal-case text-xl">Finance Tracker</a>
	</div>
	<div class="flex-none gap-2">
		<ul class="menu menu-horizontal px-1">
			<li><a href="/about">About</a></li>
			<li><a href="/login">Login</a></li>
		</ul>
	</div>
</div>

<slot />
