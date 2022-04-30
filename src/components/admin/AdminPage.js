import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Head from 'next/head';
import Script from 'next/script';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { LoadingCircle } from '../commons/LoadingCircle';
import { AlertDialog } from './AdminConfirmClearDialog';
import { AdminDataGrid } from './AdminDataGrid';
import { Export } from './Export';

export const AdminPage = ({ id }) => {
  const [quotas, setQuotas] = useState(null)
  const [users, setUsers] = useState(null)
  const [openAlert, setOpenAlert] = React.useState(false);
	const { enqueueSnackbar } = useSnackbar();

  const getQuotasData = async () => {
    const response = await fetch(`/api/raffles/${id}/quotas`, {
      method: 'GET',
    });

    setQuotas(await response.json())
  }

  const getUsers = async () => {
    const response = await fetch(`/api/users`, {
      method: 'GET',
    });

    setUsers(await response.json())
  }

  useEffect(() => {
    getQuotasData()
    getUsers()
  }, [])

  useEffect(() => {
    quotas?.length === 0 && getQuotasData()
  }, [quotas])  

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  const handleClearQuotas = async () => {    
    try {
      await fetch(`/api/raffles/${id}/quotas`, {
        method: 'PUT',
        body: JSON.stringify({ clearAll: true, raffleId: id }),
      });
      getQuotasData();
      enqueueSnackbar(`Cotas limpas com sucesso!`, { variant: 'success' })
    } catch (err) {
      enqueueSnackbar(err.description, { variant: 'error' })
    }    

    setOpenAlert(false);
  }

  const getRows = () => {
    const newRows = quotas?.map((quota) => {
      const owner = users?.filter((user => user.id === quota.ownerId))[0]

      switch (quota.status) {
        case 'available':
          quota.status = 'Disponível'
          break;
        case 'reserved':
          quota.status = 'Reservada'
          break;
        case 'bought':
          quota.status = 'Comprada'
          break;
      }

      return { ...quota, ownerName: owner?.name || '-', ownerEmail: owner?.email || '-' }
    })

    return newRows
  }

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Stack spacing={4} sx={{ height: '100%', overflowY: 'hidden' }}>
        <Stack>
          <Typography variant='h1'>Admin</Typography>
        </Stack>
        <Stack direction='row' justifyContent='flex-end' spacing={2}>
          <Button onClick={handleOpenAlert}>Limpar cotas</Button>
          <Export data={getRows()}/>
        </Stack>
        {quotas?.length > 0 ? <AdminDataGrid rows={getRows()} /> : <LoadingCircle />}
      </Stack>
      <AlertDialog openAlert={openAlert} handleClose={handleClose} handleClearQuotas={handleClearQuotas}/>
    </>
  )
}
