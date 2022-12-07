<!--
  @component
**CloudKit custom button**

Button component with cloudkit's themes and useful functionalities.
-->
<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	// EXPORTS
	/**
	 * Function that executes on click
	 */
	export let func: () => void = () => {};
	/**
	 * If set, on click will rederict to given url
	 */
	export let href: String = '';
	/**
	 * Custom background color
	 */
	export let background: String = '';
	/**
	 * If set true, the button's text will be uppercase
	 */
	export let uppercase: Boolean = false;
	/**
	 * Custom font-size (using cloudkit's available font-size classes)
	 */
	export let size: CloudKit.Theme.FontSizes = 'sm';
	/**
	 * Button theme
	 */
	export let theme: CloudKit.Theme.Colors = 'dark';
	/**
	 * Custom classlist
	 */
	export let classList = '';
	/**
	 * Custom font-weight (using cloudkit's available font-weight classes)
	 */
	export let fweight = '';
	/**
	 * If set to true, max-width will be `fit-content`
	 */
	export let fitContent = false;
	// LOGIC
	function click_handle() {
		if (href) window.location.href = href.toString();
		else func();
	}
</script>

<button
	style:background-color={background}
	style:font-weight={fweight}
	style:max-width={fitContent ? 'fit-content' : null}
	class:upper={uppercase}
	class={concatClasses(classList, size, theme)}
	on:click={click_handle}
>
	<slot />
</button>