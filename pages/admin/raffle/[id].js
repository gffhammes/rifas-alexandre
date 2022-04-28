import React from 'react'
import { AdminPage } from '../../../src/components/admin/AdminPage'
import { useRouter } from 'next/router'


const Admin = () => {
  const router = useRouter()
  const { id } = router.query

  return (
    <AdminPage id={id} />
  )
}

export default Admin