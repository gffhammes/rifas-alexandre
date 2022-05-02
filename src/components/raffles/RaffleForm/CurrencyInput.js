import { TextField } from '@mui/material';
import React from 'react'
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
      fixedDecimalScale={true}
    />
  );
});

export const CurrencyInput = ({ label, value, handleChange }) => {
  return (
    <TextField
      label={label}
      value={value}
      onChange={handleChange}
      variant="outlined"
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
    />
  )
}
