const routes = {
	get index() {
		return '/';
	},
	game: {
		get index() {
			return routes.index + 'game/';
		}
	},
	user: {
		get index() {
			return routes.index + 'user/';
		},
		get login() {
			return this.index + 'login/';
		},
		get logout() {
			return this.index + 'logout/';
		}
	}
};
export default routes;
