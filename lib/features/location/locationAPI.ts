// A mock function to mimic making an async request for data
export const fetchLocation = async (amount = 1) => {
  const response = await fetch("http://localhost:3000/api/location", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  const result: { data: number } = await response.json();

  return result;
};
