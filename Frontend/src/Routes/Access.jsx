import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Routes/Access.css";
function Access() {
  const navigate = useNavigate();

  const [dataToAccess, setDataToAccess] = useState({
    Action: "SignIn",
    Username: "",
    Password: "",
  });

  // Função para lidar com as alterações nos campos de entrada.
  const handleChange = (e) => {
    setDataToAccess({
      ...dataToAccess,
      [e.target.name]: e.target.value,
    });
  };

  // Função para lidar com o envio do formulário.
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify(dataToAccess),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        if (data === "Erro interno do servidor") {
          alert("Erro interno do servidor");
        } else if (data === "Usuário não encontrado") {
          alert("Usuário não encontrado");
        } else if (data === "Autenticação bem-sucedida") {
          sessionStorage.setItem(
            "logged",
            JSON.stringify({
              userLogged: dataToAccess.Username,
              messageFor: "",
            })
          );
          navigate("/home");
        } else if (data === "Autenticação falhou") {
          alert("Senha incorreta");
        } else {
          alert("Autenticação falhou");
        }
      })
      .catch((err) => {
        console.error("Erro na solicitação:", err);
      });
  };

  // Renderiza o componente
  return (
    <>
      <section>
        {/* Imagem de fundo */}
        <img
          src="https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
          alt="Photo Background"
        />

        {/* Formulário de acesso */}
        <form onSubmit={handleSubmit}>
          <h3>Welcome</h3>
          {/* Campo de entrada para o nome de usuário */}
          <input
            type="text"
            name="Username"
            value={dataToAccess.Username}
            onChange={handleChange}
            className="input_form_signin"
            id="username"
            placeholder="Username"
            autoComplete="none"
            required
          />
          {/* Campo de entrada para a senha */}
          <input
            type="password"
            name="Password"
            value={dataToAccess.Password}
            onChange={handleChange}
            className="input_form_signin"
            id="password"
            placeholder="Password"
            autoComplete="none"
            required
          />
          <div>
            {/* Botão para fazer login */}
            <button className="button_form" type="submit">
              Sign In
            </button>
            {/* Link para a página de registro */}
            <Link to="/signup">
              <button className="button_form">Sign Up</button>
            </Link>
          </div>
        </form>
      </section>
    </>
  );
}

export default Access;
