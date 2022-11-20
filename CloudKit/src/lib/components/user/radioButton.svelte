<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	// EXPORTS
	export let checked = false;
	export let id = '',
		name = '';
	export let label = '';
	export let size: CloudKit.Theme.FontSizes = 'sm';
	export let tooltip = '';
</script>

<h4
	class={concatClasses('input-radio flex flex-vr gap-2 w-fit', `fs-${size}`)}
	title={tooltip}
>
	<input type="radio" {name} {id} {checked} />
	{label}
</h4>

<style lang="scss">
	h4[title]:not([title='']) {
        margin-right: 10px;
		position: relative;

		&::after {
			content: '?';
			position: absolute;
			right: -10px;
			top: -2.5px;
			color: var(--cyan);
			font-size: 73%;
		}
	}
</style>