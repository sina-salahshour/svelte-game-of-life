<script>
	import GradientButton from '$lib/components/gradient-button.svelte';
	import { showModal } from '$lib/stores/modal.store';
	import SaveFileByName from './modals/save-file-by-name.svelte';
	function saveTable() {
		showModal(SaveFileByName);
	}
</script>

<GradientButton type="submit" on:click={saveTable}>save</GradientButton>
