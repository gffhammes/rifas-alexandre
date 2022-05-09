export const getRaffleById = async (id) => {
  const response = await fetch(`/api/raffles/${id}`, {
    method: 'GET',
  });

  return response;
}

export const editRaffleData = async (id, data) => {
  const response = await fetch(`/api/raffles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });

  return response;
}