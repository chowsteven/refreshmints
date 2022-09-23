export const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();

  // TODO: improve error handling
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
};
