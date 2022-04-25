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
				
			return await response
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
		
			return await response;
		},
		async saveUserAndReserveQuotas(values, raffleId, selectedQuotas) {
			actions.setIsReservingQuotas(true);
			const user = await actions.saveUser(values);
			const userData = await user.json()

			if (user.status === 200) {
				const quotas = await actions.reserveQuotas(userData.id, raffleId, selectedQuotas);
				if (quotas.status === 409) {
					enqueueSnackbar('Cotas indisponíveis. Tente novamente.', { variant: 'error' })
					actions.setIsReservingQuotas(false);
					return quotas;
				}
				const quotasData = await quotas.json();
				actions.getQuotas(raffleId);
				enqueueSnackbar('Cotas reservadas com sucesso!', { variant: 'success' })
				actions.setIsReservingQuotas(false);
				return await quotasData;
			} else {
				actions.setIsReservingQuotas(false);
				enqueueSnackbar('Algum erro ocorreu. Tente novamente ou contate o suporte.', { variant: 'error' })
			}

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
