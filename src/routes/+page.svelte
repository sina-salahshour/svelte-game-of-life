<script lang="ts">
	import Table from './table.svelte';
</script>

<div class="flex flex-col items-center justify-center w-full h-screen p-4 bg-black">
	<h1 class="mb-auto text-lg font-bold text-white">Conway's game of life</h1>
	<Table row={40} col={100} />
</div>
