<script lang="ts">
	import { classNames } from '$lib/utils/class-names.util';

	let className: string | undefined = undefined;
	export { className as class };
	export let type: 'submit' | 'button' | 'reset' | undefined = undefined;
	export let variant: 'solid' | 'outlined' = 'solid';
	export let disabled = false;
</script>

<button data-variant={variant} {disabled} class={classNames(className, 's-button')} {type} on:click>
	<slot />
</button>

<style lang="postcss">
	.s-button {
		@apply p-5 bg-[#1B1B1B] rounded-xl border-[#3B3A3A3A] border-[1px] w-full transition;
		@apply font-semibold text-xl text-[#fffc];
		&[data-variant='solid'] {
			@apply bg-[#3B3A3A];
		}
		&:hover {
			box-shadow: inset 0px 0px 15px 1px rgba(217, 217, 217, 0.75);
		}
		&:disabled {
			@apply blur-[2px];
		}
	}
</style>
