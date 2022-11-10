<!--
  @component
**CloudScript custom button**

todo
-->
<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	// EXPORTS
	export let func: () => void = () => {};
	export let href: String = '';
	export let outline: Boolean = false;
	export let background: String = '';
	export let uppercase: Boolean = false;
	export let size: CloudKit.Theme.FontSizes = 'sm';
	export let theme: CloudKit.Theme.Colors | string = "dark";
	export let classList = '';
	export let fweight = '';
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
	class:outline
	class={concatClasses(classList, size, theme)}
	on:click={click_handle}
>
	<slot />
</button>