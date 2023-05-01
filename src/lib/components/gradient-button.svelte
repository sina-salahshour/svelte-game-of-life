<script lang="ts">
	let btn: HTMLDivElement;
</script>

<div
	class="overflow-hidden transition rounded-md s-gradient active:scale-95 hover:scale-105"
	bind:this={btn}
>
	<div class="w-full overflow-hidden rounded-md btn">
		<div class="w-full wrapper">
			<button
				class="w-full px-4 overflow-hidden transition bg-white bg-opacity-20 active:bg-opacity-40 hover:bg-opacity-10"
				on:click><slot /></button
			>
		</div>
	</div>
</div>
<svelte:window
	on:mousemove={({ clientX, clientY }) => {
		const { left, top } = btn.getBoundingClientRect();
		btn.style.setProperty('--gradient-x', `${clientX - left}px`);
		btn.style.setProperty('--gradient-y', `${clientY - top}px`);
	}}
/>

<style lang="postcss">
	.s-gradient {
		--gradient-size: 50px;
		background-image: radial-gradient(
			100px circle at var(--gradient-x) var(--gradient-y),
			rgba(255, 255, 255, 0.5),
			transparent 80%
		);
	}
	.wrapper {
		background-image: linear-gradient(black, black);
	}
	.btn {
		border: 2px solid transparent;
	}
</style>
