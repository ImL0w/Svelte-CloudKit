/// <reference types="@sveltejs/kit" />
// ENUMS
import type { ExtraElements } from '$lib/ts/enum/DataTable';

declare global {
	declare namespace Theme {
		type Colors = 'dark' | 'primary' | 'light' | 'special';
		type FontSizes = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	}

	declare namespace TDataTable {
		interface Horizontal {
			columns: Array<{ name: string; img?: string }>;
			preferences: { extraElements: ExtraElements[] };
			rows: Array<Array<{ content: string; img?: string }>>;
			sorting: Array<{ type: 'sort' | 'filter'; values: string[] }>;
		}
	}

	declare namespace TContextMenu {
		type commonFunction = (event?: MouseEvent) => void;
		type contextMenuEvent = (target?: HTMLElement) => void;
		type config = {
			commonFunction?: TContextMenu.commonFunction;
			contextMenuEvent?: TContextMenu.contextMenuEvent;
			items: TContextMenu.item[];
		};
		type item = {
			value: string;
			img?: string;
			inner?: TContextMenu.item[];
			func?: (event?: MouseEvent) => void;
			separate?: boolean;
			itemID?: string;
		};
	}

	declare namespace TTag {
		type color = 'red' | 'green' | 'orange' | 'violet' | 'yellowie';
		type func = () => void;
		type size = 'sm' | 'xs';
	}
}