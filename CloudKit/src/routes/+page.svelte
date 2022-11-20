<script lang="ts">
	import Button from '$lib/components/user/button.svelte';
	import ContextMenu from '$lib/components/user/context-menu/contextMenu.svelte';
	import Dropdown from '$lib/components/user/dropdown.svelte';
	import Tag from '$lib/components/layout/Tag.svelte';
	import InputArea from '$lib/components/user/input/inputArea.svelte';
	import RadioButton from '$lib/components/user/radioButton.svelte';
	import Checkbox from '$lib/components/user/checkbox.svelte';
	import InputText from '$lib/components/user/input/inputText.svelte';

	const contextMenuConfig: CloudKit.ContextMenu.config = {
		items: [{ value: 'rename' }, { value: 'alert', func: () => alert(1) }, { value: 'close' }]
	};
</script>

<div id="index" class="transition-all-250">
	<div id="app-content">
		<h1>Welcome!</h1>
		<div class="flex-col gap-3">
			<Button>Lol</Button>
			<Tag color="red">asdas</Tag>
			<Dropdown options={[{ img: '', value: 'lol' }, 'lol']} />
			<InputArea value="Shiiiish" resizable />
			<RadioButton checked label="strunz" name="chk" size="lg" />
			<RadioButton label="strunz" tooltip="okeeeee" name="chk" />
			<Checkbox checked label="okay lets go" tooltip="lool" size="lg" />
			<Checkbox label="okay lets go" />
			<InputText />
		</div>
	</div>
</div>

<style lang="scss" global>
	@use '../lib/scss/base.scss' with (
		$boxed: 100px
	);
</style>