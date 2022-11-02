<!--
  @component
**CloudScript custom button**

todo
-->
<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	// ENMUS
	import { Themes } from '$lib/ts/enum/Themes';
	// EXPORTS
	export let func: () => void = () => {};
	export let href: String = '';
	export let outline: Boolean = false;
	export let background: String = '';
	export let uppercase: Boolean = false;
	export let size: Theme.FontSizes = 'sm';
	export let theme: Theme.Colors | Themes | string = Themes.DARK;
	export let classList = '';
	export let fweight = '';
	export let fitContent = false;
	export let noWrap = true;
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
	style:white-space={noWrap ? 'no-wrap' : null}
	class:upper={uppercase}
	class:outline
	class={concatClasses(classList, size, theme)}
	on:click={click_handle}
>
	<slot />
</button>