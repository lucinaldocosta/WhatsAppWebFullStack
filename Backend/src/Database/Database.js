const sqlite = require("sqlite3").verbose();

// Cria uma instância do objeto Database e establece a conexão com o arquivo "DB_chat_V1"

const db = new sqlite.Database("DB_chat_V1.db", (err)=>{
    if(err){
        // Em caso de erro, exibe o error no console.
        console.error(err);
    }else{
        // Se a conexão for estabelecido com sucesso, exibe uma mensagem de confirmação.
        console.log("Conexão estabelecida com sucesso");
    }
});
// Exporta o objeto de conexão para que possa ser utilizado em outros módulos do aplicativo.
module.exports = db;