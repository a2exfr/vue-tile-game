const namespaced = true;

const state = () => ({
	isRun: false,
	statTime: '',
	stopTime: '',
	totalTime: 0,
});

const mutations = {
	stop(s) {
		s.isRun = false;
	},
	start(s) {
		s.isRun = true;
	},
	setStartTime(s, val) {
		s.statTime = val;
	},
	setStopTime(s, val) {
		s.stopTime = val;
		s.totalTime = (new Date(s.stopTime).getTime() - new Date(s.statTime).getTime()) + s.totalTime;
	},
};

export default {
	namespaced,
	state,
	mutations,
};