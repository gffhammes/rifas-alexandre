import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { getQuotasStats } from '../../helpers/getQuotasStats';
import FormDialog from '../commons/UserForm/UserForm';
import { QuotasGrid } from '../quotas/QuotasGrid';
import { RaffleCart } from './RaffleCart';
import { RafflePageCard } from './RafflePageCard';
import LoadingCircle from '../commons/LoadingCircle'

export const RafflePage = ({
  raffle,
  quotas,
  saveUserAndReserveQuotas,
  isReservingQuotas,
  setIsReservingQuotas,
  getQuotas,
}) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [openUserForm, setOpenUserForm] = useState(false);

  useEffect(() => {
    getQuotas(raffle.id)
  }, [])

  if (quotas.length > 0) {
    raffle = getQuotasStats(quotas, raffle);
  }

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
    const reservedQuotas = await saveUserAndReserveQuotas(values, raffle.id, selectedNumbers)
    setSelectedNumbers([])
  }

  return (
    <>
      <Head>
        <title>{raffle.name}</title>
      </Head>
      {
        quotas.length === 0  ?
        <LoadingCircle /> :
        <Container>
          <Stack spacing={4}>
            <RafflePageCard raffle={raffle} />
            <RaffleCart selectedNumbers={selectedNumbers} raffle={raffle} handleBuy={handleBuyClick}/>
            <QuotasGrid quotas={quotas} selectedNumbers={selectedNumbers} handleNumberClick={handleNumberClick} />
          </Stack>
        </Container>
      }

      {openUserForm &&
      <FormDialog
        open={openUserForm}
        setOpen={setOpenUserForm}
        handleBuy={handleBuy}
        isReservingQuotas={isReservingQuotas}
        setIsReservingQuotas={setIsReservingQuotas}
      />}
    </>
  )
}
