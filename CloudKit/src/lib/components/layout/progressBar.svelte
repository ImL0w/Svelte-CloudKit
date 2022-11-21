<!--
  @component
**CloudScript Progressbar**
Simple progressbar
-->
<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	//EXPORTS
	/** Must be a fixed width otherwise the percantage used for the progressbar wont work! Default is 175px. */
	export let barWidth = '175px';
	export let theme: CloudKit.Theme.Colors = 'dark';
	/** Update this value to increase the progressbar. */
	export let percentage = 0;
	export let fontSize: CloudKit.Theme.FontSizes = 'xs';
	// LOGIC
	$: percentage;
</script>

<div class={concatClasses('progressbar flex-col gap-1', theme)} style:width={barWidth}>
	<h5 class={`fs-${fontSize}`}>{percentage}%</h5>
	<div class="progressbar-wrap w-100">
		<div class="progressbar-wrap-value h-100" style:width={`${percentage}%`} />
	</div>
</div>