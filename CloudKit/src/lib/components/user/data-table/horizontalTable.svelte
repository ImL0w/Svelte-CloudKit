<!--
  @component
**CloudScript enhanced data-table**

This data-table is a enhanced version of a default html `<table></table>`.
Pure html could be used too (only cloudscript scss stylings) but there wouldn't be any particular responsivness for mobile devices.
This component has a custom way to deal with responsivness and filters too!
-->
<script lang="ts">
	// UTILITY
	import { objectsToRaw } from '$lib/ts/utility/array';
	// COMPONENTS
	import Dropdown from '$lib/components/user/dropdown.svelte';
	import TableContextMenu from '$lib/components/user/context-menu/contextMenu.svelte';
	// EXPORTS
	export let columns: CloudKit.DataTable.Horizontal['columns'];
	export let contextMenuConfig: CloudKit.ContextMenu.config | null = null;

	export let rows: CloudKit.DataTable.Horizontal['rows'];
	export let width = 'auto';
	// LOGIC
	const sorting: CloudKit.DataTable.Horizontal['sorting'] = [
		{ type: 'sort', values: objectsToRaw('name', ...columns) },
		{ type: 'filter', values: ['Filter'] },
		{ type: 'sort', values: ['Sort'] }
	];

	const collapseRow = (event: MouseEvent) =>
		// @ts-ignore
		toggleOnEvent((event.currentTarget as HTMLDivElement).parentNode.parentNode, 'collapsed');

	function toggleOnEvent(event: ParentNode, _class: string) {
		(event as HTMLDivElement).classList.toggle(_class);
	}
	//** TODO selector has parent reference/
</script>

{#if contextMenuConfig}
	<TableContextMenu
		items={contextMenuConfig.items}
		targetsSelector=".table-container tr[data-clientID]"
		commonFunction={contextMenuConfig.commonFunction}
		contextMenuEvent={contextMenuConfig.contextMenuEvent}
	/>
{/if}

<div class="horizontal-table flex-col gap-3">
	<div class="table-tools">
		<div class="caption-inner flex gap-2">
			{#each sorting as sorter}
				<Dropdown options={sorter.values} />
			{/each}
		</div>
	</div>
	<div class="table-container overflow-scr w-100" style:width>
		<table class="w-100">
			<tbody class="rlv">
				<tr class="head-row">
					{#each columns as column}
						<th class="h4 bold">
							{#if column.img}
								<img alt="" class="icon" src={`/assets/${column.img}.svg`} />
							{/if}
							{column.name}
						</th>
					{/each}
					<th class="column-collapse p-0" />
				</tr>
				{#each rows as row}
					<tr class="data-row rlv" class:row-context={contextMenuConfig} data-clientid="1">
						{#each row as column, indexCol}
							<td class="vr-align-top">
								<h4 class="flex">
									<img
										alt=""
										class="icon"
										class:hide={!column.img}
										src={`/assets/${column?.img || ''}.png`}
									/>{column.content}
								</h4>
							</td>
						{/each}
						<td class="row-collapse p-0">
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
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<style lang="scss" global>
	.horizontal-table .table-container table tbody {
		.head-row .column-collapse {
			width: 60px;
		}

		.data-row {
			&.collapsed {
				border-right: 2px hsla(0, 0%, 100%, 0.27) solid;
				border-radius: 10px;
				td {
					&:nth-child(2) {
						border-left: 2px hsla(0, 0%, 100%, 0.27) solid;
					}

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
				background-color: var(--component);
				border-radius: 4px;
				height: 25px;
				width: 70%;
			}
		}
	}
</style>