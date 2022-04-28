import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useMemo, useState } from 'react'
import { getQuotasStats } from '../../helpers/getQuotasStats';
import { UserForm } from '../commons/UserForm/UserForm';
import { QuotasGrid } from '../quotas/QuotasGrid';
import { RaffleCart } from './RaffleCart';
import { RafflePageCard } from './RafflePageCard';
import { LoadingCircle } from '../commons/LoadingCircle'
import { HomeButton } from '../commons/HomeButton';
import CheckoutDialog from '../commons/Checkout/CheckoutDialog';

export const RafflePage = ({
  raffle,
  quotas,
  saveUserAndReserveQuotas,
  isReservingQuotas,
  setIsReservingQuotas,
  getQuotas,
  sendConfirmationMail,
}) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [openUserForm, setOpenUserForm] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0)  

  useEffect(() => {
    getQuotas(raffle.id)
  }, [])

  if (quotas.length > 0) {
    raffle = getQuotasStats(quotas, raffle);
  }

  useMemo(() => {
    if (selectedNumbers.length < 5) {
      setTotalPrice(selectedNumbers.length * raffle.ticketPrice)
    } else if (selectedNumbers.length < 10) {
      setTotalPrice(selectedNumbers.length * 3.5)
    } else {
      setTotalPrice(selectedNumbers.length * 3)
    }
  }, [raffle.ticketPrice, selectedNumbers.length])

  const handleNumberClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(current => current.filter(selectedNumber => selectedNumber !== number));
    } else {
      setSelectedNumbers(current => [...current, number]);
    }
  }

  const handleBuyClick = () => {
    setOpenUserForm(true)
  }

  const handleBuy = async (values) => {
    const { quotasData, quotas } = await saveUserAndReserveQuotas(values, raffle.id, selectedNumbers);

    if (quotas.status === 409) {
      setSelectedNumbers(quotasData.numbers)
      setOpenUserForm(false)
      return;
    }

    setSelectedNumbers(quotasData.numbers)
  }

  return (
    <>
      <Head>
        <title>{raffle.name}</title>
      </Head>
      {
        quotas.length === 0  ?
        <LoadingCircle /> :
        <Stack spacing={4}>
          <HomeButton />
          <RafflePageCard raffle={raffle} />
          <RaffleCart selectedNumbers={selectedNumbers} raffle={raffle} handleBuy={handleBuyClick} totalPrice={totalPrice}/>
          <QuotasGrid quotas={quotas} selectedNumbers={selectedNumbers} handleNumberClick={handleNumberClick} />
        </Stack>
      }

      {
        openUserForm &&
        <CheckoutDialog
          open={openUserForm}
          setOpen={setOpenUserForm}
          selectedNumbers={selectedNumbers}
          raffle={raffle}
          UserForm={UserForm}
          handleBuy={handleBuy}
          isReservingQuotas={isReservingQuotas}
          setIsReservingQuotas={setIsReservingQuotas}
          setSelectedNumbers={setSelectedNumbers}
          totalPrice={totalPrice}
        />
      }
    </>
  )
}
