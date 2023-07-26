const Database = require("./Database");
const bcrypt = require("bcrypt");

// Criação da tabela Users no banco de dados, se ela ainda não existir.
const createTableUsers = Database.prepare(
  // Consulta SQL para criar a tabela.
  `CREATE TABLE IF NOT EXISTS Users(
        UserID INTEGER PRIMARY KEY AUTOINCREMENT,
        Username TEXT NOT NULL,
        Email TEXT NOT NULL,
        Number INTEGER NOT NULL,
        Password_hash TEXT NOT NULL,
        IsLogged TEXT NOT NULL
    )`,
  (err) => {
    if (err) {
      console.error("Erro ao criar a tabela;", err);
    } else {
      console.log("Tabela de usuários criada com sucesso");
    }
  }
);

// Preparação da consulta para inserir um novo usuário na tabela.
const createUser = Database.prepare(
  `INSERT INTO Users (Username, Email, Number, Password_hash, IsLogged)
    VALUES (?, ?, ?, ?, ?)`,
  (err) => {
    if (err) {
      console.error("Erro ao inserir dados do usuário", err);
    } else {
      console.log("Dados do usuário inserido com sucesso.");
    }
  }
);

// Função para pesquisar todos os usuários no banco de dados e retornar o resultado através de um callback.
const searchUsers = (callback) => {
  Database.all("SELECT * FROM Users", (err, rows) => {
    if (err) {
      console.error("Erro ao pesquisar usuários: ", err);
    } else {
      callback(rows);
    }
  });
};

// Função para autenticar o usuário com base no nome de usuário e senha fornecidos.
const signIn = (parsedBody, res) => {
  Database.get(
    `SELECT * FROM Users WHERE Username = ?`,
    [parsedBody.Username],
    (err, row) => {
      if (err) {
        console.error("Erro ao autenticar usuário:", err);
        res.statusCode = 500;
        res.end("Erro interno do servidor");
      } else if (!row) {
        console.log("Usuário não encontrado:", parsedBody.Username);
        res.statusCode = 401;
        res.end("Usuário não encontrado.");
      } else {
        bcrypt.compare(
          parsedBody.Password,
          row.Password_hash,
          (err, result) => {
            if (err) {
              console.error("Erro ao comparar senhas:", err);
              res.statusCode = 500;
              res.end("Erro interno do servidor");
            } else if (result) {
              // Se a senha é correta.
              console.log(
                "Senha correta. O usuário esta autenticado:",
                row.Username
              );
              Database.run(
                `UPDATE Users SET IsLogged = "true" WHERE Username = ?`,
                [row.Username],
                (err) => {
                  if (err) {
                    // Mensagem de erro ao atualizar o status de login
                    console.error("Erro ao Atualizar status de login:", err);
                  } else {
                    // Cuando o login foi efetuado com sucesso.
                    console.log("Login efetuado com sucesso:", row.Username);
                  }
                }
              );
              res.statusCode = 200;
              res.end("Autenticação bem-sucedida");
            } else {
              console.log(
                "Senha incorreta. A autenticação falhou:",
                row.Username
              );
              res.statusCode = 401;
              res.end("Autenticação Falhou");
            }
          }
        );
      }
    }
  );
};

// Função para modificar o estado de conexão do usuário para desconectado.
const signOut = (parsedBody) => {
  Database.run(
    `UPDATE Users SET IsLogged = "false" WHERE Username = ?`,
    [parsedBody.Username],
    (err) => {
      if (err) {
        console.error("Erro ao atualizar o status do logout:", err);
      } else {
        console.log("Logout efetuado com sucesso:", parsedBody.Username);
      }
    }
  );
};

// Função para verificar se os usuários estão conectados ou não e retornar o resultado como uma resposta HTTP.
const isLogged = (res) => {
  Database.all(`SELECT IsLogged, Username FROM Users`, (err, rows) => {
    if (err) {
      console.error("Erro ao verificar status de login:", err);
    } else {
      res.write(JSON.stringify(rows));
      res.end();
    }
  });
};

// Exportamos as funções e contantes para uso em outros módulos.
module.exports = {
  createTableUsers,
  createUser,
  searchUsers,
  signIn,
  signOut,
  isLogged,
};
