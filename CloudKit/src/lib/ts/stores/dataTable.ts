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
		this.__tables.subscribe((tables) => {
			this.__tablesSubscribed = tables;
		});
	}

	/**
	 * This method returns a readable table instance by it's unique id
	 * @param id Id of the table
	 * @returns readable instance of a table. Note: If not found, the method will return undefined!
	 */
	table(id: string) {
		if (id.length) {
			const validId = this.__validId(id);
			if (validId.valid) return derived(this.__tables, (tables) => tables.instances[validId.index]);
		}
	}

	/**
	 * Method responsable for registering your table (register only once! onMount)
	 *
	 * This method is only used inside the `table` component
	 * @param maxColumns >= 1 Columns the table has. Note: Must be correct otherwise you could accidentally add more then the table has of columns
	 * @returns Newly created id, or null if something went wrong.
	 */
	registerTable(maxColumns: number): string | null {
		if (maxColumns >= 1) {
			const randId = randomString(5);
			if (!this.__validId(randId).valid) {
				this.__tables.update((tables) => {
					return { instances: [...tables.instances, this.__newInstance(randId, maxColumns)] };
				});
				return randId;
			}
		}
		return null;
	}
	/**
	 * Removes a table instance from the writable store
	 *
	 * This method is only used inside the `table` component.
	 * @param id
	 */
	destroyTable(id: string) {
		if (id.length) {
			if (this.__validId(id).valid)
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
		const validId = this.__validId(id);
		if (validId.valid)
			this.__tables.update((tables) => {
				if (rowData.length === tables.instances[validId.index].maxColumns) {
					tables.instances[validId.index].rowsData.push([...rowData]);
				}
				return tables;
			});
	}
	/**
	 * Removes a row from a specific table
	 * @param id Id of the table
	 * @param rowIndex Row index >= 1
	 */
	removeRow(id: string, rowIndex: number) {
		const validId = this.__validId(id);
		if (validId.valid && rowIndex >= 1) {
			this.__tables.update((tables) => {
				tables.instances[validId.index].rowsData = tables.instances[validId.index].rowsData.filter(
					(_, _rowIndex) => rowIndex - 1 !== _rowIndex
				);
				return tables;
			});
		}
	}
	/**
	 * Creates a new table instance object
	 * @param id
	 * @param maxColumns
	 * @returns New valid instance
	 */
	private __newInstance(id: string, maxColumns: number): TableInstance {
		return { id: id, rowsData: [], maxColumns: maxColumns };
	}
	/**
	 * Validates a given id and returns index array position
	 * @param id
	 * @returns Object { valid: boolean; index: number | -1 }
	 */
	private __validId(id: string): { valid: boolean; index: number | -1 } {
		let array_position = -1;
		this.__tablesSubscribed?.instances.forEach((table, index) => {
			if (table.id === id) array_position = index;
		});
		return { valid: array_position !== -1, index: array_position };
	}
}

/**
 * Store responsable to handle all tables and their data
 *
 * Warning: `registerTable` & `destroyTable` shouldn't be used because only the component `Table` uses them. You don't have to!
 * @example import { dataTableStore } from '@cloudscript.live/svelte-cloudkit';
 * dataTableStore.addData(tableId, newRowData);
 */
const dataTableStore = new DataTableStore();

export { dataTableStore, type TableInstance, type TableRowData, type TableCellData };