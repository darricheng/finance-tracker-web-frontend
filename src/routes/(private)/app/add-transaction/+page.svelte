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
				<!-- TODO: Add dynamic options based on user's preferences -->
				<option disabled selected>Pick one</option>
				<option>Star Wars</option>
				<option>Harry Potter</option>
				<option>Lord of the Rings</option>
				<option>Planet of the Apes</option>
				<option>Star Trek</option>
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
