import React, { useReducer } from 'react';
import { RafflePage as RafflePagePresentational } from '../components/raffles/RafflePage';
import { useSnackbar } from 'notistack';

const typeActions = {
	loading: 0,
 	isReservingQuotas: 1,
	quotas: 2,
}
 
const initialState = {
	loading: false,
	isReservingQuotas: false,
	quotas: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		case typeActions.loading:
			return { ...state, loading: action.payload.loading };
		case typeActions.isReservingQuotas:
			return { ...state, isReservingQuotas: action.payload.isReservingQuotas };
		case typeActions.quotas:
			return { ...state, quotas: action.payload.quotas };
		default:
			throw new Error();
	}
};

const RaffleActions = (dispatch, enqueueSnackbar) => {
	const actions = {		
		setLoading(loading) {
			dispatch({ type: typeActions.loading, payload: { loading } });
		},
		setIsReservingQuotas(isReservingQuotas) {
			dispatch({ type: typeActions.isReservingQuotas, payload: { isReservingQuotas } });
		},
		setQuotas(quotas) {
			dispatch({ type: typeActions.quotas, payload: { quotas } });
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
				body: body,
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
				await actions.saveUser(values);
			} catch (error) { }
			try {
				await actions.reserveQuotas(user.id, raffleId, selectedQuotas).ok;
			} catch (error) { }
			enqueueSnackbar('Cotas reservadas com sucesso!', { variant: 'success' })
			actions.setIsReservingQuotas(false);
		},
		async getQuotas(raffleId) {
			const response = await fetch(`/api/raffles/${raffleId}/quotas`, {
				method: 'GET',
			});

			actions.setQuotas(await response.json())
		},
	};

	return actions;
};

const RafflePage = ({ raffle }) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { enqueueSnackbar } = useSnackbar();
	const actions = RaffleActions(dispatch, enqueueSnackbar);

	return <RafflePagePresentational {...state} {...actions} raffle={raffle} />;
};

export default RafflePage;
