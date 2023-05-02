<script lang="ts">
	import { classNames } from '$lib/utils/class-names.util';
	import HoverLightBorder from './hover-light-border.svelte';
	let className: null | string = null;
	export { className as class };
</script>

<button on:click>
	<HoverLightBorder
		class={classNames('transition rounded-md active:scale-95 hover:scale-105', className)}
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
