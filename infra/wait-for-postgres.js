const { exec } = require("node:child_process");

function checkPostgres() {
  exec(
    "docker exec postgres-dev pg_isready --host localhost",
    (error, stdout) => {
      if (stdout && stdout.includes("accepting connections")) {
        process.stdout.write("\n 🟢 Postgres pronto, aceitando conexões \n");
      } else {
        process.stdout.write(".");
        setTimeout(checkPostgres, 500);
      }
    },
  );
}

process.stdout.write("\n\n 🟡 Esperando o Postgres aceitar conexões ");
checkPostgres();
