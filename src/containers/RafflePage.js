import React, { useReducer } from 'react';
import { RafflePage as RafflePagePresentational } from '../components/raffles/RafflePage';


const initialState = {
	loading: false
};

const reducer = (state, action) => {
	switch (action.type) {
		case loading:
			return { ...state, loading: action.payload.loading };
		default:
			throw new Error();
	}
};

const RaffleActions = (dispatch) => {
	const actions = {		
		setLoading(loading) {
			dispatch({ type: ActionType.LOADING, payload: { loading } });
		},
	};

	return actions;
};

const RafflePage = ({ raffle, quotas }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const actions = RaffleActions(dispatch);

	return <RafflePagePresentational {...state} {...actions} raffle={raffle} quotas={quotas}/>;
};

export default RafflePage;
