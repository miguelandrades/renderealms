import retry from "async-retry";

const waitForAllServices = async () => {
  const fetchStatusPage = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/status");

      if (!response.ok) {
        throw new Error(`Servidor respondeu com status ${response.status}`);
      }

      try {
        const responseBody = await response.json();
        return responseBody;
      } catch (error) {
        throw new Error("Resposta não é um JSON válido");
      }
    } catch (error) {
      throw new Error(`Erro na requisição: ${error.message}`);
    }
  };

  const waitForWebServer = async () => {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
      onRetry: (error, attempt) => {
        console.log(`Tentativa ${attempt} falhou: ${error.message}`);
      },
    });
  };

  await waitForWebServer();
};

export default {
  waitForAllServices,
};
