<script lang="ts">
	import GradientButton from '$lib/components/gradient-button.svelte';
	import { gameTable, gameTableSize } from '$lib/stores/game-table.store';
	import { tick } from 'svelte';

	let files: FileList;
	let fileRef: HTMLInputElement;
	$: if (files) {
		for (const file of files) {
			(async () => {
				const fileContent = await file.text();
				const loadedTable = fileContent
					.split('\n')
					.map((row) => row.split('').map((cell) => (cell === '0' ? false : true)));
				$gameTableSize = { row: loadedTable.length, col: loadedTable?.[0]?.length || 0 };
				await tick();
				$gameTable = loadedTable;
			})();
		}
	}
</script>

<input type="file" bind:files class="hidden" bind:this={fileRef} accept=".gol" />
<GradientButton on:click={() => fileRef.click()}>load</GradientButton>
