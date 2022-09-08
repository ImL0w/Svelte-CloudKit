<script lang="ts">
	export let func: () => void = () => {};
	export let href: String = '';
	export let outline: Boolean = false;
	export let background: String = '';
	export let uppercase: Boolean = false;
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'sm';
	export let theme: 'light' | 'outline' | 'special' = undefined;
	export let classList = '';
	export let fweight = '';
	export let basis = undefined;
	export let fitContent = false;
	export let noWrap = true;

	function click_handle() {
		if (href) {
			window.location.href = href.toString();
		} else func();
	}
</script>

<button
	style:background-color={background}
	style:font-weight={fweight}
	style:flex-basis={basis}
	style:max-width={fitContent ? 'fit-content' : null}
	style:white-space={noWrap ? 'no-wrap' : null}
	class:uppercase
	class:outline
	class:light={theme === 'light'}
	class:_outline={theme === 'outline'}
	class:special={theme === 'special'}
	class={`${classList}${classList !== '' ? ' ' : ''}${size}`}
	on:click={click_handle}
>
	<slot />
</button>
