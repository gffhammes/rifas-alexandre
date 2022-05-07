import { Box, Button, Container, Stack, Typography } from '@mui/material'
import Head from 'next/head';
import Script from 'next/script';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react'
import { getRaffleById } from '../../services/raffle';
import { LoadingCircle } from '../commons/LoadingCircle';
import EditRaffleDialog from '../raffles/EditRaffleDialog';
import { AlertDialog } from './AdminConfirmClearDialog';
import { AdminDataGrid } from './AdminDataGrid';
import { Export } from './Export';

export const AdminPage = ({ id }) => {
  const [raffle, setRaffle] = useState(null)
  const [openAlert, setOpenAlert] = React.useState(false);
  const [openRaffleDialog, setOpenRaffleDialog] = React.useState(false);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [selectedNumbers, setSelectedNumbers] = React.useState([])
	const { enqueueSnackbar } = useSnackbar();

  const getRaffleData = async () => {
    const response = await fetch(`/api/raffles/${id}`, {
      method: 'GET',
    });

    setRaffle(await response.json())
  }

  useEffect(() => {
    getRaffleData()
  }, [])

  useEffect(() => {
    raffle?.quotas.length === 0 && getRaffleData()
  }, [raffle])

  const handleOpenAlert = () => {
    setOpenAlert(true);
  };

  const handleClose = () => {
    setOpenAlert(false);
  };

  const handleOpenRaffleDialog = async () => {
    setOpenRaffleDialog(true);
  };

  const handleCloseRaffleDialog = () => {
    setOpenRaffleDialog(false);
  };
  const handleSelectedRowsChange = (selected) => {
    setSelectedRows(selected)
    setSelectedNumbers(selected.map(row => raffle?.quotas.find(quota => quota.id === row).number))
  }

  const handleClearQuotas = async () => {    
    try {
      await fetch(`/api/raffles/${id}/quotas`, {
        method: 'PUT',
        body: JSON.stringify({ quotasToDelete: selectedRows, raffleId: id }),
      }).then(res => console.log(res.json()));
      setSelectedRows([]);
      setSelectedNumbers([]);
      getQuotasData();
      enqueueSnackbar(`Cotas limpas com sucesso!`, { variant: 'success' })
    } catch (err) {
      enqueueSnackbar(err.description, { variant: 'error' })
    }    

    setOpenAlert(false);
  }

  const getRows = () => {
    const newRows = raffle?.quotas.map((quota) => {
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
      return { ...quota, ownerName: quota.owner?.name || '-', ownerEmail: quota.owner?.email || '-' }
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
          <Button onClick={handleOpenRaffleDialog}>Editar rifa</Button>
          <Export data={getRows()}/>
        </Stack>
        {raffle?.quotas.length > 0 ? <AdminDataGrid rows={getRows()} selectedRows={selectedRows} handleSelectedRowsChange={handleSelectedRowsChange} /> : <LoadingCircle />}
      </Stack>
      <EditRaffleDialog open={openRaffleDialog} handleClose={handleCloseRaffleDialog} raffleData={raffle}/>
      <AlertDialog openAlert={openAlert} handleClose={handleClose} handleClearQuotas={handleClearQuotas} selectedNumbers={selectedNumbers}/>
    </>
  )
}
