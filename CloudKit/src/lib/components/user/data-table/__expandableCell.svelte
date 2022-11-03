<script lang="ts">
	// TYPES
	import type { ExtraElements as elementType } from '$lib/ts/enum/DataTable';
	// COMPONENTS
	import Tag from '../../layout/Tag.svelte';
	// EXPORTS
	export let elementType: elementType;
	export let elementData: { text: string; tagColor?: string }[];
</script>

{#if elementType && elementData}
	<div class="expanded-cell gap-1 hide m-t-4">
		<h5 class="cell-title">{elementType}</h5>
		{#each elementData as data}
			{#if !data.tagColor}
				<h5>{data.text}</h5>
			{:else}
				<Tag size="xs" color={data.tagColor}>{data.text}</Tag>
			{/if}
		{/each}
	</div>
{/if}

<style lang="scss">
	.expanded-cell .cell-title {
		color: var(--text-gray);
	}
</style>