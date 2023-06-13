<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
</script>

{data.user?.email}
<br />
<a href="/user/logout">logout</a>
