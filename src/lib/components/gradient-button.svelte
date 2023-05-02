<script lang="ts">
	import { classNames } from '$lib/utils/class-names.util';
	import HoverLightBorder from './hover-light-border.svelte';
	let className: null | string = null;
	export { className as class };
	export let type: 'button' | 'submit' | 'reset' | null | undefined = null;
</script>

<button on:click {type} class={className}>
	<HoverLightBorder
		class={'transition rounded-md active:scale-[0.99] hover:scale-[1.01]'}
		borderClass="rounded-md"
		lightColor="#fff"
		wrapperClass="bg-black"
	>
		<div
			class="w-full px-4 overflow-hidden transition bg-white bg-opacity-20 active:bg-opacity-30 hover:bg-opacity-10"
		>
			<slot />
		</div>
	</HoverLightBorder>
</button>
