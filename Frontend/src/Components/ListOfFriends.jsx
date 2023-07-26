import React, { useEffect, useState } from "react";
import "../Styles/Components/ListOfFriends.css";

function ListOfFriends() {
  const loggedData = JSON.parse(sessionStorage.getItem("logged"));

  // Estado para armazenar os dados da pesquisa de amigos.
  const [searchFriends, setSearchFriends] = useState({
    Action: "searchFriends",
    FriendAddedBy: loggedData.userLogged,
  });

  // Estado para armazenar o botão clicado.
  const [clickedButton, setClickedButton] = useState("");

  // Estado para armazenar a lista de amigos.
  const [friends, setFriends] = useState([]);

  // Função para definir o amigo selecionado e atualizar o sessionStorage.
  const sendMessageFor = (friendName) => {
    sessionStorage.setItem(
      "logged",
      JSON.stringify({
        userLogged: loggedData.userLogged,
        messageFor: friendName,
      })
    );
  };

  // useEffect para obter a lista de amigos do backend e definir a mensagem para o amigo.
  useEffect(() => {
    fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify(searchFriends),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.text())
      .then((data) => {
        setFriends(JSON.parse(data));
      });
    sendMessageFor("");
  }, []);

  // Função para lidar com o clique no botão Refresh.
  const handleRefresh = () => {
    window.location.reload();
    sendMessageFor("");
  };
 
  // Função para lidar com a seleção de um amigo.
  const handleSelectFriend = (friendName) => {
    sendMessageFor(friendName);
    setClickedButton(friendName);
  };

  // Renderiza o componente
  return (
    <article className="article_list_of_friends">
      {/* Input para pesquisa de amigos */}
      <input
        className="input_list_of_friends"
        type="text"
        placeholder="Search a friend"
      />

      {/* Mapeia a lista de amigos e renderiza os botões */}
      {friends.map((item, index) => (
        <div key={index} className="div_list_of_friends">
          <button
            className={`button_list_of_friends ${
              clickedButton === item.FriendName ? "active_button" : ""
            }`}
            onClick={() => handleSelectFriend(item.FriendName)}
            value={item.FriendName}
          >
            {item.FriendName}
          </button>
        </div>
      ))}
      {/* Botão para atualizar a lista de amigos */}
      <button className="refresh_button" onClick={handleRefresh}>
        Refresh
      </button>
    </article>
  );
}

export default ListOfFriends;
