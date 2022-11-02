<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	// EXPORTS
	export let name = '',
		id = '';
	export let options: Array<{ img: string; value: any } | any>;
	export let theme: Theme.Colors = 'dark',
		size: Theme.FontSizes = 'xs';
	export let selected: any = undefined;
</script>

<div class={concatClasses('dropdown', theme, 'flex-vr')}>
	<select {id} {name} class={`w-100 fs-${size}`} bind:value={selected}>
		{#each options as option}
			<option value={option.value || option}>
				{#if option.img}
					<img src={option.img} alt="" />
				{/if}
				{option.value || option}
			</option>
		{/each}
	</select>
</div>

<style lang="scss">
	.dropdown {
		background-color: var(--component);
		border: 1px var(--borders) solid;
		border-radius: 3px;
		display: grid;
		grid-template-areas: 'select';
		min-width: 10ch;

		select {
			appearance: none;
			background-color: transparent;
			border: none;
			color: var(--text-primary);
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
			background-color: hsla(0, 0%, 100%, 0.33);
			height: 0.5em;
			justify-self: end;
			margin-right: 0.5em;
			width: 0.8em;
		}

		select,
		&::after {
			grid-area: select;
		}
	}
</style>