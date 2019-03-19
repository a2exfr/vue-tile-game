<template>
	<div class="plate">
		<Tile
				v-for="(card,key) in incards"
				:key="key"
				:image="card.image"
				:status="card.status"
				:board="board"
				@match="setMatch"
				@closeTiles="closeTiles"
		/>
	</div>
</template>

<script>

export default {
	components: {
		Tile: () => import('@/components/Tile'),
	},
	props: {
		cards: {
			type: Array,
			default() {
				return [];
			},
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
			tiles: [],
			matchedTiles: [],
		};
	},
	computed: {
		incards() {
			const cards = this.cards.map((el) => {
				el.status = '';
				return el;
			});
			return this.shuffleArray([...cards, ...cards]);
		},
	},
	watch: {
		matchedTiles() {
			if (this.matchedTiles.length === this.incards.length) {
				this.$emit('finish');
			}
		},
		cards() {
			this.matchedTiles = [];
			this.tiles = [];
		},
	},
	mounted() {
		if (this.board.columns * this.board.rows < this.incards.length) {
			alert('Too much cards for board');
		}
	},
	provide() {
		return {
			plate: this,
		};
	},
	methods: {
		shuffleArray(array) {
			return array.map(a => [Math.random(), a]).sort((a, b) => a[0] - b[0]).map(a => a[1]);
		},
		setMatch() {
			this.matchedTiles.push(this.tiles[0].id);
			this.matchedTiles.push(this.tiles[1].id);
		},
		closeTiles() {
			if (this.tiles.length === 2) {
				this.tiles = [];
			}
		},
	},

};
</script>

<style scoped>
	.plate{
		display:flex;
		flex-wrap:wrap;
		justify-content:center;
		align-items:center;
		height:100%;
		width:100%;
	}
</style>