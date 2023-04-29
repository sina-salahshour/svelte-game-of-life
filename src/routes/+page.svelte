<script lang="ts">
	import { add, set, store, subtract } from '$lib/stores/count.store';
	import Count from './count.svelte';
	import Table from './table.svelte';

	$: count = $store.value;
</script>

<div class="grid grid-cols-[repeat(20,_minmax(0,_1fr))] m-1 w-fit gap-[2px]">
	<Table row={20} col={20} />
</div>
<div class="grid grid-cols-3 gap-2 w-fit">
	<button
		on:click={() => {
			subtract(1);
		}}
	>
		-
	</button>
	<div class="w-6 text-center">
		{count}
	</div>
	<button
		on:click={() => {
			add(1);
		}}
	>
		+
	</button>
	<button
		on:click={() => {
			set('0');
		}}
	>
		reset
	</button>
</div>
<Count />
