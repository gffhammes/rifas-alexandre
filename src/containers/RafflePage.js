import React, { useReducer } from 'react';
import { RafflePage as RafflePagePresentational } from '../components/raffles/RafflePage';

const typeActions = {
	loading: 0,
 	isReservingQuotas: 1,
}
 
const initialState = {
	loading: false,
	isReservingQuotas: false,
};

const reducer = (state, action) => {
	switch (action.type) {
		case typeActions.loading:
			return { ...state, loading: action.payload.loading };
		case typeActions.isReservingQuotas:
			return { ...state, isReservingQuotas: action.payload.isReservingQuotas };
		default:
			throw new Error();
	}
};

const RaffleActions = (dispatch) => {
	const actions = {		
		setLoading(loading) {
			dispatch({ type: typeActions.loading, payload: { loading } });
		},
		setIsReservingQuotas(isReservingQuotas) {
			dispatch({ type: typeActions.isReservingQuotas, payload: { isReservingQuotas } });
		},
		async saveUser(user) {
			const response = await fetch('/api/users', {
				method: 'POST',
				body: JSON.stringify(user),
			});
		
			if (!response.ok) {
				throw new Error(response.statusText);
			}
		
			return await response.json();
		},
		async reserveQuotas(userId, raffleId, quotas) {		
			const body = {
				numbers: quotas,
				raffleId: raffleId,
				ownerId: userId,
			}
		
			const response = await fetch(`/api/raffles/${raffleId}/quotas`, {
				method: 'PUT',
				body: JSON.stringify(body),
			});
		
			if (!response.ok) {
				throw new Error(response.statusText);
			}
		
			return await response.json;
		},
		async saveUserAndReserveQuotas(values, raffleId, selectedQuotas) {
			actions.setIsReservingQuotas(true);
			let user;
			try {
				user = await actions.saveUser(values);
			} catch (error) {
				//error && console.log(error);
			}
			await actions.reserveQuotas(user.id, raffleId, selectedQuotas);
			actions.setIsReservingQuotas(false);
		}
	};

	return actions;
};

const RafflePage = ({ raffle, quotas }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const actions = RaffleActions(dispatch);

	return <RafflePagePresentational {...state} {...actions} raffle={raffle} quotas={quotas}/>;
};

export default RafflePage;
