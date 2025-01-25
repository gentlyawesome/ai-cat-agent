export async function fetchBreeds() {
  const res = await fetch("https://api.thecatapi.com/v1/breeds", {
    headers: {
      "x-api-key": import.meta.env.VITE_CATAPI,
    },
  });
  return res.json();
}
