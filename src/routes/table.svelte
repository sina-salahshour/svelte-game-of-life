<script lang="ts">
	import { createFakeArray } from '$lib/utils/create-fake-array.util';
	import { writable } from 'svelte/store';
	import Cell from './cell.svelte';

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
		if (isPlay) {
			playInterval = setInterval(nextFrame, 100);
		} else {
			clearInterval(playInterval);
		}
	}
</script>

<div
	class="grid grid-cols-[repeat(var(--grid-cols),_minmax(0,_1fr))] m-1 w-fit gap-[2px] bg-white border-white border-x-2 border-y-2 rounded-md overflow-hidden"
	style:--grid-cols={col}
>
	{#each createFakeArray(row) as rowIndex}
		{#each createFakeArray(col) as colIndex}
			<Cell {rowIndex} {colIndex} {tableData} />
		{/each}
	{/each}
</div>

<div class="flex gap-4 mt-auto text-white">
	<button on:click={nextFrame}>next</button>
	<button
		on:click={() => {
			isPlay = !isPlay;
		}}
	>
		{isPlay ? 'pause' : 'play'}
	</button>
</div>
