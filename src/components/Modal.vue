<template>
	<div v-if="inshow" class="sm_cont">
		<div v-if="inshow" class="shadow"></div>
		<div v-if="inshow" class="sm">
			<div>
				<slot></slot>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		show: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			inshow: this.show,
		};
	},
	watch: {
		show(val) {
			this.inshow = val;
		},
	},
	methods: {
		hide() {
			this.inshow = false;
		},
	},

};
</script>
<style scoped>
	.sm{
		position:fixed;
		top:50%;
		left:50%;
		transform:translate(-50%, -50%);
		-webkit-transform:translate(-50%, -50%);
		z-index:9999;
		min-width:300px;
		background:#ffffff;
		border-radius:12px;
		padding:30px;
	}
	.sm_cont{
		position:absolute;
		top:0;
		left:0;
		bottom:0;
		right:0;
	}
	.shadow{
		position:fixed;
		top:0;
		left:0;
		width:100vw;
		height:100vh;
		background:rgba(61, 97, 178, 0.75);
		z-index:9998;
	}
</style>
