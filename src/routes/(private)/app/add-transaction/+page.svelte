<script lang="ts">
	import { userStore } from '$lib/stores/userStore';

	const apiUrl = import.meta.env.VITE_API_URL;

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

	const transaction = {
		amount: 0,
		category: '',
		description: ''
	};

	async function addTransaction(e: Event) {
		if (!e.target) {
			console.log("e.target doesn't exist");
			return;
		}

		// Alert the user if their transaction details are invalid
		if (transaction.amount === 0 || transaction.category === '' || transaction.description === '') {
			// TODO: Replace this with a toast notification instead of an alert
			alert('Please fill in all the fields');
			return;
		}

		// TODO: use zod to validate the transaction details before sending them to the server

		const body = {
			value: transaction.amount,
			category: transaction.category,
			details: transaction.description,
			user_id: $userStore === null ? '' : $userStore._id // userStore shouldn't be null here
		};

		const res = await fetch(`${apiUrl}/transactions/add`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(body)
		});
	}
</script>

<section class="flex flex-col items-center justify-center w-full h-full p-12">
	<h1 class="text-3xl font-bold">Add Transaction</h1>
	<form class="flex flex-col w-full max-w-md mt-8" on:submit|preventDefault={addTransaction}>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="amount">
				<span class="label-text">Transaction amount</span>
			</label>
			<input
				type="number"
				id="amount"
				placeholder="Amount"
				class="input input-bordered w-full max-w-xs"
				bind:value={transaction.amount}
			/>
		</div>
		<div class="form-control w-full max-w-xs">
			<label class="label" for="category">
				<span class="label-text">Category</span>
			</label>
			<select class="select select-bordered" id="category" bind:value={transaction.category}>
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
				bind:value={transaction.description}
			/>
		</div>
		<button class="btn btn-primary" type="submit">Add Transaction</button>
	</form>
</section>
