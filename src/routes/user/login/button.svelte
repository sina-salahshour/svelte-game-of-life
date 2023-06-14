<script lang="ts">
	import { classNames } from '$lib/utils/class-names.util';

	let className: string | undefined = undefined;
	export { className as class };
	export let type: 'submit' | 'button' | 'reset' | undefined = undefined;
	export let variant: 'solid' | 'outlined' = 'solid';
	export let disabled = false;
	export let loading = false;
</script>

<button
	data-variant={variant}
	data-loading={loading}
	{disabled}
	class={classNames(className, 's-button')}
	{type}
	on:click
>
	{#if loading}
		<div class="flex items-center justify-center gap-[10px]">
			<img class="s-loading-spinner" src="/icons/spinner.png" alt="" />
			loading
		</div>
	{:else}
		<slot />
	{/if}
</button>

<style lang="postcss">
	.s-button {
		@apply px-5 py-3 min-h-[65px] bg-[#1B1B1B] rounded-xl border-[#3B3A3A3A] border-[1px] w-full transition;
		@apply font-semibold text-xl text-[#fffc];
		&[data-variant='solid'] {
			@apply bg-[#3B3A3A];
		}
		&:hover {
			box-shadow: inset 0px 0px 15px 1px rgba(217, 217, 217, 0.75);
		}
		&:disabled {
			@apply cursor-not-allowed;
			@apply blur-[2px];
			&[data-loading='true'] {
				@apply blur-0;
			}
		}
	}
	.s-loading-spinner {
		@apply w-[30px] h-[30px] animate-spin;
	}
</style>
