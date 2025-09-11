import retry from "async-retry";

const waitForAllServices = async () => {
  const fetchStatusPage = async () => {
    const response = await fetch("http://localhost:3000/api/v1/migrations");

    if (!response.ok) {
      throw new error(`Servidor não disponível: ${response.status}`);
    }

    let responseBody;
    try {
      responseBody = await response.json();
    } catch (error) {
      throw new error("Respposta Não é um JSON Válido");
    }
  };

  const waitForWebServer = async () => {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });
  };

  await waitForWebServer();
};

export default {
  waitForAllServices,
};
