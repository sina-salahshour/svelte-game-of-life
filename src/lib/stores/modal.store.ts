import { createStore } from '$lib/utils/create-store.util';

export const {
	store: modalStore,
	dispatchReducers: { hideModal, showModal }
} = createStore({
	initialState: { isVisible: false, component: null as ConstructorOfATypedSvelteComponent | null },
	reducers: {
		showModal(state, componnet: ConstructorOfATypedSvelteComponent) {
			state.isVisible = true;
			state.component = componnet as (typeof state)['component'];
		},
		hideModal(state) {
			state.isVisible = false;
			state.component = null;
		}
	}
});
