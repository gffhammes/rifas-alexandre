

export const getRaffleById = async (id) => {
  const response = await fetch(`/api/raffles/${id}`, {
    method: 'GET',
  });

  return response;
}