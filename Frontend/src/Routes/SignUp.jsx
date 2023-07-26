import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Routes/SignUp.css";

function SignUp() {
  const navigate = useNavigate();

  // Estado para armazenar os dados do formulário.
  const [dataToCreateUser, setDataToCreateUser] = useState({
    Action: "SignUp",
    Username: "",
    Email: "",
    Number: "",
    Password: "",
    IsLogged: "false",
  });

  // Manipulador de alterações nos campos do formulário.
  const handleChange = (e) => {
    setDataToCreateUser({
      ...dataToCreateUser,
      [e.target.name]: e.target.value,
    });
  };

  // Manipulador de envio de formulário.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataToCreateUser)
    // Fazer uma solicitação POST para criar um novo usuário.
    fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify(dataToCreateUser),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        // Alerta com a resposta do servidor.
        alert(data);

        // Se a criação dos dados for bem sucedida, redireciona para a página inicial.
        if (data === "Dados do usuário criados com sucesso.") {
          navigate("/");
        }
      });
  };

  return (
    <section>
      {/* Imagem de fundo */}
      <img
        src="https://images.unsplash.com/photo-1608501078713-8e445a709b39?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8fDA%3D&w=1000&q=80"
        alt="Photo Background"
      />
      {/* Formulário de acesso */}
      <form className="form_signup" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        {/* Campo de nome de usuário */}
        <input
          onChange={handleChange}
          type="text"
          name="Username"
          className="input_form_signup"
          placeholder="Username"
          autoComplete="none"
          required
        />
        {/* Campo de email */}
        <input
          onChange={handleChange}
          type="text"
          name="Email"
          className="input_form_signup"
          placeholder="E-mail"
          autoComplete="none"
          required
        />
        {/* Campo de número de telefone */}
        <input
          onChange={handleChange}
          type="number"
          name="Number"
          className="input_form_signup"
          placeholder="Number mobile"
          autoComplete="none"
          required
        />
        {/* Campo de senha */}
        <input
          onChange={handleChange}
          type="text"
          name="Password"
          className="input_form_signup"
          placeholder="Password"
          autoComplete="none"
          required
        />
        {/* Botão de registro */}
        <button type="submit">Register</button>
        {/* Link para voltar */}
        <Link to="/">
          <button>Go Back</button>
        </Link>
      </form>
    </section>
  );
}

export default SignUp;
