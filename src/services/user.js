export const getUserById = async (id) => {
  const response = await fetch(`/api/users/${id}`, {
    method: 'GET',
  });

  return await response.json()
}