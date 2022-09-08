<script lang="ts">
	export let items: Array<string>;
	export let on: boolean = true;
</script>

<div class="marquee-slider h-fit flex gap-4" class:anim={on}>
	{#each items as file_name}
		<img data-src={'/assets/icons/logos/' + file_name + '.svg'} alt="" />
	{/each}
</div>

<style lang="scss">
	.marquee-slider {
		width: 100vw;
		background-color: var(--green-dark);
		overflow-y: hidden;
		overflow-x: auto;
		scroll-behavior: smooth;
		padding: 0 15px;

		img {
			height: 100px;
			max-width: 100%;
		}

		&.anim {
			// TODO
		}
	}
</style>