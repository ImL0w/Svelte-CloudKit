<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	// EXPORTS
	export let classList = '';
	export let cols = 30,
		rows = 10;
	export let hidden = false;
	export let id = '';
	export let maxWidth = '',
		maxHeight = '';
	export let resizable = false;
	export let size: CloudKit.Theme.FontSizes = 'xs';
	export let theme: CloudKit.Theme.Colors = 'dark';
	export let value = '';
</script>

<textarea
	class={concatClasses(theme, `fs-${size}`, classList)}
	class:hide={hidden}
	style:max-width={maxWidth}
	style:max-height={maxHeight}
	style:resize={!resizable ? 'none' : ''}
	{id}
	{cols}
	{rows}
	{value}
/>