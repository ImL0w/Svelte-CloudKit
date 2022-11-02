<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	// ENMUS
	import { Themes } from '$lib/ts/enum/Themes';
	// EXPORTS
	export let centerItems = false,
		alignCenter = false;
	export let className = '';
	export let fit = false;
	export let padding: string = '';
	export let allowClose = false;
	// LOGIC
	let _this: HTMLDivElement | null = null;
	$: hideContent = false;

	function closeCard() {
		if (allowClose && _this) _this.remove();
	}

	function minimizeContent() {
		hideContent = !hideContent;
	}
</script>

<div
	bind:this={_this}
	class={concatClasses(
		'card-container',
		Themes.DARK,
		'flex-col',
		'gap-3',
		'transition-all-250',
		className
	)}
	class:h-fit={fit}
	class:card-content-center={centerItems}
	class:align-center={alignCenter}
	style:padding
>
	<div class="tool-bar flex flex-vr gap-5 w-100">
		<svg
			class="tool-minimize pointer"
			class:active={hideContent}
			fill="none"
			width="18"
			height="18"
			on:click={minimizeContent}
			viewBox="0 0 9 7"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				class="transition-fill-150"
				d="M4.5 6.5C4.30857 6.49914 4.11975 6.46041 3.94725 6.38661C3.77475 6.31281 3.62289 6.2058 3.50269 6.07333L0.345809 2.67333C0.16134 2.46865 0.0452565 2.222 0.0107866 1.96151C-0.0236834 1.70102 0.0248466 1.43716 0.150846 1.2C0.253036 0.993884 0.419799 0.818276 0.631217 0.694148C0.842636 0.570021 1.08977 0.502622 1.34311 0.5H7.65688C7.91023 0.502622 8.15736 0.570021 8.36878 0.694148C8.5802 0.818276 8.74696 0.993884 8.84915 1.2C8.97515 1.43716 9.02368 1.70102 8.98921 1.96151C8.95474 2.222 8.83866 2.46865 8.65419 2.67333L5.49731 6.07333C5.37711 6.2058 5.22525 6.31281 5.05275 6.38661C4.88025 6.46041 4.69143 6.49914 4.5 6.5Z"
				fill="#696565"
			/>
		</svg>
		<svg
			class="tool-close m-l-auto pointer"
			class:hide={!allowClose}
			fill="none"
			height="30"
			on:click={closeCard}
			viewBox="0 0 15 15"
			width="30"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				class="transition-fill-150"
				d="M7.5 0C3.36446 0 0 3.36446 0 7.5C0 11.6355 3.36446 15 7.5 15C11.6355 15 15 11.6355 15 7.5C15 3.36446 11.6355 0 7.5 0ZM7.5 13.9286C3.9553 13.9286 1.07143 11.0447 1.07143 7.5C1.07143 3.9553 3.9553 1.07143 7.5 1.07143C11.0447 1.07143 13.9286 3.9553 13.9286 7.5C13.9286 11.0447 11.0447 13.9286 7.5 13.9286Z"
				fill="#696565"
			/>
			<path
				class="transition-fill-150"
				d="M9.79832 5.20166C9.5891 4.99243 9.24993 4.99243 9.0407 5.20166L7.49999 6.74237L5.95922 5.2016C5.74999 4.99237 5.41082 4.99237 5.2016 5.2016C4.99237 5.41082 4.99237 5.74999 5.2016 5.95922L6.74237 7.49999L5.2016 9.04076C4.99237 9.24999 4.99237 9.58916 5.2016 9.79838C5.30618 9.90297 5.44332 9.95529 5.58041 9.95529C5.71749 9.95529 5.85457 9.90297 5.95922 9.79838L7.49999 8.25761L9.04076 9.79838C9.14535 9.90297 9.28249 9.95529 9.41957 9.95529C9.55666 9.95529 9.69374 9.90297 9.79838 9.79838C10.0076 9.58916 10.0076 9.24999 9.79838 9.04076L8.25761 7.49999L9.79838 5.95922C10.0075 5.75005 10.0075 5.41082 9.79832 5.20166Z"
				fill="#696565"
			/>
		</svg>
	</div>
	<div class="card-container-content" class:minimized={hideContent}>
		<div class:hide={hideContent}>
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.card-container {
		border-radius: 9px;
		padding: 1.5em 1.3em;

		.card-container-content {
			background-color: #2e2e2e;
			border-radius: inherit;
			box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.16);
			-moz-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.16);
			-webkit-box-shadow: inset 0 0 3px rgba(0, 0, 0, 0.16);
			padding: 1.3em;
			transition: max-height 350ms ease-out;
			max-height: 500px;

			&.minimized {
				max-height: 0;
			}
		}

		.tool-bar {
			.tool-minimize.active {
				transform: rotateX(180deg);
			}

			.tool-minimize:hover path,
			.tool-close:hover path {
				fill: #5a5555;
			}
		}

		&.card-content-center {
			display: flex;
			justify-content: center;
		}

		&:active {
			background-color: rgba(54, 54, 54, 0.842);
		}
	}
</style>