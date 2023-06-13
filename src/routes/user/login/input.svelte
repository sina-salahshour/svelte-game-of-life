<script lang="ts">
	import { classNames } from '$lib/utils/class-names.util';

	let className: string | undefined = undefined;
	export let value = '';
	export let name = '';
	export let id = '';
	export let type: HTMLInputElement['type'] = 'text';
	export let placeholder = '';
	export { className as class };
	export let required = false;
</script>

<input
	class={classNames(className, 's-input')}
	{type}
	{value}
	{name}
	{id}
	{placeholder}
	{required}
/>

<style lang="postcss">
	.s-input {
		@apply p-5 bg-[#1B1B1B] rounded-xl border-[#3B3A3A3A] border-[1px] w-full outline-none;
		@apply font-semibold text-xl text-[#fffc];
		@apply placeholder:text-[#3B3A3A];
	}
</style>
