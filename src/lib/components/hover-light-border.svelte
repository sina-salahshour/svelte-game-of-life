<script lang="ts">
	import { classNames } from '$lib/utils/class-names.util';

	let hover_div: HTMLDivElement;
	let className: string | null = null;
	export let borderClass: string | null = null;
	export { className as class };
	export let lightColor = '#fff8';
	export let lightSize = '100px';
</script>

<div
	class={classNames('overflow-hidden s-gradient w-[inherit] h-[inherit]', className)}
	bind:this={hover_div}
	style:--light-color={lightColor}
	style:--light-size={lightSize}
>
	<div class={classNames('w-[inherit] h-[inherit] overflow-hidden s-gradient-border', borderClass)}>
		<slot />
	</div>
</div>

<svelte:window
	on:mousemove={({ clientX, clientY }) => {
		const { left, top } = hover_div.getBoundingClientRect();
		hover_div.style.setProperty('--gradient-x', `${clientX - left}px`);
		hover_div.style.setProperty('--gradient-y', `${clientY - top}px`);
	}}
/>

<style lang="postcss">
	.s-gradient {
		background-image: radial-gradient(
			var(--light-size) circle at var(--gradient-x) var(--gradient-y),
			var(--light-color),
			transparent 80%
		);
	}
	.s-gradient-border {
		border: 2px solid transparent;
	}
</style>
