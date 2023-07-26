const Database = require("./Database");

const createTableFriends = Database.prepare(
  `CREATE TABLE IF NOT EXISTS Friends (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        FriendName TEXT NOT NULL,
        FriendAddedBy TEXT NOT NULL
    )`,
  (err) => {
    if (err) {
      console.error("Erro ao criar tabela `Friends`:", err);
    } else {
      console.log("Tabela `Friends` criada com sucesso.");
    }
  }
);

const insertFriend = Database.prepare(
  `INSERT INTO Friends (FriendName, FriendAddedBy)
VALUES (?, ?)`,
  (err) => {
    if (err) {
      console.error("Erro ao inserir dados na tabela `Friends`:", err);
    } else {
      console.log("Dados inseridos com sucesso na tabela `Friends`.");
    }
  }
);

// Realiza uma consulta para buscar todos os amigos adicionados
const searchFriends = (parsedBody, res) => {
  Database.all(
    "SELECT * FROM Friends WHERE FriendAddedBy = ?",
    parsedBody.FriendAddedBy,
    (err, rows) => {
      if (err) {
        console.error("Erro ao buscar amigos na tabela `Friends`:", err);
        // Envia uma resposta indicando o erro ao cliente.
        res.end("Erro ao buscar amigos.");
      } else {
        res.setHeader("Content-Type", "application/json");
        // Envia a resposta com os amigos encontrados em formato JSON ao cliente.
        res.end(JSON.stringify(rows));
      }
    }
  );
};

// Realiza uma consulta para adicionar amigos
const addFriends = (parsedBody, res) => {
  Database.get(
    `SELECT Username FROM Users WHERE Username = ?`,
    parsedBody.FriendName,
    (err, row) => {
      if (err) {
        console.error("Erro ao verificar se o usuário existe:", err);
      } else if (!row) {
        res.end("Este usuário não existe");
      } else {
        console.log("Este usuário existe.");
        Database.get(
          `SELECT * FROM Friends WHERE FriendName = ? AND FriendAddedBy = ?`,
          [parsedBody.FriendName, parsedBody.FriendAddedBy],
          (err, row) => {
            if (err) {
              console.error(
                "Erro ao buscar um amigo na tabela `Friends`:",
                err
              );
              res.end("Erro ao buscar amigo.");
            } else if (!row) {
              console.log("O usuário não existe na linha de contatos.");
              //   Se nao encontra o amigo ele adiciona.
              insertFriend.run(parsedBody.FriendName, parsedBody.FriendAddedBy);
              res.end("Usuário adicionado com sucesso.");
            } else {
              console.log("O usuário já existe na lista de contatos.");
              res.end("Este usuário já é seu amigo.");
            }
          }
        );
      }
    }
  );
};

module.exports = {
    createTableFriends,
    insertFriend,
    searchFriends,
    addFriends
}