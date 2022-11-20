<script lang="ts">
	import Button from '$lib/components/user/button.svelte';
	import ContextMenu from '$lib/components/user/context-menu/contextMenu.svelte';
	import Dropdown from '$lib/components/user/dropdown.svelte';
	import Tag from '$lib/components/layout/Tag.svelte';
	import InputArea from '$lib/components/user/input/inputArea.svelte';

	const contextMenuConfig: CloudKit.ContextMenu.config = {
		items: [{ value: 'rename' }, { value: 'alert', func: () => alert(1) }, { value: 'close' }]
	};
</script>

<Button theme="primary">Lol</Button>

<ContextMenu items={contextMenuConfig.items} targetsSelector="#app-content h1" />

<Tag color="primary">asdas</Tag>

<div id="index" class="transition-all-250">
	<div id="app-content" class="flex-col-md">
		<Dropdown options={[{ img: '', value: 'lol' }, 'lol']} />
		<h1>Welcome!</h1>
		<InputArea value="Shiiiish" resizable />
	</div>
</div>

<style lang="scss" global>
	@use '../lib/scss/base.scss' with (
		$boxed: 100px
	);
</style>