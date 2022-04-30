import React, { Component } from 'react';  
import exportFromJSON from 'export-from-json'  
import { Button } from '@mui/material'
  
const exportType = 'xls'  
  
export const Export = ({ data, fileName }) => {  
  data = data?.map((item) => {
    const { number, status, ownerName, ownerEmail } = item;
    return { number, status, ownerName, ownerEmail }
  })
  
  const ExportToExcel = () => {  
    exportFromJSON({ data, fileName, exportType })  
  }  
  
  return (  
    <Button variant='contained' onClick={ExportToExcel}>Exportar para Excel</Button>  
  )
}  