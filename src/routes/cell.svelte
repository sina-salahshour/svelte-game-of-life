<script lang="ts">
	import type { Writable } from 'svelte/store';

	export let tableData: Writable<boolean[][]>;
	export let rowIndex: number;
	export let colIndex: number;
</script>

<button
	class="w-4 bg-black data-[active=true]:bg-white h-4 hover:bg-opacity-50"
	data-active={$tableData[rowIndex][colIndex]}
	on:click={() => {
		$tableData[rowIndex][colIndex] = !$tableData[rowIndex][colIndex];
	}}
/>
