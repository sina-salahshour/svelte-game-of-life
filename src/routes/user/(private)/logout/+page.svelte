<script lang="ts">
	import { invalidate } from '$app/navigation';
	import { DependKeys } from '$lib/configs/depend-keys';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	onMount(async () => {
		data.user;
		await fetch('', { method: 'POST', body: new FormData() });
		await invalidate(DependKeys.AUTH);
	});
</script>
