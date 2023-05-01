<script lang="ts">
	import { createFakeArray } from '$lib/utils/create-fake-array.util';
	import { writable } from 'svelte/store';
	import Cell from './cell.svelte';
	import GradientButton from '$lib/components/gradient-button.svelte';

	export let row: number;
	export let col: number;
	let tableData = writable(createFakeArray(row).map(() => createFakeArray(col).map(() => false)));

	function nextFrame() {
		let data = $tableData;
		let data2 = createFakeArray(row).map(() => createFakeArray(col).map(() => false));
		data.forEach((row, rowIndex) =>
			row.forEach((cellValue, colIndex) => {
				const directions = [
					[-1, -1],
					[-1, 0],
					[-1, 1],
					[0, -1],
					[0, 1],
					[1, -1],
					[1, 0],
					[1, 1]
				];
				let liveCells = 0;
				directions.forEach(([x, y]) => {
					if (
						data[(x + data.length + rowIndex) % data.length][
							(y + row.length + colIndex) % row.length
						]
					)
						liveCells++;
				});
				switch (liveCells) {
					case 3:
						data2[rowIndex][colIndex] = true;
						break;
					case 2:
						data2[rowIndex][colIndex] = cellValue;
						break;
					default:
						data2[rowIndex][colIndex] = false;
						break;
				}
			})
		);
		$tableData = data2;
	}
	let isPlay = false;
	let playInterval: number;

	$: {
		clearInterval(playInterval);
		if (isPlay) {
			playInterval = setInterval(nextFrame, 50);
		}
	}
</script>

<div
	class="max-w-full m-4 overflow-auto bg-white border-white rounded-md h-fit border-x-2 border-y-2"
>
	<div
		class="grid grid-cols-[repeat(var(--grid-cols),_minmax(0,_1fr))] w-fit gap-[2px] overflow-auto min-w-max min-h-max"
		style:--grid-cols={col}
	>
		{#each createFakeArray(row) as rowIndex}
			{#each createFakeArray(col) as colIndex}
				<Cell {rowIndex} {colIndex} {tableData} {isPlay} />
			{/each}
		{/each}
	</div>
</div>

<div class="flex flex-col gap-1 my-auto leading-10 text-white w-28">
	<GradientButton on:click={nextFrame}>next</GradientButton>
	<GradientButton
		on:click={() => {
			isPlay = !isPlay;
		}}
	>
		{isPlay ? 'pause' : 'play'}
	</GradientButton>
</div>
