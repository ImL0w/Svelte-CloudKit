<script lang="ts">
	// UTILITY
	import { concatClasses } from '$lib/ts/utility/array';
	// ENMUS
	import { Themes } from '$lib/ts/enum/Themes';
	// COMPONENTS
	import Tag from '$lib/components/layout/Tag.svelte';
	// EXPORTS
	export let animations = false;
	export let enterKeyFunc: (() => void) | null = null;
	export let placeholder = 'password...';
	export let value = '';
	export let width = '',
		height = '',
		maxWidth = '';
	export let size: CloudKit.Theme.FontSizes = 'xs';
	export let theme: CloudKit.Theme.Colors | Themes | string = Themes.DARK;
	export let classList: string = '';
	export let hidden = false;
	export let tag: { color: string; value: string } | null = null;
	export let prefixImage: { path: string; focus?: boolean } | null = null;
	export let suffixImagePath = '';
	// LOGIC
	const handleKeyEnter = (event: KeyboardEvent) => {
		if (enterKeyFunc && event.code === 'Enter') enterKeyFunc();
	};
</script>

<div
	class="input-text flex flex-vr gap-1 transition-borderColor-85"
	class:img-prefix-focus={prefixImage?.focus}
	class:hide={hidden}
	style:height
	style:max-width={maxWidth}
	style:width
>
	{#if tag}
		<Tag classList="m-l-2" color={tag.color} textColor="var(--text)">{tag.value}</Tag>
	{:else if prefixImage?.path}
		<img alt="" class="icon" src={prefixImage.path} />
	{/if}
	<input
		bind:value
		class={concatClasses('w-100', `fs-${size}`, classList, theme)}
		class:hide={prefixImage?.focus}
		class:img-suffix={suffixImagePath}
		class:transition-maxW-250={animations}
		on:keydown={handleKeyEnter}
		{placeholder}
		style:background-image={suffixImagePath ? `url(${suffixImagePath})` : null}
		type="password"
	/>
</div>

<style lang="scss">
	.input-text {
		border: 1px solid var(--borders);
		border-radius: 4px;
		padding-left: 0.5rem;
		min-width: 18ch;

		&.img-prefix-focus {
			padding: 0.35em;
			min-width: auto;
		}

		&:hover {
			border-color: hsla(0, 0%, 100%, 0.3);
		}
	}
</style>