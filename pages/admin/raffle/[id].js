import React from 'react'
import { AdminPage } from '../../../src/components/admin/AdminPage'
import { useRouter } from 'next/router'
import { useUser, withPageAuthRequired } from '@auth0/nextjs-auth0'
import Link from 'next/link'
import { Box, Button, Stack, Typography } from '@mui/material'
import Image from 'next/image'
import Head from 'next/head'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

const adminsMails = process.env.ADMINS_MAILS

const Admin = () => {
  const router = useRouter()
  const { id } = router.query
  const { user, error, isLoading } = useUser();

  const admins = adminsMails.split(',')

  const isAdmin = admins.includes(user?.email)
  
  console.log(adminsMails, admins, isAdmin)

  if (isLoading) {
    return <></>
  }

  if (!isAdmin) {
    return (
      <>
        <Head>
          <title>Acesso Negado</title>
        </Head>
      
        <Box sx={{ height: '100%', width: '100%', display: 'flex' }}>        
          <Stack alignItems='center' sx={{ m: 'auto' }} spacing={10}>
            <Box sx={{ position: 'relative', width: '29rem', height: '20rem' }}>
              <Image
                src='/images/undraw_safe_re_kiil.svg'
                alt='Acesso negado'
                layout='fill'
                objectFit='contain'
              />
            </Box>
            <Typography variant='h2'>Acesso negado</Typography>
            <Stack direction='row' spacing={2}>              
              <Link href='/'>
                <a>            
                  <Button startIcon={<KeyboardBackspaceIcon />} variant='contained'>home</Button>
                </a>
              </Link>
              <Link href='/api/auth/logout'>
                <a>            
                  <Button variant='contained'>Logout</Button>
                </a>
              </Link>
            </Stack>
          </Stack>
        </Box>
      </>
    )
  }

  return (
    <AdminPage id={id} />
  )
}

export default Admin

export const getServerSideProps = withPageAuthRequired();