<script lang="ts">
	// EXPORTS
	export let item: CloudKit.ContextMenu.item;
	export let commonFunction: CloudKit.ContextMenu.commonFunction | null = null;
	// LOGIC
	const preventContextMenu = (e: MouseEvent) => e.preventDefault();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="menu-item flex-1 flex flex-vr w-100 rlv pointer"
	class:parent-item={item.inner}
	class:separate-item={item.separate}
	data-itemid={item.itemID}
	on:click={commonFunction || item.func}
	on:contextmenu={preventContextMenu}
>
	{#if item.img}
		<img class="m-r-1" src={item.img} alt="" />
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