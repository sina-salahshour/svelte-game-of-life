<script lang="ts">
	import Table from './table.svelte';
	let row = 10;
	let col = 10;
</script>

<div class="flex flex-col items-center justify-center w-full h-[100dvh] p-4 bg-black">
	<h1 class="mb-auto text-lg font-bold text-white">Conway's game of life</h1>
	{#key [row, col]}
		<Table {row} {col} />
	{/key}
	<div class="flex flex-col items-end gap-2">
		<label class="flex gap-2 text-white">
			<h2>rows:</h2>
			<input
				class="bg-white rounded-sm outline-none bg-opacity-10"
				type="number"
				bind:value={row}
				min={1}
			/>
		</label>
		<label class="flex gap-2 text-white">
			<h2>cols:</h2>
			<input
				class="bg-white rounded-sm outline-none bg-opacity-10"
				type="number"
				bind:value={col}
				min={1}
			/>
		</label>
	</div>
</div>
