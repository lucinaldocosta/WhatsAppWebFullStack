const Database = require("./Database");

// Cria uma Tabela chamada "Messages" se ela ainda não existe no banco de dados.
const createTableMessages = Database.prepare(
  `CREATE TABLE IF NOT EXISTS Messages(
        MessageID INTEGER PRIMARY KEY AUTOINCREMENT,
        WhoSend TEXT NOT NULL,
        WhoReceive TEXT NOT NULL,
        Message TEXT NOT NULL
    )`,
  (err) => {
    if (err) {
      console.error("Erro ao criar tabela `Message`:", err);
    } else {
      console.log("Tabela `Messages` criada com sucesso");
    }
  }
);

// Realiza uma consulta para buscar todas as mensagens entre dois usuários.
const searchMessages = (parsedBody, res) => {
  Database.all(
    `SELECT * FROM Messages WHERE WhoSend = ? AND WhoReceive = ? UNION SELECT * FROM Messages WHERE WhoSend = ? AND WhoReceive = ?`,
    [
      parsedBody.WhoSend,
      parsedBody.WhoReceive,
      parsedBody.WhoReceive,
      parsedBody.WhoSend,
    ],
    (err, rows) => {
      if (err) {
        console.error("Error ao buscar Mensagens na tabela `Messages` :", err);
      } else {
        // Define o cabeçalho da resposta como JSON e envia as mensagens como resposta.
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify(rows));
      }
    }
  );
};
// Insere uma mensagem no banco de dados.
const insertMessages = Database.prepare(
  `INSERT INTO Messages (WhoSend, WhoReceive, Message)
    VALUES (?, ?, ?)`,
  (err) => {
    if (err) {
      console.error("Erro ao inserir dados na tabela `Messages`:", err);
    } else {
      console.log("Dados inserido com sucesso na tabela `Messages`.");
    }
  }
);

module.exports = {
  createTableMessages,
  searchMessages,
  insertMessages,
};
