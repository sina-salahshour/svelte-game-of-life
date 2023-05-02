<script lang="ts">
	import { createFakeArray } from '$lib/utils/create-fake-array.util';
	import Cell from './cell.svelte';
	import GradientButton from '$lib/components/gradient-button.svelte';
	import { gameTable } from '$lib/stores/game-table.store';
	import SaveTableButton from './save-table-button.svelte';
	import LoadTableButton from './load-table-button.svelte';

	export let row: number;
	export let col: number;
	function setEmptyTable(row: number, col: number) {
		$gameTable = createFakeArray(row).map(() => createFakeArray(col).map(() => false));
	}
	function pauseGame() {
		isPlay = !isPlay;
	}
	$: {
		setEmptyTable(row, col);
	}

	function nextFrame() {
		let data = $gameTable;
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
		$gameTable = data2;
	}
	let isPlay = false;
	let playInterval: number;

	$: {
		row;
		col;
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
				<Cell {rowIndex} {colIndex} {isPlay} />
			{/each}
		{/each}
	</div>
</div>

<div class="grid w-40 grid-cols-2 gap-1 my-auto leading-10 text-white min-w-fit">
	<GradientButton on:click={nextFrame}>next</GradientButton>
	<GradientButton on:click={pauseGame}>
		{isPlay ? 'pause' : 'play'}
	</GradientButton>
	<SaveTableButton />
	<LoadTableButton on:load={pauseGame} />
</div>
