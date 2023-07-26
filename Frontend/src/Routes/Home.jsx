import React from "react";
import { Link } from "react-router-dom";
import ListOfFriends from "../Components/ListOfFriends";
import AddFriends from "../Components/AddFriends";
import SendMessages from "../Components/SendMessages";
import "../Styles/Routes/Home.css"

function Home() {
  const loggedData = JSON.parse(sessionStorage.getItem("logged"))
  return (
    <>
      <section className="home_section">
        <aside>
          {/* Link para a página do perfil */}
          <Link to={`/profile/${loggedData.userlogged}`}>
          <p className="link_to_profile">Profile</p>
          </Link>
          {/* Componente de lista de amigos */}
          <ListOfFriends />
          {/* Componente de adicionar amigos */}
          <AddFriends />
        </aside>
        <article className="home_article">
          {/* Componente de enviar mensagem */}
          <SendMessages />
        </article>
      </section>
    </>
  );
}

export default Home;
