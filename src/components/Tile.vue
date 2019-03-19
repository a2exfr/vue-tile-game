<template>
	<div
			class="scene"
			:class="instatus ==='match' ? 'disapear1': ''"
			:style="sceneStyle"
	>
		<div
				:class="opened ? 'is-flipped' : '' "
				class="card"
				@click="toggle"
		>
			<div class="card__face card__face--front">
			</div>
			<div
					class="card__face card__face--back"
					:style="cardStyle"
			></div>
		</div>
	</div>
</template>

<script>
export default {
	inject: ['plate'],
	props: {
		image: {
			type: String,
			default: '',
		},
		status: {
			type: String,
			default: '',
		},
		board: {
			type: Object,
			default() {
				return {
					columns: 4,
					rows: 3,
				};
			},
		},
	},
	data() {
		return {
			publicPath: process.env.BASE_URL,
			cardClass: '',
			id: `_${Math.random().toString(36).substr(2, 9)}`,
			closedInterval: '',
		};
	},
	computed: {
		opened() {
			if (this.plate.matchedTiles.includes(this.id)) {
				return true;
			}
			return this.plate.tiles.find(el => el.id === this.id);
		},
		cardStyle() {
			return `background: white url('${this.publicPath}img/cards/${this.image}') no-repeat scroll 50% 50%/contain; `;
		},
		instatus() {
			if (this.plate.matchedTiles.includes(this.id)) {
				return 'match';
			}
			return '';
		},
		sceneStyle() {
			const w = (735 - 3 * 2 * this.board.columns) / this.board.columns;
			const h = (800 - 6 * this.board.rows) / this.board.rows;
			return `width:${w}px; height:${h}px`;
		},

	},
	methods: {
		toggle() {
			if (this.instatus === 'match') {
				return;
			}
			this.$store.commit('game/addClick');
			// two opened and dont match
			if (this.plate.tiles.length === 2) {
				if (this.opened) {
					this.plate.tiles = [];
					return;
				}
				this.plate.tiles = [];
			}
			// click on self (dont close when one opened)
			if (this.opened && this.plate.tiles.length === 1) {
				return;
			}

			if (this.opened) {
				this.plate.tiles = this.plate.tiles.filter(el => el.id !== this.id);
			} else {
				this.plate.tiles.push({ id: this.id, match: this.image });
			}

			if (this.plate.tiles.length === 2) {
				this.checkMatch();
			}
		},
		checkMatch() {
			if (this.plate.tiles[0].match === this.plate.tiles[1].match) {
				this.$emit('match');
			} else {
				this.closedInterval = setTimeout(() => {
					this.$emit('closeTiles');
				}, 1000);
			}
		},
	},
};
</script>

<style scoped>
	.scene{
		width:24%;
		height:260px;
		margin:3px 3px;
		perspective:600px;
	}
	.card{
		width:100%;
		height:100%;
		transition:transform 0.5s;
		transform-style:preserve-3d;
		cursor:pointer;
		position:relative;
	}
	.card.is-flipped{
		transform:rotateY(180deg);
	}
	.card__face{
		position:absolute;
		width:100%;
		height:100%;
		line-height:260px;
		color:white;
		text-align:center;
		font-weight:bold;
		font-size:40px;
		backface-visibility:hidden;
		border-radius:4px;
	}
	.card__face--front{
		background:tomato;
		background-size:cover;
	}
	.card__face--back{
		transform:rotateY(180deg);
	}
	@keyframes myAnimation{
		0%{
			opacity:1;
			transform:rotateY(90deg);
		}
		50%{
			opacity:0.5;
			transform:rotateY(0deg);
		}
		100%{
			display:none;
			opacity:0;
			transform:rotateY(90deg);
		}
	}
	.disapear{
		animation-name:myAnimation;
		animation-duration:2000ms;
		animation-fill-mode:forwards;
	}

</style>
