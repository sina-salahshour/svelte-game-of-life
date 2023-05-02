<script>
	import HoverLightBorder from './hover-light-border.svelte';
</script>

<button on:click>
	<HoverLightBorder
		class="transition rounded-md active:scale-95 hover:scale-105"
		borderClass="rounded-md"
		lightColor="#fff"
		wrapperClass="bg-black"
	>
		<div
			class="w-full px-4 overflow-hidden transition bg-white bg-opacity-20 active:bg-opacity-40 hover:bg-opacity-10"
		>
			<slot />
		</div>
	</HoverLightBorder>
</button>
