<!--
  @component
**CloudScript Context Menu**

This is a fully functional context menu. It inherits CloudScript scss themes.
* **items**: ContextMenu['items'] - List of items to be displayed. A function can be attached to each item wich will be invoked on item clcik.
* **targetsSelector**: string - Query selector for the target/s that should show the context menu.
* **commonFunction**: (event?: MouseEvent) => void - Function that that gets invoked on every item click. ContextMenu['item']['func'] will not be considered
* **contextMenuEvent**: (event?: HTMLElement) => void - Function that should run at the contextmenu event.
* **refreshListeners**: () => void - Resets all event listeners. Useful when new elemnts are dynamically added to the dom. Otherwise, event listeners will be added automatically on component mount.
-->
<script lang="ts">
	// SVELTE
	import { onMount } from 'svelte';
	// COMPONENTS
	import ContextMenuItem from './__contextMenuItem.svelte';
	// EXPORTS
	export let items: TContextMenu.item[];
	export let commonFunction: TContextMenu.commonFunction | null = null,
		contextMenuEvent: TContextMenu.contextMenuEvent = () => {};
	export let targetsSelector: string;
	export const refreshListeners = () => setListeners();
	// LOGIC
	let contextMenuInstance: HTMLElement;
	$: top = '0px';
	$: left = '0px';

	const callback = (event: MouseEvent) => {
		event.preventDefault();
		top = event.clientY + 'px';
		left = event.clientX + 'px';
		// @ts-ignore
		contextMenuInstance.focus({ focusVisible: false });
		// @ts-ignore
		contextMenuEvent(event.currentTarget);
	};

	function setListeners() {
		if (targetsSelector) {
			const targetElement = Array.from(document.querySelectorAll(targetsSelector));
			if (targetElement.length !== 0 && contextMenuInstance) {
				// @ts-ignore
				targetElement.forEach((target_: HTMLElement) => {
					target_.addEventListener('contextmenu', callback, true);
				});
			} else
				console.error(
					`@ContextMenu target element not found! Set selector: { ${targetsSelector} }`
				);
		}
	}

	function onClickClose() {
		// todo
	}

	onMount(() => setListeners());
</script>

<div
	bind:this={contextMenuInstance}
	class="context-menu flex-col w-fit transition-opacity-85"
	on:click={onClickClose}
	style:top
	style:left
	tabindex="-1"
>
	{#each items as item}
		<ContextMenuItem {item} {commonFunction} />
	{/each}
</div>