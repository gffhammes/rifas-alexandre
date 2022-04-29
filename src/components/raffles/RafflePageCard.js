import { Box, Card, CardContent, Stack, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import { IconAndType } from '../commons/IconAndType'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { currencyBRLMask } from '../../helpers/utils';

export const RafflePageCard = ({ raffle }) => {
  return (
    <Card sx={{ height: 'fit-content' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} sx={{ height: '100%' }}>
        <Box
          sx={{
            height: {
              xs: 270,
              md: 270,
            },
            width: {
              xs: '100%',
              md: 700,
            },
            position: 'relative'
          }}
        >
          <Image
            src={`/images/${raffle.image}`}
            layout='fill'
            objectFit='contain'
            alt={raffle.name}
          />
        </Box>
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="h5">
              {raffle.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {raffle.description}
            </Typography>
            <Stack spacing={1.5}>
              <IconAndType icon={PaidOutlinedIcon}>
                {raffle.prices}
              </IconAndType>
              <IconAndType icon={CheckBoxOutlinedIcon}>
                {`${raffle.totalQuotas.available}/${raffle.totalQuotas.total} cotas disponíveis`}
              </IconAndType>
            </Stack>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  )
}
