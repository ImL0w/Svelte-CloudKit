<!--
  @component
**CloudKit Context Menu**

This is a fully functional context menu. It inherits CloudScript scss themes.
* **items**: ContextMenu['items'] - List of items to be displayed. A function can be attached to each item wich will be invoked on item clcik.
* **targetsSelector**: string - Query selector for the target/s that should show the context menu.
* **commonFunction**: (event?: MouseEvent) => void - Function that that gets invoked on every item click. ContextMenu['item']['func'] will not be considered
* **contextMenuEvent**: (target: HTMLElement) => void - Function that should run at the contextmenu event.
* **refreshListeners**: () => void - Resets all event listeners. Useful when new elemnts are dynamically added to the dom. Otherwise, event listeners will be added automatically on component mount.
-->
<script lang="ts">
	// SVELTE
	import { onMount } from 'svelte';
	// COMPONENTS
	import ContextMenuItem from './__contextMenuItem.svelte';
	// EXPORTS
	/**
	 * Functions that executes on all items
	 */
	export let commonFunction: CloudKit.ContextMenu.commonFunction | null = null,
		/**
	 * This function is called on the `contextmenu` event and returns the element on wich the context menu event is attached
	 * 
	 * @example let menuEvent: (target: HTMLElement) => {
	 // do stuff with the html element
	 };

<ContextMenu bind:contextMenuEvent={menuEvent} />
	 * 
	*/
		contextMenuEvent: CloudKit.ContextMenu.contextMenuEvent = (target: HTMLElement) => {};
	/**
	 * Context menu items
	 */
	export let items: CloudKit.ContextMenu.item[];
	/**
	 * Selector for elements on wich the context menu needs to listen for
	 */
	export let targetsSelector: string;
	/**
	 * If combined with `targetsSelector`, the reference will be used as parent node and the selector for that specific node. Otherwise, you could use `reference` instead of `targetsSelector` if you want a specific `single` selector.
	 *
	 * @example // Combined
	 * let referenceDiv: Element;
	 * let selector = ".innerClasses"
	 *
	 * <ContextMenu reference={referenceDiv} targetsSelector={selector}/>
	 * <div bind:this={referenceDiv}>
	 * <div class="innerClasses">
	 * ...
	 * </div>
	 * </div>
	 * @example // Single
	 * let referenceDiv: Element;
	 *
	 * <ContextMenu reference={referenceDiv} />
	 * <div bind:this={referenceDiv}>...</div>
	 */
	export let reference: Element | null = null;
	/**
	 * Context menu theme
	 */
	export let theme: CloudKit.Theme.Colors | string = 'dark';
	/**
	 * Refreshes listeners
	 * 
	 * @example let refresh: () => void;
refresh();

<ContextMenu bind:refreshListeners={refresh} />
**/
	export const refreshListeners = () => resolveTarget();
	// LOGIC
	let contextMenuInstance: Element;
	$: top = '0px';
	$: left = '0px';

	const callback = (event: MouseEvent) => {
		event.preventDefault();
		top = event.clientY + 'px';
		left = event.clientX + 'px';
		// @ts-ignore
		contextMenuInstance.focus({ focusVisible: false });
		contextMenuEvent(event.currentTarget as HTMLElement);
	};

	function setListener(element: Element) {
		(element as HTMLDivElement).removeEventListener('contextmenu', callback, true);
		(element as HTMLDivElement).addEventListener('contextmenu', callback, true);
	}

	function resolveTarget() {
		if (targetsSelector) {
			const targetElements = Array.from((reference ?? document).querySelectorAll(targetsSelector));
			if (targetElements.length && contextMenuInstance) {
				targetElements.forEach((element: Element) => setListener(element));
			} else
				console.error(
					`@ContextMenu target element not found! Set selector: { ${targetsSelector} }`
				);
		} else if (reference) setListener(reference);
	}

	function onClickClose() {
		// todo
	}

	onMount(() => resolveTarget());
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	bind:this={contextMenuInstance}
	class={`context-menu flex-col w-fit transition-opacity-85 ${theme}-component`}
	on:click={onClickClose}
	style:top
	style:left
	tabindex="-1"
>
	{#each items as item}
		<ContextMenuItem {item} {commonFunction} />
	{/each}
</div>