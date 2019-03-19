const namespaced = true;

const state = () => ({
	clicks: 0,
	totalClicks: 0,
	currentStage: 1,
	totalTime: 0,
});

const mutations = {
	addClick(s) {
		s.clicks++;
		s.totalClicks = Number(s.totalClicks) + Number(s.clicks);
	},
	resetClicks(s) {
		s.clicks = 0;
	},
	nextStage(s) {
		s.currentStage++;
	},
};

export default {
	namespaced,
	state,
	mutations,
};