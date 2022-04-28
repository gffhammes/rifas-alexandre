import { Box, Container, Stack, Typography } from '@mui/material'
import Head from 'next/head';
import React, { useEffect, useState } from 'react'
import { LoadingCircle } from '../commons/LoadingCircle';
import { AdminDataGrid } from './AdminDataGrid';

export const AdminPage = ({ id }) => {
  const [quotas, setQuotas] = useState(null)
  const [users, setUsers] = useState(null)

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

  const getRows = () => {
    const newRows = quotas.map((quota) => {
      const owner = users.filter((user => user.id === quota.ownerId))[0]

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

      return { ...quota, ownerName: owner.name, ownerEmail: owner.email }
    })

    return newRows
  }

  return (
    <>
      <Head>
        <title>Admin</title>
      </Head>
      <Box sx={{ height: '100%', overflowY: 'hidden' }}>
        <Stack spacing={4} sx={{ height: '100%', overflowY: 'hidden' }}>
          <Typography variant='h1'>Admin</Typography>
          {quotas?.length > 0 ? <AdminDataGrid rows={getRows()} /> : <LoadingCircle />}
        </Stack>
      </Box>
    </>
  )
}
