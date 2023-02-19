<script lang="ts">
	import { getAuth } from 'firebase/auth';
	import { goto } from '$app/navigation';
	import { userStore, type AppUser } from '$lib/stores/userStore';

	// Categories variables
	let categoryInput = '';
	let categories: string[] = [];

	function addNewCategory() {
		// Add the category to the categories array, then clear the input field
		categories = [...categories, categoryInput];
		categoryInput = '';
	}

	function removeCategory(i: number) {
		// Remove the category from the categories array
		return () => {
			categories = categories.filter((_, index) => index !== i);
		};
	}

	async function submitCategories() {
		const auth = getAuth();
		const user = auth.currentUser;

		if (!user) {
			console.error('User not logged in, not supposed to be here.');
			return;
		}
		if (categories.length === 0) {
			console.log('No categories created.');
			// TODO: Add a toast message to tell the user to add at least one category
		}

		try {
			const apiUrl = import.meta.env.VITE_API_URL;
			const res = await fetch(`${apiUrl}/users/update_user_categories`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					email: user.email,
					categories
				})
			});

			if (res.status === 200) {
				// Update the user store with the new categories
				userStore.update((userObj) => {
					if (!userObj) {
						console.error('User not logged in, not supposed to be here.');
						return null; // If user isn't logged in, the userStore will be null anyway, so just return null
					}
					userObj.categories = categories;
					return userObj;
				});
				// TODO: Add a success message to tell the user that the categories were added successfully, then redirect to dashboard
				goto('/app/dashboard');
			}
		} catch (error) {
			console.error(error);
		}
	}
</script>

<section class="w-full mt-12 flex flex-col space-y-8 items-center">
	<section class="prose text-center">
		<h1>Setup</h1>
		<p class="text-2xl">What are your main spending categories?</p>
		<ul class="text-left px-24">
			{#each categories as category, i (i)}
				<li class="relative pb-6 mb-6 text-lg border-b border-dotted border-b-gray-400">
					{category}
					<span
						class="btn btn-circle btn-outline m-0 absolute -top-3 right-0"
						on:click={removeCategory(i)}
						on:keydown={removeCategory(i)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="h-6 w-6"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width="2"
								d="M6 18L18 6M6 6l12 12"
							/></svg
						>
					</span>
				</li>
			{/each}
		</ul>
	</section>
	<form
		id="new-categories-input"
		class="flex items-end space-x-4"
		on:submit|preventDefault={addNewCategory}
	>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="category-input">
				<span class="label-text">Input a category</span>
			</label>
			<!-- svelte-ignore a11y-autofocus -->
			<input
				id="category-input"
				type="text"
				placeholder="e.g. Food, Transport"
				class="input input-bordered w-full max-w-xs"
				bind:value={categoryInput}
				autofocus
			/>
		</div>
		<button class="btn btn-accent" id="add-new-category" type="submit">Add</button>
	</form>
	<button class="btn btn-primary" on:click={submitCategories} on:keydown={submitCategories}
		>Finish</button
	>
</section>
