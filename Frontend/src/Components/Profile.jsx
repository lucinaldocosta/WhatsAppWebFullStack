import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Styles/Components/Profile.css";

function Profile() {
  const navigate = useNavigate();

  // Obtém os dados do usuário logado do sessionStorage
  const loggedData = JSON.parse(sessionStorage.getItem("logged"));

  // Estado para armazenar os dados do logout.
  const [logOut, setLogOut] = useState({
    Action: "SignOut",
    IsLogged: "false",
    Username: loggedData.userLogged,
  });

  // Função para lidar com o logout.
  const handleSignOut = () => {
    fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify(logOut),
      headers: { "Content-Type": "application/json" },
    });
    sessionStorage.removeItem("logged");
    navigate("/");
  };

  // Renderiza o componente
  return (
    <section className="section_profile">
      <article className="article_profile">
        {/* Título do perfil */}
        <h3 className="title_profile">Profile</h3>
        {/* Botão de Logout */}
        <button className="button_signout_profile" onClick={handleSignOut}>Sign Out</button>
        {/* Botão para voltar para a página do chat */}
        <Link to="/home">
          <button className="button_goback_profile">Go Back</button>
        </Link>
      </article>
      {/* Conteúdo do perfil */}
      <article className="profile_container">
        {/* Imagem do perfil, é so um explo de como poderia fica ok */}
        <img
          src="https://img.freepik.com/vector-premium/perfil-hombre-dibujos-animados_18591-58482.jpg?w=2000"
          alt="Profile Picture"
          className="profile_picture"
        />
        {/* Nome do Perfil */}
        <h1 className="profile_name">John Doe</h1>
        {/* Biografia do perfil */}
        <p className="profile_bio">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          assumenda iure quaerat veniam vel reprehenderit praesentium tempora
          non debitis placeat pariatur repellendus dicta sunt sint nostrum
          labore, ipsa quasi ipsum.
        </p>
        {/* Detalhes do perfil */}
        <ul className="profile_details">
          <li>
            <strong>Email:</strong> example102@example.com
          </li>
          <li>
            <strong>Location:</strong> New York, USA
          </li>
          <li>
            <strong>Occupation:</strong> Just One Example
          </li>
        </ul>
      </article>
    </section>
  );
}

export default Profile;
