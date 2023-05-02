<script lang="typescript">
	import GradientButton from '$lib/components/gradient-button.svelte';
	import { gameTable } from '$lib/stores/game-table.store';
	import { hideModal } from '$lib/stores/modal.store';
	import { saveText } from '$lib/utils/save-text.util';
	import { tick } from 'svelte';

	let fileName: string;
	async function sendFileName() {
		const table = $gameTable;
		saveText(
			fileName.endsWith('.gol') ? fileName : `${fileName}.gol`,
			table.map((row) => row.map((cell) => (cell ? 1 : 0)).join('')).join('\n')
		);
		await tick();
		hideModal();
	}
</script>

<form on:submit|preventDefault={sendFileName}>
	<div class="flex flex-col gap-3 p-4 text-white bg-black rounded-xl w-96">
		<div class="mb-auto">
			<label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
				>File name</label
			>
			<input
				type="text"
				id="first_name"
				class="bg-[#fff5] border border-[#fff1] text-gray-900 text-sm rounded-md outline-none focus:ring-[#fff4] focus:border-[#fff2] block w-full p-2.5"
				placeholder="File Name"
				bind:value={fileName}
				required
			/>
		</div>
		<GradientButton class="w-full mb-auto leading-10" type="submit" on:click
			>Save file</GradientButton
		>
	</div>
</form>
