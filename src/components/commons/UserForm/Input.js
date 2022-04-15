import { TextField } from '@mui/material'
import { useField } from 'formik';
import React, { useCallback } from 'react'

export const Input = (props) => {
  const { name, label, type, required } = props;
  
  const [field, meta, helpers] = useField(name);

	const getHelperText = useCallback(() => {
		if (Boolean(meta.touched) && Boolean(meta.error)) {
			return meta.error;
		}

		if (props.helperText) {
			return props.helperText;
		}
	}, [meta.error, meta.touched, props.helperText]);


  return (
    <TextField
      {...props}
      name={name}
      id={name}
      label={label}
      type={type}
      required={required || false}
      value={field.value}
      onChange={field.onChange}
      error={Boolean(meta.touched) && Boolean(meta.error)}
			helperText={getHelperText()}
    />
  )
}
