<script lang="ts">
	import { createFakeArray } from '$lib/utils/create-fake-array.util';
	import { writable } from 'svelte/store';
	import Cell from './cell.svelte';

	export let row: number;
	export let col: number;
	let tableData = writable(createFakeArray(row).map(() => createFakeArray(col).map(() => false)));
</script>

{#each createFakeArray(row) as rowIndex}
	{#each createFakeArray(col) as colIndex}
		<Cell {rowIndex} {colIndex} {tableData} />
	{/each}
{/each}
