const API_URL = "https://69845033885008c00db0b870.mockapi.io/api/cars/cars";

export const getAllCars = async () => {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch cars");
  return await response.json();
};

export const getCarById = async (id) => {
  const res = await fetch(
    `https://69845033885008c00db0b870.mockapi.io/api/cars/cars/${id}`,
  );
  if (!res.ok) throw new Error("Failed to fetch car");
  return res.json();
};

export const getCars = async () => {
  const res = await fetch(
    "https://69845033885008c00db0b870.mockapi.io/api/cars/cars",
  );
  if (!res.ok) throw new Error("Failed to fetch cars");
  return res.json();
};
