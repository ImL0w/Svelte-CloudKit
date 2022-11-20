<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	// Exports
	export let classList = '';
	export let checked = false;
	export let label = '';
	export let size: CloudKit.Theme.FontSizes = 'sm';
	export let tooltip = '';
</script>

<h4
	class={concatClasses('input-checkbox flex flex-vr gap-2 w-fit', `fs-${size}`, classList)}
	title={tooltip}
>
	<input type="checkbox" bind:checked />
	{label}
</h4>

<style lang="scss">
	h4.input-checkbox {
		&[title]:not([title='']) {
			position: relative;
			margin-right: 10.5px;

			&::after {
				content: '?';
				color: var(--cyan);
				font-size: 73%;
				position: absolute;
				right: -10px;
				top: -2.5px;
			}
		}
	}
</style>