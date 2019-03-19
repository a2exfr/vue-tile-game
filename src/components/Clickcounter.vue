<template>
	<div>
		<h5 class="white mb-10 mt-20">
			Clicks
		</h5>
		<span class="white">{{ clicks }}</span>
	</div>
</template>

<script>
export default {
	computed: {
		clicks() {
			return this.$store.state.game.clicks;
		},
	},
};
</script>

<style scoped>
	.white{
		color:white;
	}
</style>
