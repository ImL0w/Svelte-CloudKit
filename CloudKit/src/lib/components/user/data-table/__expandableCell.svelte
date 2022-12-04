<script lang="ts">
	// COMPONENTS
	import Tag from '../../layout/Tag.svelte';
	// EXPORTS
	export let title: string = '';
	export let data: string;
	export let tagColor = '';
</script>

<div class="expanded-cell gap-1 hide m-t-4">
	{#if title}
		<h5 class="cell-title">{title}</h5>
	{/if}
	{#if !tagColor}
		<h5>{data}</h5>
	{:else}
		<Tag size="xs" color={tagColor}>{data}</Tag>
	{/if}
</div>

<style lang="scss">
	.expanded-cell .cell-title {
		color: var(--text-gray);
	}
</style>