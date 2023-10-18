const status = (request, response) => {
  response.status(200).json({ chave: "Oi sou uma API" });
};

export default status;
