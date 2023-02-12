<script lang="ts">
	// TODO: Add a button beside each category to remove it from the list
	// TODO: Update the database with the categories

	let categoryInput = '';

	let categories: string[] = [];

	function addNewCategory() {
		// Add the category to the categories array, then clear the input field
		categories = [...categories, categoryInput];
		categoryInput = '';
		console.log(categories);
	}

	function removeCategory(i: number) {
		// Remove the category from the categories array
		return () => {
			categories = categories.filter((_, index) => index !== i);
			console.log(categories);
		};
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
	<button class="btn btn-primary">Finish</button>
</section>
