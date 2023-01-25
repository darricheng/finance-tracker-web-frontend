<script>
	import { goto } from '$app/navigation';
	import authStore from '$lib/stores/authStore';
	import { getAuth } from 'firebase/auth';

	// Send users who aren't logged in to the login page
	authStore.subscribe(async ({ isLoggedIn, firebaseControlled }) => {
		if (!isLoggedIn && firebaseControlled) {
			await goto('/login');
		}
	});

	// Logout function
	async function logout() {
		const auth = getAuth();
		try {
			await auth.signOut();
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="navbar bg-base-100 px-8">
	<div class="flex-1 gap-2">
		<a href="/app/dashboard" class="btn btn-ghost normal-case text-xl">Dashboard</a>
		<a href="/app/transactions" class="btn btn-ghost normal-case text-xl">Transactions</a>
	</div>
	<div class="flex-none gap-2">
		<ul class="menu menu-horizontal px-1">
			<li><a>New Transaction</a></li>
		</ul>
		<div class="dropdown dropdown-end">
			<label tabindex="0" class="btn btn-ghost btn-circle avatar">
				<div class="w-10 rounded-full">
					<img src="https://placeimg.com/80/80/people" />
				</div>
			</label>
			<ul
				tabindex="0"
				class="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
			>
				<li>
					<a>Profile</a>
				</li>
				<li><a>Settings</a></li>
				<li><a on:click={logout}>Logout</a></li>
			</ul>
		</div>
	</div>
</div>

<slot />
