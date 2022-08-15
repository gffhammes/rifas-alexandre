import React, { useReducer } from 'react';
import { RafflePage as RafflePagePresentational } from '../components/raffles/RafflePage';
import { useSnackbar } from 'notistack';

const typeActions = {
	loading: 0,
 	isReservingQuotas: 1,
	quotas: 2,
	raffleData: 3,
}
 
const initialState = {
	loading: false,
	isReservingQuotas: false,
	quotas: [],
	raffleData: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case typeActions.loading:
			return { ...state, loading: action.payload.loading };
		case typeActions.isReservingQuotas:
			return { ...state, isReservingQuotas: action.payload.isReservingQuotas };
		case typeActions.quotas:
			return { ...state, quotas: action.payload.quotas };
		case typeActions.raffleData:
			return { ...state, raffleData: action.payload.raffleData };
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
		setRaffleData(raffleData) {
			dispatch({ type: typeActions.raffleData, payload: { raffleData } });
		},
		async getRaffleData(raffleId) {			
			const response = await fetch(`/api/raffles/${raffleId}`, {
				method: 'GET',
			});
			actions.setRaffleData(await response.json())
		},
		async getQuotas(raffleId) {
			const response = await fetch(`/api/raffles/${raffleId}/quotas`, {
				method: 'GET',
			});
			actions.setQuotas(await response.json())
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

			if (user.status === 200) {
				const userData = await user.json()
				const quotas = await actions.reserveQuotas(userData.id, raffleId, selectedQuotas);
				const quotasData = await quotas.json();
				
				actions.getQuotas(raffleId);
				actions.setIsReservingQuotas(false);

				const getSuccessSnackbar = () => {
					const reservedNumbers = quotasData.numbers.join(', ')
					if (quotasData.numbers.length === 1) {
						return enqueueSnackbar(`A cota ${reservedNumbers} foi reservada com sucesso!`, { variant: 'success' })
					} else {
						return enqueueSnackbar(`As cotas ${reservedNumbers} foram reservadas com sucesso!`, { variant: 'success' })
					}
				}

				const getAlreadyReservedSnackbar = () => {
					const alreadyReservedNumbersString = quotasData.alreadyReservedNumbers.join(', ')
					if (quotasData.alreadyReservedNumbers.length === 1) {
						return enqueueSnackbar(`A cota ${alreadyReservedNumbersString} foi reservada por outro usuário.`, { variant: 'error' })
					} else {
						return enqueueSnackbar(`As cotas ${alreadyReservedNumbersString} foram reservadas por outro usuário.`, { variant: 'error' })
					}
				}
				
				if (quotas.status === 409) {
					getAlreadyReservedSnackbar();
					return { quotasData, quotas }
				}

				getSuccessSnackbar()
				actions.sendConfirmationMail({ userData, quotasData });
				actions.setIsReservingQuotas(false);
				
				return { quotasData, quotas };

			} else {
				actions.setIsReservingQuotas(false);
				enqueueSnackbar('Algum erro ocorreu. Tente novamente ou contate o suporte.', { variant: 'error' })
			}

		},
		async sendConfirmationMail(mailBody) {			
			const quotasString = mailBody.quotasData.numbers.join(', ')
			
			const message = `
				<ul>
					<li>Nome: ${mailBody.userData.name}</li>
					<li>Email: ${mailBody.userData.email}</li>
					<li>Telefone: ${mailBody.userData.phone}</li>
					<br />
					<li>Cotas reservadas: ${quotasString}</li>				
				</ul>
			`

			const body = {
				subject: 'Cotas reservadas',
				recipientMail: `${mailBody.userData.email}; a.d.sanches@gmail.com`,
				message,
			}

			console.log(body)

			fetch('/api/mail', {
				method: 'POST',
				body: JSON.stringify(body)
			})
		}
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
