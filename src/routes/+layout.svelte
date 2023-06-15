<script lang="typescript">
	import '$lib/configs/globals.css';
	import Modal from '$lib/containers/modal.svelte';
	import { Toaster } from 'svelte-french-toast';
</script>

<Modal />
<Toaster />

<slot />

<style lang="postcss" global>
	body {
		@apply antialiased;
	}
</style>
