import useSWR from "swr";

const fetchAPI = async (key) => {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
};

const StatusPage = () => {
  return (
    <>
      <h1>Status</h1>
      <DatabaseStatus />
    </>
  );
};

const DatabaseStatus = () => {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });

  let updatedAt = "Carregando...";
  let maxConnections = "Carregando...";
  let databaseVersion = "Carregando...";
  let openConnections = "Carregando...";

  if (!isLoading && data) {
    updatedAt = new Date(data.updated_at).toLocaleString("pt-BR");
    maxConnections = data.dependencies.database.max_connections;
    databaseVersion = data.dependencies.database.version;
    openConnections = data.dependencies.database.open_connections;
  }

  return (
    <>
      <ul>
        <li>Ultima atualização: {updatedAt}</li>
        <li>Database</li>
        <ul>
          <li>Versão: {databaseVersion}</li>
          <li>Máximo de conexões: {maxConnections}</li>
          <li>Conexões abertas: {openConnections}</li>
        </ul>
      </ul>
    </>
  );
};

export default StatusPage;
