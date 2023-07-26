const Database = require("./Database/Database.js");
const DB_Users = require("./Database/DB_Users.js");
const DB_Friends = require("./Database/DB_Friends.js");
const DB_Messages = require("./Database/DB_Messages.js");
const bcrypt = require("bcrypt");
const http = require("http");

// Criação das tabelas do banco de dados.
DB_Users.createTableUsers.run();
DB_Friends.createTableFriends.run();
DB_Messages.createTableMessages.run();

// Criação do servidor HTTP

const server = http.createServer((req, res) => {
  // Configuração dos cabeçalhos CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      const parsedBody = JSON.parse(body);

      if (parsedBody.Action === "SignUp") {
        // Se a ação for "SignUp" significa que é uma requesição para cadastrar um novo usuário.
        const saltRounds = 10;
        bcrypt.hash(parsedBody.Password, saltRounds, function (err, hash) {
          if (err) {
            console.error("Erro ao gerar hash da senha:", err);
          } else {
            Database.get(
              `SELECT * FROM Users WHERE Username = ?`,
              [parsedBody.Username],
              (err, row) => {
                if (err) {
                  console.error("Erro ao consultar usuário:", err);
                  res.statusCode = 500;
                  res.end("Erro interno do servidor");
                } else if (row) {
                  res.statusCode = 400;
                  res.end("O nome do usuário ja esta em uso");
                } else {
                  DB_Users.createUser.run(
                    parsedBody.Username,
                    parsedBody.Email,
                    parsedBody.Number,
                    hash,
                    parsedBody.IsLogged
                  );
                  console.log("Dados do usuário criados com sucesso.");
                  res.statusCode = 200;
                  res.end("Dados do usuário criados com sucesso.");
                }
              }
            );
          }
        });
      } else if (parsedBody.Action === "SignIn") {
        // Se a ação for "SignIn" significa que é uma requesição para autenticar o usuário.
        DB_Users.signIn(parsedBody, res);
      } else if (parsedBody.Action === "SignOut") {
        // Se a ação for "SignOut" significa que é uma requesição para fazer logOut.
        DB_Users.signOut(parsedBody, res);
      } else if (parsedBody.Action === "AddFriends") {
        // Se a ação for "AddFriends" significa que é uma requesição para adicionar amigos
        DB_Friends.addFriends(parsedBody, res);
      } else if (parsedBody.Action === "searchFriends") {
        // Se a ação for "searchFriends" significa que é uma requesição para buscar amigos.
        DB_Friends.searchFriends(parsedBody, res);
      } else if (parsedBody.Action === "SendMessages") {
        // Se a ação for "SendMessages" significa que é uma requesição para enviar mensagem
        DB_Messages.insertMessages.run(
          parsedBody.WhoSend,
          parsedBody.WhoReceive,
          parsedBody.Message
        );
        res.end("Mensagem adicionada ao banco de dados");
      } else if (parsedBody.Action === "GetMessages") {
        // Se a ação for "GetMessages" significa que é uma requesição para obter mensagens.
        DB_Messages.searchMessages(parsedBody, res);
      }
    });
  } else if (req.method === "GET" && req.url === "/islogged") {
    // Se a requesição for do tipo GET e a url for "/islogged", significa que é uma requesição para verificar se o usuario está logado.
    DB_Users.isLogged(res);
  } else {
    // Se não for uma requesição POST e nem a verificação de status de login, significa que é uma requesição GET para obter todos os usuários.
    DB_Users.searchUsers((result) => {
      res.write(JSON.stringify(result));
      res.end();
    });
  }
});

const port = 3000;
server.listen(port);
console.log(`Servidor escutando no porto ${port}`);