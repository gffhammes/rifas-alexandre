import { TextField } from '@mui/material';
import { useField } from 'formik';
import React, { useCallback } from 'react'
import NumberFormat from 'react-number-format';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      allowNegative={false}
      thousandSeparator='.'
      decimalSeparator=','
      isNumericString
      prefix="R$ "
      decimalScale={2}
      fixedDecimalScale={2}
    />
  );
});

export const CurrencyInput = ({ label, name, ...props }) => {  
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
      label={label}      
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      error={Boolean(meta.touched) && Boolean(meta.error)}
			helperText={getHelperText()}
      {...field}
      {...props}
    />
  )
}
