import { TextField } from '@mui/material'
import React from 'react'

export const Input = (props) => {
  const {name, label, type, required} = props;
  return (
    <TextField
      {...props}
      name={name}
      id={name}
      label={label}
      type={type}
      required={required || false}
    />
  )
}
