<script lang="ts">
	// UTILITY
	import { grabberPNG } from '$lib/ts/utility/iconGrabber';
	// EXPORTS
	export let item: TContextMenu.item;
	export let commonFunction: TContextMenu.commonFunction | null = null;
	// LOGIC
	const preventContextMenu = (e: MouseEvent) => e.preventDefault();
</script>

<div
	class="menu-item flex-1 flex flex-vr w-100 rlv pointer"
	class:parent-item={item.inner}
	class:separate-item={item.separate}
	data-itemid={item.itemID}
	on:click={commonFunction || item.func}
	on:contextmenu={preventContextMenu}
>
	{#if item.img}
		<img class="m-r-1" src={grabberPNG.get('interact', item.img)} alt="" />
	{/if}
	<h5 class="w-100 space-nowrap capit">{item.value}</h5>
	{#if item.inner}
		<div class="items-inner hide">
			{#each item.inner as innerItem}
				<svelte:self item={innerItem} />
			{/each}
		</div>
	{/if}
</div>