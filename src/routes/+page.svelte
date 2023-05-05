<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.user}
	<h1>{data.user.username}</h1>
{:else}
	<a href="/user/login">login</a>
{/if}
