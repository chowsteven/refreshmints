export const fetchOptions = {
  method: 'GET',
  headers: {
    accept: '*/*',
    'x-api-key': `${process.env.RESERVOIR_API_KEY}`,
  },
};
