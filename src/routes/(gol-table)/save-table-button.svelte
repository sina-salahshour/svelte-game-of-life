<script>
	import GradientButton from '$lib/components/gradient-button.svelte';
	import { gameTable } from '$lib/stores/game-table.store';
	import { saveText } from '$lib/utils/save-text.util';

	function saveTable() {
		const table = $gameTable;
		saveText(
			'table.gol',
			table.map((row) => row.map((cell) => (cell ? 1 : 0)).join('')).join('\n')
		);
	}
</script>

<GradientButton on:click={saveTable}>save</GradientButton>
