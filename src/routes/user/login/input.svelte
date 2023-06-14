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
</script>

<div class={classNames(className, 's-wrapper')}>
	<input
		bind:value
		class={'s-input'}
		type="text"
		{name}
		{id}
		{placeholder}
		{required}
		data-error={String(!!error)}
	/>
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
</style>
