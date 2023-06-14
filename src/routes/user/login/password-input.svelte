<script lang="ts">
	import { classNames } from '$lib/utils/class-names.util';
	import { blur, fade } from 'svelte/transition';

	let className: string | undefined = undefined;
	export let value = '';
	export let name = '';
	export let id = '';
	export let placeholder = '';
	export { className as class };
	export let required = false;
	export let error = '';
	let input: HTMLInputElement;
	let visible = false;

	$: {
		if (input) input.type = visible ? 'text' : 'password';
	}
	function toggle_type() {
		visible = !visible;
	}
	const preloadImageUrls = [
		'/icons/toggle-visibility-visible.png',
		'/icons/toggle-visibility-hidden.png',
		'/icons/error.png'
	];
</script>

<svelte:head>
	{#each preloadImageUrls as image}
		<link rel="preload" as="image" href={image} />
	{/each}
</svelte:head>
<div class={classNames(className, 's-wrapper')}>
	<div class="s-input-wrapper">
		<input
			bind:this={input}
			bind:value
			class={'s-input'}
			type="password"
			{name}
			{id}
			{placeholder}
			{required}
			data-error={String(!!error)}
		/>
		<button class="s-toggle-visibility" type="button" on:click={toggle_type}
			><img
				src="/icons/toggle-visibility-{visible ? 'hidden' : 'visible'}.png"
				class="s-toggle-visibility-image"
				alt=""
			/></button
		>
	</div>
	{#if error}
		<div in:blur out:fade class="s-error">
			<img class="s-error-icon" src="/icons/error.png" alt="" />
			{error}
		</div>
	{/if}
</div>

<style lang="postcss">
	.s-wrapper {
		@apply w-full min-h-[97px] relative;
	}
	.s-input {
		@apply p-5 bg-[#1B1B1B] rounded-xl border-[#3B3A3A3A] border-[1px] w-full outline-none transition;
		@apply font-semibold text-xl text-[#fffc];
		@apply placeholder:text-[#3B3A3A];
		&:focus {
			box-shadow: 0px 0px 10px rgba(255, 255, 255, 0.6);
		}
		&[data-error='true'] {
			box-shadow: 0px 0px 15px rgba(253, 45, 45, 0.6);
		}
	}
	.s-error {
		@apply text-[#FD2D2D] font-medium text-sm leading-[17px] mt-[10px] bottom-0 flex gap-[6px];
	}
	.s-error-icon {
		@apply w-4 h-4;
	}

	.s-toggle-visibility {
		@apply absolute right-4 top-1/2 -translate-y-1/2;
		&:hover {
			@apply bg-[#242424] rounded-md;
		}
	}
	.s-toggle-visibility-image {
		@apply w-[30px] h-[30px];
	}
	.s-input-wrapper {
		@apply relative;
	}
</style>
