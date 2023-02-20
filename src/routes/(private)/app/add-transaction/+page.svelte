<script lang="ts">
	import { userStore } from '$lib/stores/userStore';
	// import { onMount } from 'svelte';

	// Ensure that userStore is populated before rendering the page
	function getCategories() {
		if ($userStore) {
			return $userStore.categories;
		} else {
			console.log('failed');
			// TODO: Reconsider what should be returned here, as the userStore is not populated yet
			// Is the user not logged in? Or was there some error when populating the userStore?
			return [];
		}
	}
	const categories = getCategories();
</script>

<section class="flex flex-col items-center justify-center w-full h-full p-12">
	<h1 class="text-3xl font-bold">Add Transaction</h1>
	<form class="flex flex-col w-full max-w-md mt-8">
		<div class="form-control w-full max-w-xs">
			<label class="label" for="amount">
				<span class="label-text">Transaction amount</span>
			</label>
			<input
				type="number"
				id="amount"
				placeholder="Amount"
				class="input input-bordered w-full max-w-xs"
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="category">
				<span class="label-text">Category</span>
			</label>
			<select class="select select-bordered" id="category">
				<option disabled selected>Pick one</option>
				{#each categories as category}
					<option value={category}>{category}</option>
				{/each}
			</select>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="description">
				<span class="label-text">Description</span>
			</label>
			<input
				type="text"
				id="description"
				placeholder="Description"
				class="input input-bordered w-full max-w-xs"
			/>
		</div>
		<button class="btn btn-primary" type="submit"> Add Transaction </button>
	</form>
</section>
