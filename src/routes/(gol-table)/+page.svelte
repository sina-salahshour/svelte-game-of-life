<script lang="ts">
	import HoverLightBorder from '$lib/components/hover-light-border.svelte';
	import { gameTableSize } from '$lib/stores/game-table.store';
	import Table from './table.svelte';
	$: row = $gameTableSize.row;
	$: col = $gameTableSize.col;
</script>

<div class="flex flex-col items-center justify-center h-[100dvh] w-screen p-4 bg-black">
	<h1 class="mb-auto text-lg font-bold text-white">Conway's game of life</h1>
	{#key [row, col]}
		<Table {row} {col} />
	{/key}
	<div class="flex flex-col items-end gap-2 m-4">
		<label class="flex gap-2 text-white">
			<h2>rows:</h2>
			<HoverLightBorder wrapperClass="bg-black">
				<input
					class="p-1 bg-white rounded-sm outline-none bg-opacity-10"
					type="number"
					bind:value={$gameTableSize.row}
					min={1}
				/>
			</HoverLightBorder>
		</label>
		<label class="flex gap-2 text-white">
			<h2>cols:</h2>
			<HoverLightBorder wrapperClass="bg-black">
				<input
					class="p-1 bg-white rounded-sm outline-none bg-opacity-10"
					type="number"
					bind:value={$gameTableSize.col}
					min={1}
				/>
			</HoverLightBorder>
		</label>
	</div>
</div>
