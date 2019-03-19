<template>
	<div class="start">
		<img src="../assets/farmer.png">
		<router-link to="/stage">
			<div class="btn">Start</div>
		</router-link>
	</div>
</template>

<script>
// @ is an alias to /src

export default {

};
</script>
<style>
	.start{
		display:flex;
		justify-content:center;
		align-items:center;
		height:100%;
	}
	.btn{
		border-radius:4px;
		padding:0.375rem 0.75rem;
		font-size:1rem;
		background-color:#f9e400;
	}
</style>
