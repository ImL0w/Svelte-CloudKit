<!--
  @component
**CloudKit enhanced data-table**

This data-table is a enhanced version of a default html `<table></table>`.
Pure html could be used too (only cloudkit's scss stylings) but there wouldn't be any particular responsivness for mobile devices and you would miss many features.

You add data using the dataTableStore with the unique id you receive by using the getId property.
-->
<script lang="ts">
	// SVELTE
	import { onMount, onDestroy, beforeUpdate } from 'svelte';
	import type { Readable } from 'svelte/store';
	// TABLE STORE
	import { dataTableStore, type TableInstance } from '$lib/ts/stores/dataTable';
	// UTILITY
	import { extractObjValues } from '$lib/ts/utility/array';
	import { pause } from '$lib/ts/utility/async';
	// COMPONENTS
	import ExpandableCell from './__expandableCell.svelte';
	import Dropdown from '$lib/components/user/dropdown.svelte';
	import TableContextMenu from '$lib/components/user/context-menu/contextMenu.svelte';
	// EXPORTS
	/**
	 * Context menu configurations
	 */
	export let contextMenuConfig: CloudKit.ContextMenu.config | null = null;
	/**
	 * Returns unique id
	 * 
	 * Important: The function has to be called inside onMount!
	 * @example let tableId: () => string;
console.info(tableId()); // 2m3y1

<DataTable bind:getId={tableId} />
	 */
	export const getId = () => tableId;
	/**
	 * Columns of the table with an arbitrary image
	 */
	export let columns: CloudKit.DataTable.Table['columns'];
	/**
	 * Table width
	 */
	export let width = '';
	/**
	 * Makes a row expandable to show it's extra data
	 */
	export let extraData = false;
	/**
	 * Puts 1px borders around the table
	 */
	export let borders = false;
	// LOGIC
	let tableId: string = '';
	let reference: Element;
	let tableInstance: Readable<TableInstance> | undefined;
	$: tableInstance;
	$: mounted = false;

	const sorting: CloudKit.DataTable.Table['sorting'] = [
		{ type: 'sort', values: extractObjValues('name', ...columns) },
		{ type: 'filter', values: ['Filter'] },
		{ type: 'sort', values: ['Sort'] }
	];

	let refreshListeners = () => {};

	function collapseRow(event: MouseEvent) {
		// @ts-ignore
		toggleOnEvent((event.currentTarget as HTMLDivElement).parentNode.parentNode, 'collapsed');
	}

	function toggleOnEvent(event: ParentNode, _class: string) {
		(event as HTMLDivElement).classList.toggle(_class);
	}

	beforeUpdate(() => {
		if (!tableId.length) {
			tableId = dataTableStore.registerTable(columns.length) ?? '';
			tableInstance = dataTableStore.table(tableId ?? '');
			tableInstance?.subscribe((_) => pause(100).then(() => refreshListeners()));
		}
	});
	onMount(() => (mounted = true));
	onDestroy(() => dataTableStore.destroyTable(tableId));
</script>

{#if contextMenuConfig && mounted}
	<TableContextMenu
		bind:refreshListeners
		commonFunction={contextMenuConfig.commonFunction}
		contextMenuEvent={contextMenuConfig.contextMenuEvent}
		targetsSelector=".data-table .table-container .data-row"
		{reference}
		items={contextMenuConfig.items}
	/>
{/if}

<div class="data-table flex-col gap-3" bind:this={reference}>
	<div class="table-tools">
		<div class="caption-inner flex gap-2">
			{#each sorting as sorter}
				<Dropdown options={sorter.values} />
			{/each}
		</div>
	</div>
	<div class="table-container overflow-scr w-100" style:width class:borders-active={borders}>
		<table>
			<tbody>
				<tr class="head-row">
					{#each columns as column, indexCol}
						{#if indexCol === 0}
							<th class="h4 text-center bold">ID</th>
						{/if}
						<th class="h4 bold">
							{#if column.img}
								<img alt="" class="icon" src={column.img} />
							{/if}
							{column.name}
						</th>
					{/each}
					{#if extraData}
						<th class="column-collapse p-0" />
					{/if}
				</tr>
				{#if $tableInstance?.rowsData?.length}
					{#each $tableInstance.rowsData as tableRow, rowIndex}
						{#if tableRow?.length}
							<tr class="data-row" class:row-context={contextMenuConfig}>
								<td class="h4 text-center bold">{rowIndex + 1}</td>
								{#each tableRow as tableCell}
									<td class="vr-align-top">
										<h4 class="flex w-100">
											{#if tableCell.img}
												<img alt="" class="icon" src={tableCell.img} />
											{/if}
											{tableCell.content}
										</h4>
										{#if extraData}
											<ExpandableCell
												title={tableCell.extra?.title}
												data={tableCell.extra?.data ?? ''}
												tagColor={tableCell.extra?.tagColor}
											/>
										{/if}
									</td>
								{/each}
								{#if extraData}
									<td class="row-collapse p-0">
										<!-- svelte-ignore a11y-click-events-have-key-events -->
										<div
											class="collapse-btn flex flex-all rlv pointer"
											on:click={collapseRow}
											title="Expand view"
										>
											<svg
												width="25"
												height="25"
												viewBox="0 0 25 25"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<path
													d="M12.5 17.7083C12.2341 17.707 11.9718 17.6465 11.7321 17.5312C11.4925 17.4159 11.2816 17.2487 11.1146 17.0417L6.72916 11.7292C6.47291 11.4094 6.31165 11.024 6.26376 10.617C6.21588 10.2099 6.2833 9.79766 6.45833 9.42709C6.60029 9.10504 6.83195 8.83065 7.12564 8.6367C7.41933 8.44275 7.76265 8.33744 8.11458 8.33334H16.8854C17.2373 8.33744 17.5807 8.44275 17.8744 8.6367C18.168 8.83065 18.3997 9.10504 18.5417 9.42709C18.7167 9.79766 18.7841 10.2099 18.7362 10.617C18.6883 11.024 18.5271 11.4094 18.2708 11.7292L13.8854 17.0417C13.7184 17.2487 13.5075 17.4159 13.2678 17.5312C13.0282 17.6465 12.7659 17.707 12.5 17.7083Z"
													fill="#ffffff91"
												/>
											</svg>
										</div>
									</td>
								{/if}
							</tr>
						{/if}
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>

<style lang="scss" global>
	.data-table .table-container {
		&.borders-active {
			border: 1px solid var(--borders);
			border-radius: 4px;
			padding: 0.6em;
		}

		table tbody {
			.head-row .column-collapse {
				width: 60px;
			}

			.data-row {
				border-right-width: 0px;
				&.collapsed {
					border-right: 2px hsla(0, 0%, 100%, 0.27) solid;
					border-radius: 10px;
					td {
						&:not(:first-child) {
							background-color: rgba(93, 94, 115, 0.41) !important;
						}
					}

					.expanded-cell {
						display: flex !important;
						flex-direction: column;
					}

					.row-collapse svg {
						transform: rotate(180deg);
					}
				}

				.row-collapse .collapse-btn {
					border-radius: 4px;
					height: 25px;
					width: 70%;
				}
			}
		}
	}
</style>