import * as React from 'react';
import Link from 'next/link'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import { Box, Stack } from '@mui/material';
import { IconAndType } from './commons/IconAndType';

export default function MediaCard({ raffleData }) {
  const {
    id,
    name,
    description,
    raffleDate,
    ticketPrice,
    availableTickets,
    reservedTickets,
    boughtTickets,
    totalTickets
  } = raffleData;

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box sx={{ height: 300, width: '100%', position: 'relative' }}>
        <Image
          src='/images/sorteio1.jpg'
          layout='fill'
          objectFit='contain'
          alt={name}
        />
      </Box>
      <CardContent>
        <Stack spacing={2}>
          <Typography variant="h5">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Stack spacing={1.5}>          
            <IconAndType icon={CalendarTodayIcon}>
              {raffleDate.toLocaleString('pt-BR')}
            </IconAndType>
            <IconAndType icon={PaidOutlinedIcon}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(ticketPrice)}
            </IconAndType>
            <IconAndType icon={CheckBoxOutlinedIcon}>
              {`${availableTickets}/${totalTickets} cotas disponíveis`}
            </IconAndType>
          </Stack>
        </Stack>
      </CardContent>
      <CardActions>
        <Link href={`/rifas/${id}`} passHref>
          <Button variant="contained" fullWidth>Cotas</Button>
        </Link>
      </CardActions>
    </Card>
  );
}
