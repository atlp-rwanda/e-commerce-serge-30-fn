export const useToken = () => {
  const token = localStorage.getItem('token')!;
  const user = localStorage.getItem('user')!;
  return { token, user };
};
