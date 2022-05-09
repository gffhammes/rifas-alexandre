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
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { Box, Grid, Stack } from '@mui/material';
import { IconAndType } from '../commons/IconAndType';
import { currencyBRLMask } from '../../helpers/utils';

export default function RaffleCard({ raffleData }) {
  const {
    id,
    image,
    name,
    description,
    raffleDate,
    prices,
    prize,
    totalQuotas,
  } = raffleData;

  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: { xs: 'column', sm: 'row' } }}>
      <Box sx={{ height: 282, width: { xs: '100%', sm: 700, md: 1000 }, position: 'relative' }}>
        <Image
          src={`/images/${image}`}
          layout='fill'
          objectFit='contain'
          alt={name}
        />
      </Box>
      <Stack spacing={4} sx={{ width: '100%', padding: 2 }}>
        <Stack spacing={2}>
          <Typography variant="h5">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Box>
            <Grid container spacing={1.5}>
              <Grid item xs={12}>
                <IconAndType icon={EmojiEventsIcon}>
                  {prize}
                </IconAndType>              
              </Grid>
              <Grid item xs={12}>
                <IconAndType icon={PaidOutlinedIcon}>
                  {prices}
                </IconAndType>              
              </Grid>
              <Grid item xs={12}>
                <IconAndType icon={CheckBoxOutlinedIcon}>
                  {`${totalQuotas.available}/${totalQuotas.total} cotas disponíveis`}
                </IconAndType>              
              </Grid>
            </Grid>
          </Box>
        </Stack>
        <Link href={`/rifas/${id}`} passHref>
          <Button variant="contained" sx={{ width: 'fit-content' }} >Cotas</Button>
        </Link>
      </Stack>
    </Card>
  );
}
