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
import CheckoutDialog from './Checkout/CheckoutDialog';
import { getPricesString, getTotalPrice } from '../../helpers/raffleHelper';
import { useRouter } from 'next/router'
import { getUserById } from '../../services/user';

export const RafflePage = ({
  quotas,
  saveUserAndReserveQuotas,
  isReservingQuotas,
  setIsReservingQuotas,
  getRaffleData,
  raffleData,
  sendConfirmationMail,
}) => {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [openUserForm, setOpenUserForm] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  
  const router = useRouter();
  const { id } = router.query;
 
  useEffect(() => {
    id && getRaffleData(id)
  }, [id])

  if (raffleData?.quotas.length > 0) {
    raffleData = getQuotasStats(raffleData.quotas, raffleData);
    raffleData = { ...raffleData, prices: getPricesString(raffleData.ticketPrice, JSON.parse(raffleData.cumulativeDiscount)) }
  }

  useEffect(() => {
    if (!raffleData) return;
    const price = getTotalPrice(raffleData.ticketPrice, JSON.parse(raffleData.cumulativeDiscount), selectedNumbers.length)
    setTotalPrice(price)
  }, [selectedNumbers])

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
    const { quotasData, quotas } = await saveUserAndReserveQuotas(values, raffleData.id, selectedNumbers);

    if (quotas.status === 409) {
      setSelectedNumbers(quotasData.numbers)
      setOpenUserForm(false)
      return;
    }

    getRaffleData(id)
    setSelectedNumbers(quotasData.numbers)
  }

  return (
    <>
      <Head>
        <title>{raffleData?.name}</title>
      </Head>
      {
        !raffleData ?
        <LoadingCircle /> :
        <Stack spacing={4}>
          <HomeButton />
          <RafflePageCard raffle={raffleData} />
          <RaffleCart selectedNumbers={selectedNumbers} raffle={raffleData} handleBuy={handleBuyClick} totalPrice={totalPrice}/>
          <QuotasGrid quotas={raffleData.quotas} selectedNumbers={selectedNumbers} handleNumberClick={handleNumberClick} />
        </Stack>
      }

      {
        openUserForm &&
        <CheckoutDialog
          open={openUserForm}
          setOpen={setOpenUserForm}
          selectedNumbers={selectedNumbers}
          raffle={raffleData}
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
