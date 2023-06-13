<script lang="ts">
	let className: string | undefined = undefined;
	export let checked = false;
	export let name = '';
	export let id = '';
	export { className as class };
</script>

<label class={className}>
	<input class="hidden" bind:checked type="checkbox" {name} {id} />
	<div class="s-check">
		<div class="s-dot" />
	</div>
</label>

<style lang="postcss">
	.s-check {
		@apply bg-[#1B1B1B] w-4 h-4 rounded-sm border-[#3B3A3A3A] border-[1px] transition relative;
		@apply font-semibold text-xl text-[#fffc];
		@apply placeholder:text-[#3B3A3A];
		.s-dot {
			@apply absolute inset-1 bg-[#3B3A3A] rounded-[1px] bg-opacity-0 transition;
		}
	}
	input:checked + .s-check {
		.s-dot {
			@apply bg-opacity-100;
		}
	}
</style>
