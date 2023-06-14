<script lang="typescript">
	import '$lib/configs/globals.css';
	import Modal from '$lib/containers/modal.svelte';
</script>

<Modal />

<slot />

<style lang="postcss" global>
	body {
		@apply antialiased;
	}
</style>
