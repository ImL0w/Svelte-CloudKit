/// <reference types="@sveltejs/kit" />
declare global {
	namespace CloudKit {
		namespace Theme {
			type Colors = 'dark' | 'primary' | 'light' | 'special';
			type FontSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
		}

		namespace DataTable {
			interface Table {
				columns: Array<{ name: string; img?: string }>;
				sorting: Array<{ type: 'sort' | 'filter'; values: string[] }>;
			}
		}

		namespace ContextMenu {
			type commonFunction = (event?: MouseEvent) => void;
			type contextMenuEvent = (target?: HTMLElement) => void;
			type config = {
				commonFunction?: ContextMenu.commonFunction;
				contextMenuEvent?: ContextMenu.contextMenuEvent;
				items: ContextMenu.item[];
			};
			type item = {
				value: string;
				img?: string;
				inner?: ContextMenu.item[];
				func?: (event?: MouseEvent) => void;
				separate?: boolean;
				itemID?: string;
			};
		}

		namespace Tag {
			type func = () => void;
			type size = 'sm' | 'xs';
		}
	}
}

export {};