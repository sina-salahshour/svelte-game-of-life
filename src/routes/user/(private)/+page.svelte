<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	console.log(data.user);
</script>

<h1>Profile</h1>
<div>
	<p>User id: {data.user.userId}</p>
	<p>Username: {data.user.username}</p>
</div>
