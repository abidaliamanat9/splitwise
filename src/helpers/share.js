const handleInputChange = (e, setFormdata) => {
  const { name, value } = e.target;
  setFormdata((prevdata) => ({
    ...prevdata,
    [name]: value,
  }));
};

export { handleInputChange };
