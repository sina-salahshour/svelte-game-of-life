<script lang="ts">
	import { gameTable } from '$lib/stores/game-table.store';

	export let rowIndex: number;
	export let colIndex: number;
	export let isPlay: boolean;
</script>

{#key $gameTable[rowIndex][colIndex]}
	<button
		class="w-4 bg-black data-[active=true]:bg-white h-4 hover:bg-opacity-50 s-cell"
		data-active={$gameTable[rowIndex][colIndex]}
		data-is-play={isPlay}
		on:click={() => {
			$gameTable[rowIndex][colIndex] = !$gameTable[rowIndex][colIndex];
		}}
	/>
{/key}

<style lang="postcss">
	.s-cell[data-active='true'][data-is-play='true'] {
		animation: forwards linear 5s animation-cell;
	}
	@keyframes animation-cell {
		from {
			background-color: rgb(255 255 255 / var(--tw-bg-opacity));
		}
		to {
			background-color: rgb(63 63 255 / var(--tw-bg-opacity));
		}
	}
</style>
