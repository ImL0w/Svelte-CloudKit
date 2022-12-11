<script lang="ts">
	// SVELTE
	import { onMount } from 'svelte';
	// UTILITY
	import { pause } from '$lib/ts/utility/async';
	// EXPORTS
	/**
	 * Function binded to the popup instance. If called, the popup closes.
	 *
	 * Important: Use bind:close otherwise it wont work!
	 * @example
	 * let closePopup: () => void;
	 * closePopup(); // Popup closes
	 *
	 * <Popup bind:close={closePopup}>...</Popup>
	 */
	export const close = closeHandle;
	/**
	 * Width: fit-content
	 */
	export let fitContent = true,
		width = '';
	/**
	 * Absolute positioning of the popup. If not set, it's display will be `block`
	 */
	export let absolute:
		| { top?: string; left?: string; right?: string; bottom?: string }
		| undefined = undefined;
	/**
	 * Wheter to self close after 3,5s it has been shown
	 */
	export let selfClose = false;
	/**
	 * Popup theme
	 */
	export let theme: 'success' | 'info' | 'warning' | 'error';
	// LOGIC
	let reference: HTMLDivElement;
	function closeHandle() {
		if (reference) {
			reference.classList.toggle('closing');
			pause(130).then(() => {
				reference.remove();
			});
		}
	}

	onMount(() => {
		if (selfClose)
			pause(3500).then(() => {
				closeHandle();
			});
	});
</script>

<div
	bind:this={reference}
	class={`popup-container ${theme}`}
	class:abs={absolute}
	class:w-fit={!width.length && fitContent}
	style:bottom={absolute?.bottom}
	style:left={absolute?.left}
	style:right={absolute?.right}
	style:top={absolute?.top}
	style:width
>
	<div class="popup w-100 h-100 rlv">
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<svg
			class="popup-close abs pointer"
			on:click={closeHandle}
			version="1.1"
			viewBox="0 0 512 512"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
		>
			<g>
				<g>
					<path
						d="M256,0C114.615,0,0,114.615,0,256s114.615,256,256,256s256-114.615,256-256S397.385,0,256,0z M327.115,365.904    L256,294.789l-71.115,71.115l-38.789-38.789L217.211,256l-71.115-71.115l38.789-38.789L256,217.211l71.115-71.115l38.789,38.789    L294.789,256l71.115,71.115L327.115,365.904z"
						fill="var(--dark)"
					/>
				</g>
			</g>
		</svg>
		<div class="popup-content h-100"><slot /></div>
	</div>
</div>

<style lang="scss">
	.popup-container {
		border: 1px solid var(--borders);
		border-radius: 4px;
		transition: opacity 120ms ease-out;

		&.success {
			background-color: var(--success);
		}

		&.info {
			background-color: var(--info);
		}

		&.warning {
			background-color: var(--warning);
			border-color: rgba(32, 32, 32, 0.19);
		}

		&.error {
			background-color: var(--danger);
		}

		&.closing {
			opacity: 0;
		}

		.popup {
			padding: 1em 0.8em;
			&-close {
				height: 18px;
				right: 0.2em;
				top: 0.2em;
				width: 20px;

				path:hover {
					fill: var(--gray-dark) !important;
					transition: fill ease-in-out 90ms;
				}
			}
		}
	}
</style>