<script lang="ts">
	// SVELTE
	import { onMount } from 'svelte';
	// STORES
	import { dataTableStore, type TableRowData } from '$lib/ts/stores/dataTable';
	// COMPONENTS
	import Button from '$lib/components/user/button.svelte';
	import Datatable from '$lib/components/user/data-table/table.svelte';
	import Dropdown from '$lib/components/user/dropdown.svelte';
	import Tag from '$lib/components/layout/Tag.svelte';
	import InputArea from '$lib/components/user/input/inputArea.svelte';
	import RadioButton from '$lib/components/user/radioButton.svelte';
	import Checkbox from '$lib/components/user/checkbox.svelte';
	import InputText from '$lib/components/user/input/inputText.svelte';
	import ProgressBar from '$lib/components/layout/progressBar.svelte';

	const tableCols: CloudKit.DataTable.Table['columns'] = [
		{ name: 'Col1' },
		{ name: 'Col2' },
		{ name: 'Col3' },
		{ name: 'Col4' },
		{ name: 'Col5' }
	];

	const tableRows: TableRowData[] = [
		new Array(tableCols.length).fill({
			content: 'Data for row 1',
			extra: { data: 'Extra data!', title: "I've got a Title" }
		}),
		new Array(tableCols.length).fill({
			content: 'Data for row 2',
			extra: { data: "I've got a tag!", tagColor: 'green' }
		})
	];

	$: progress = 0;
	let tableId: () => string;

	onMount(() => {
		tableRows.forEach((row) => {
			dataTableStore.addData(tableId(), row);
		});
	});
</script>

<div id="index" class="transition-all-250">
	<div id="app-content">
		<h1>Welcome!</h1>
		<div class="flex-col gap-3">
			<div class="flex gap-3">
				<Button>Dark</Button>
				<Button theme="primary">Primary</Button>
				<Button theme="light">Light</Button>
				<Button theme="special">Special</Button>
			</div>
			<Tag color="red">asdas</Tag>
			<Dropdown options={[{ img: '', value: 'lol' }, 'lol']} />
			<InputArea value="Shiiiish" resizable />
			<RadioButton checked label="strunz" name="chk" size="lg" />
			<RadioButton label="strunz" tooltip="okeeeee" name="chk" />
			<Checkbox checked label="okay lets go" tooltip="lool" size="lg" />
			<Checkbox label="okay lets go" />
			<InputText />
			<div class="flex flex-vr gap-3">
				<Button
					func={() => {
						let interval = setInterval(() => {
							if (progress <= 99) progress++;
							else clearInterval(interval);
						}, 100);
					}}>Start</Button
				>
				<ProgressBar percentage={progress} />
				<ProgressBar theme="special" percentage={progress} />
				<ProgressBar theme="light" percentage={progress} />
				<ProgressBar theme="primary" percentage={progress} />
			</div>
			<div class="flex gap-3">
				<Button
					func={() => {
						dataTableStore.addData(
							tableId(),
							new Array(tableCols.length).fill({
								content: 'new row!',
								extra: { data: 'new extra data!!', title: 'New title' }
							})
						);
					}}>Add Row</Button
				>
				<Button
					func={() => {
						dataTableStore.removeRow(tableId(), 1);
					}}>Remove first row</Button
				>
			</div>
			<Datatable bind:getId={tableId} borders extraData columns={tableCols} />
		</div>
	</div>
</div>

<style lang="scss" global>
	@use '../lib/scss/base.scss' with (
		$boxed: 100px
	);
</style>