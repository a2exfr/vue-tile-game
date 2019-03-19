<template>
	<div class="timer">
		<div class="timer__title">
			<h5 class="white">
				Time
			</h5>
			<img
					class="timer__icon"
					src="../assets/time.png"
			>
		</div>
		<div class="timer__numbers">
			{{ timer }}
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			startTime: new Date(),
			timer: '00:00:00',
		};
	},
	computed: {
		isRun() {
			return this.$store.state.timer.isRun;
		},
	},
	watch: {
		isRun(val) {
			if (val) {
				this.goTimer();
			} else {
				this.$store.commit('timer/setStopTime', new Date().toString());
				clearInterval(this.time);
			}
		},
	},
	mounted() {
		if (this.isRun) {
			this.goTimer();
		}
	},

	beforeDestroy() {
		clearInterval(this.time);
	},
	methods: {
		goTimer() {
			this.$store.commit('timer/setStartTime', new Date().toString());
			this.startTime.setSeconds(0);
			this.startTime.setMinutes(0);
			this.startTime.setHours(0);
			this.time = setInterval(
				(self) => {
					self.increment();
				},
				1000,
				this,
			);
		},
		increment() {
			this.startTime.setSeconds(this.startTime.getSeconds() + 1);
			this.setTimer();
		},
		setTimer() {
			let hr = this.startTime.getHours();
			let min = this.startTime.getMinutes();
			let sec = this.startTime.getSeconds();
			hr = this.addZero(hr);
			min = this.addZero(min);
			sec = this.addZero(sec);
			this.timer = `${hr}:${min}:${sec}`;

			this.$emit('time', this.timer);
		},
		addZero(i) {
			if (i < 10) {
				i = `0${i}`;
			}
			return i;
		},
	},
}
</script>

<style scoped>
	.timer{
		display:flex;
		flex-direction:column;
		justify-content:center;
		align-items:center;
	}
	.timer__title{
		display:flex;
		align-items:center;
		justify-content:space-between;
	}
	.timer h5{
		margin-bottom:5px;
		margin-top:5px;
	}
	.timer__icon{
		margin-left:5px;
		width:25px;
		height:25px;
	}
	.timer__numbers{
		color:white;
	}
	.white{
		color:white;
	}
</style>