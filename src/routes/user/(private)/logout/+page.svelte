<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { DependKeys } from '$lib/configs/depend-keys';
	import { onMount } from 'svelte';

	onMount(async () => {
		await fetch('', { method: 'POST', body: new FormData() });
		invalidate(DependKeys.AUTH);
	});
</script>
