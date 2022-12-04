// Svelte-kit
import { derived, writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
// Utility
import { randomString } from '../utility/random';

/**
 * Readable data-table instance
 */
type TableInstance = {
	/**
	 * Unique table id
	 */
	id: string;
	/**
	 * Table's current data + extra data
	 */
	rowsData: TableRowData[];
	/**
	 * Columns of the data-table to protect against over adding
	 */
	maxColumns: number;
};
type TableInstances = { instances: TableInstance[] };
type TableCellData = {
	content: string;
	extra?: { data: string; title?: string; tagColor?: string };
	img?: string;
};
type TableRowData = TableCellData[];

class DataTableStore {
	private __tables: Writable<TableInstances> = writable({ instances: [] });
	private __tablesSubscribed: TableInstances | undefined = undefined;

	constructor() {
		this.__tables.subscribe(($tables) => {
			this.__tablesSubscribed = $tables;
		});
	}

	/**
	 * This method returns a readable table instance by it's unique id
	 * @param id Id of the table
	 * @returns readable instance of a table. Note: If not found, the method will return undefined!
	 */
	table(id: string) {
		if (id.length) {
			const arrayPosition = this.__tableIdToArrayPos(id);
			if (arrayPosition !== -1)
				return derived(this.__tables, ($tables) => {
					return $tables.instances[arrayPosition];
				});
		}
	}

	/**
	 * Method responsable for registering your table (register only once! onMount)
	 * @param maxColumns Columns the table has. Note: Must be correct otherwise you could accidentally add more then the table has of columns
	 * @returns Newly created id, or null if something went wrong.
	 */
	registerTable(maxColumns: number): string | null {
		if (maxColumns >= 1) {
			const randId = randomString(5);
			if (this.__tableIdToArrayPos(randId) === -1) {
				this.__tables.update((tables) => {
					tables.instances.push(this.__newInstance(randId, maxColumns));
					return tables;
				});
				return randId;
			}
		}
		return null;
	}

	destroyTable(id: string) {
		if (id.length) {
			if (this.__tableIdToArrayPos(id) !== -1)
				this.__tables.update((tables) => {
					return { instances: tables.instances.filter((table) => table.id !== id) };
				});
		}
	}

	/**
	 * This method adds data to a specifc table
	 * @param id Id of the table
	 * @param rowData Data to be added - Note: If the data is invalid, the function will return without warnings!
	 */
	addData(id: string, rowData: TableRowData) {
		const arrayPosition = this.__tableIdToArrayPos(id);
		if (arrayPosition !== -1)
			this.__tables.update((tables) => {
				const maxColumns = tables.instances[arrayPosition].maxColumns;
				if (rowData.length === maxColumns) {
					const newRow = [];
					newRow.push(...rowData);
					tables.instances[arrayPosition].rowsData.push(newRow);
				}

				return {
					instances: [...tables.instances]
				};
			});
	}

	private __newInstance(id: string, maxColumns: number): TableInstance {
		return { id: id, rowsData: [], maxColumns: maxColumns };
	}

	private __tableIdToArrayPos(id: string) {
		let index = -1;
		this.__tablesSubscribed?.instances.forEach((table, _index) => {
			if (table.id === id) index = _index;
		});
		return index;
	}
}

/**
 * Store responsable to handle all tables and their data
 * 
 * Warning: `registerTable` & `destroyTable` shouldn't be used because only the component `Table` uses them. You don't have to!
 * @example import { dataTableStore } from '@cloudscript.live/svelte-cloudkit';

dataTableStore.addData(tableId, newRowData);
 */
const dataTableStore = new DataTableStore();

export { dataTableStore, type TableInstance, type TableRowData, type TableCellData };