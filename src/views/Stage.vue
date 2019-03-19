<template>
	<div class="stage">
		<div class="board">
			<Plate :cards="cards" :board="board" @finish="finish"/>
		</div>
		<div class="score">
			<h3 class="white pb-20">Level{{ currentStage +1 }}</h3>
			<Timer @time="setTime"/>
			<Clickcounter/>
		</div>

		<Modal :show="showLevelModal">
			<div @click="nextLevel">
				<h1>Level {{ currentStage +1 }} is finished!</h1>
				<p>Time: {{ time }}</p>
				<p>Clicks: {{ clicks }}</p>
				<div class="next_level">
					<img src="../assets/farmer.png">
				</div>
			</div>
		</Modal>

		<Modal :show="showFinishModal">
			<div>
				<h1>Game is finished!</h1>
				<p>Total Time: {{ totalTime }}</p>
				<p>Total Clicks: {{ totalClicks }}</p>
				<div class="next_level">
					<img src="../assets/farmer.png">
				</div>
			</div>
		</Modal>

	</div>
</template>

<script>
import { stages } from '../configs/config';

export default {
	components: {
		Plate: () => import('@/components/Plate'),
		Timer: () => import('@/components/Timer'),
		Clickcounter: () => import('@/components/Clickcounter'),
		Modal: () => import('@/components/Modal'),
	},
	data() {
		return {
			stages,
			showLevelModal: false,
			showFinishModal: false,
			time: '',
		};
	},
	computed: {
		currentStage() {
			return this.$store.state.game.currentStage - 1;
		},
		stageData() {
			return this.stages[this.currentStage];
		},
		cards() {
			const { cards } = this.stageData;
			return cards;
		},
		board() {
			const { board } = this.stageData;
			return board;
		},
		clicks() {
			return this.$store.state.game.clicks;
		},
		totalTime() {
			return this.msToTime(this.$store.state.timer.totalTime);
		},
		totalClicks() {
			return this.$store.state.game.totalClicks;
		},
	},
	mounted() {
		this.$store.commit('timer/start');
	},
	methods: {
		setTime(time) {
			this.time = time;
		},
		finish() {
			this.$store.commit('timer/stop');
			setTimeout((self) => {
				this.showLevelModal = true;
			}, 700, this);
		},
		nextLevel() {
			this.showLevelModal = false;
			if (this.stages.length < this.currentStage + 2) {
				this.showFinishModal = true;
				return;
			}
			this.$store.commit('game/nextStage');
			this.$store.commit('game/resetClicks');
			this.$store.commit('timer/start');
		},
		msToTime(ms) {
			return new Date(ms).toISOString().slice(11, 19);
		},
	},
};
</script>

<style scoped>
	.stage{
		width:100%;
		height:100%;
		display:flex;
	}
	.board{
		width:100%;
	}
	.score{
		padding-top:25px;
		flex-grow:1;
		background-color:cadetblue;
	}
	.white{
		color:white;
	}
	.pb-20{
		padding-bottom:20px;
	}
</style>