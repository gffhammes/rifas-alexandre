import { Box, Button, Container, Stack, Typography } from '@mui/material';
import Head from 'next/head';
import React, { useState } from 'react'
import { getQuotasStats } from '../../helpers/getQuotasStats';
import { currencyBRLMask } from '../../helpers/utils';
import FormDialog from '../commons/UserForm/UserForm';
import { QuotasGrid } from '../quotas/QuotasGrid';
import { RaffleCart } from './RaffleCart';
import { RafflePageCard } from './RafflePageCard';

async function saveUser(user) {
  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
}

async function reserveQuotas(userId, raffleId, quotas) {
  console.log(userId, raffleId, quotas)

  const myObj = {
    numbers: quotas,
    raffleId: raffleId,
    ownerId: userId,
  }

  const response = await fetch(`/api/raffles/${raffleId}/quotas`, {
    method: 'PUT',
    body: JSON.stringify(myObj),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json;
}

export const RafflePage = ({ raffle, quotas }) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [openUserForm, setOpenUserForm] = useState(false);

  raffle = getQuotasStats(quotas, raffle);

  const handleNumberClick = (number) => {
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(current => current.filter(selectedNumber => selectedNumber !== number));
    } else {
      setSelectedNumbers(current => [...current, number]);
    }
  }

  const handleBuy = () => {
    setOpenUserForm(true)
  }

  return (
    <>
      <Head>
        <title>{raffle.name}</title>
      </Head>
      <Container>
        <Stack spacing={4}>
          <RafflePageCard raffle={raffle} />
          <RaffleCart selectedNumbers={selectedNumbers} raffle={raffle} handleBuy={handleBuy}/>
          <QuotasGrid quotas={quotas} selectedNumbers={selectedNumbers} handleNumberClick={handleNumberClick} />
        </Stack>
      </Container>

      {openUserForm &&
      <FormDialog
        open={openUserForm}
        setOpen={setOpenUserForm}
        saveUser={saveUser}
        raffleId={raffle.id}
        reserveQuotas={reserveQuotas}
        selectedQuotas={selectedNumbers}
      />}
    </>
  )
}
