<template>
	<div id="app">
		<component :is="layout">
			<router-view />
		</component>
	</div>
</template>
<script>
const defaultLayout = 'default';

export default {
	name: 'App',
	data() {
		return {};
	},
	computed: {
		layout() {
			return `${(this.$route.meta.layout || defaultLayout)}-layout`;
		},
	},
};
</script>

<style>
	@import 'assets/a2exfr.css';

	body, html{
		overflow-x:hidden;
		margin:0;
		background:url("assets/img/background.jpg");
		display:flex;
		justify-content:center;
		align-items:center;
		width:100vw;
		height:100vh;
	}
	#app{
		font-family:Lato, sans-serif;
		-webkit-font-smoothing:antialiased;
		-moz-osx-font-smoothing:grayscale;
		text-align:center;
		color:#505050;
		width:800px;
		height:800px;
		overflow:hidden;
		border:2px solid #f9e400;
	}
</style>
