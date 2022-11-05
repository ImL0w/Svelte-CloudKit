<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	// Exports
	export let classList = '';
	export let checked = false;
	export let label = '';
	export let size: CloudKit.Theme.FontSizes = 'sm';
</script>

<h4
	class={concatClasses(
		'input-checkbox flex flex-vr gap-2 h-fit w-fit',
		size !== 'sm' ? `fs-${size}` : '',
		classList
	)}
>
	<input type="checkbox" bind:checked />
	{label}
</h4>

<style lang="scss">
	.input-checkbox {
	}
</style>