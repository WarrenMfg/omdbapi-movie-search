const setLocalStorage = (key: string, data: any) => {
  try {
    console.log(key);
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(error);
    // POST error to logging service
  }
};

export default setLocalStorage;
