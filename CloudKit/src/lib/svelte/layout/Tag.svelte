<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	// EXPORTS
	export let classList = '';
	export let color: TTag.color,
		func: TTag.func | null = null,
		size: TTag.size = 'xs';
	export let textColor: string = '';
</script>

<div
	class={concatClasses('tag flex flex-all h-fit overflow-h', color, classList)}
	class:pointer={func}
	on:click={func}
>
	<h5 class:fs-sm={size === 'sm'} style:color={textColor}><slot /></h5>
</div>

<style lang="scss">
	.tag {
		border-radius: 10px;
		max-width: fit-content;
		padding: 0.2em 0.85em;

		&.red {
			background-color: hsla(4, 68%, 48%, 0.49);
			h5 {
				color: var(--error);
			}

			&:hover {
				background-color: hsla(4, 68%, 48%, 0.59);
			}
		}

		&.green {
			background-color: hsla(151, 53%, 37%, 0.49);
			h5 {
				color: var(--success);
			}

			&:hover {
				background-color: hsla(151, 53%, 37%, 0.59);
			}
		}

		&.orange {
			background-color: hsla(37, 100%, 48%, 0.49);
			h5 {
				color: var(--warning);
			}

			&:hover {
				background-color: hsla(37, 100%, 48%, 0.59);
			}
		}

		&.violet {
			background-color: hsla(266, 100%, 64%, 0.49);
			h5 {
				color: var(--violet-primary);
			}

			&:hover {
				background-color: hsla(266, 100%, 64%, 0.59);
			}
		}

		&.yellowie {
			background-color: hsla(69, 100%, 53%, 0.49);
			h5 {
				color: var(--yellowie);
			}

			&:hover {
				background-color: hsla(69, 100%, 53%, 0.59);
			}
		}
	}
</style>