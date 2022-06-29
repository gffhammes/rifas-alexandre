import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import RafflePage from '../../src/containers/RafflePage';
import { getPricesString } from '../../src/helpers/raffleHelper.js';

const Raffle = () => {


  // const modifiedRaffle = {
  //   ...raffle,
  //   cumulativeDiscount: JSON.parse(raffle.cumulativeDiscount),
  // }

  return (
    <RafflePage />    
  )
}

export default Raffle