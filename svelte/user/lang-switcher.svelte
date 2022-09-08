<script lang="ts">
	import { baseLocale, locales } from '../../../../i18n/i18n-util';
	import { locale } from '../../../../i18n/i18n-svelte';
	import { replaceLocaleInUrl } from '$lib/ts/utility/url';

	/** @type {'absolute' | 'handled'} - Type of component; absolute: stays `top corner left`; handled: `normal component`, no position set
	 */
	export let type: 'absolute' | 'handled' = 'absolute';
	export let active = false;
	$: active;

	function switchLang(event: Event) {
		const newLang = (event.target as HTMLImageElement).alt || baseLocale || 'en';
		document.location.pathname = replaceLocaleInUrl(document.location.pathname, newLang);
	}
</script>

<div class={`lang-switcher${'--' + type} hide show-md flex-d-md! gap-3`} class:active>
	{#each Array.from(locales) as lang}
		<img
			class:active={lang === $locale}
			class="pointer"
			src={`/assets/icons/country/${lang}.svg`}
			alt={lang}
			on:click={switchLang}
		/>
	{/each}
</div>

<style lang="scss">
	@use '../../../scss/const/screenSize' as ScreenSize;

	.lang-switcher--absolute {
		position: absolute;
		top: 2.5%;
		left: 1.5%;
	}

	.lang-switcher,
	.lang-switcher--absolute {
		display: none;

		&.active {
			display: flex;
		}

		img {
			transition: opacity 120ms ease-in;
			opacity: 0.333;

			&:hover,
			&.active {
				opacity: 1;
			}
		}
	}
</style>
