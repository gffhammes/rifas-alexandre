export const getQuotasStats = (quotas, raffle) => {
  const totalQuotas = quotas.reduce(
    (accumulator, quota) => {
      if (quota.raffleId === raffle.id) {
        if (quota.status === 'available') {
          return ({
            ...accumulator,
            available: accumulator.available + 1,
          })
        } else {
          return ({
            ...accumulator,
            unavailable: accumulator.unavailable + 1,
          })
        }
      }

      return accumulator;
    },
    {
      available: 0,
      unavailable: 0,
    }
  );

  totalQuotas = { ...totalQuotas, total: totalQuotas.available + totalQuotas.unavailable }

  return { ...raffle, totalQuotas };
}
