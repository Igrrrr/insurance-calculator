export const getData = async (url) => {
  try {
    const responce = await fetch(url);
    return responce.json();
  } catch (error) {
    throw error;
  }
};
