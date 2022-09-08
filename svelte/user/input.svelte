<script lang="ts">
	// type size
	import type { size } from '$lib/ts/types/size';
	// props
	export let placeholder = undefined;
	export let value: String = undefined;
	export let type: 'text' | 'password' = 'text';
	export let width: string = undefined,
		height: string = undefined;
	export let size: size;
	export let theme: 'light' | 'special' = undefined;
	export let fitContent = false;
	export let classList: string = undefined;
</script>

{#if type === 'text'}
	<input
		type="text"
		style:font-size={`var(--fs-${size})`}
		style:max-width={fitContent ? 'fit-content' : null}
		class={classList}
		class:light={theme === 'light'}
		class:special={theme === 'special'}
		{placeholder}
		{height}
		{width}
		bind:value
	/>
{:else}
	<input
		type="password"
		style:font-size={`var(--fs-${size})`}
		style:max-width={fitContent ? 'fit-content' : null}
		class:light={theme === 'light'}
		class:special={theme === 'special'}
		{placeholder}
		{height}
		{width}
		bind:value
	/>
{/if}