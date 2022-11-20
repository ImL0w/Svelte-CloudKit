<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	// EXPORTS
	export let name = '',
		id = '';
	export let options: Array<{ img: string; value: string } | string>;
	export let theme: CloudKit.Theme.Colors | string = 'dark',
		size: CloudKit.Theme.FontSizes = 'xs';
	export let selected: any = undefined;
</script>

<div class={concatClasses('dropdown', `${theme}-component`, 'flex-vr')}>
	<select {id} {name} class={`w-100 fs-${size}`} bind:value={selected}>
		{#each options as option}
			<option value={option?.value || option}>
				{#if option?.img}
					<img src={option.img} alt="" />
				{/if}
				{option?.value || option}
			</option>
		{/each}
	</select>
</div>

<style lang="scss">
	.dropdown {
		border-radius: 3px;
		display: grid;
		grid-template-areas: 'select';
		max-height: fit-content;
		min-width: 10ch;
		width: fit-content;

		select {
			appearance: none;
			background-color: transparent;
			border: none;
			color: inherit;
			cursor: inherit;
			font-family: var(--mono);
			outline: none;
			padding: 0.35em 0.5em;
			padding-right: calc(0.5em + 0.8em); // add arrow width

			&::-ms-expand {
				display: none;
			}
		}

		&::after {
			clip-path: polygon(100% 0%, 0 0%, 50% 100%);
			content: '';
			background-color: var(--borders);
			height: 0.5em;
			justify-self: end;
			margin-right: 0.5em;
			width: 0.8em;
		}

		&.light-component::after {
			background-color: #000000ab;
		}

		select,
		&::after {
			grid-area: select;
		}
	}
</style>