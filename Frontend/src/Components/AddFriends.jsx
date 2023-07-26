import React, { useState } from "react";
import "../Styles/Components/AddFriends.css";

function AddFriends() {
  const loggedData = JSON.parse(sessionStorage.getItem("logged"));

  // Define um estado para armazenar os dados do amigo a ser adicionado.
  const [addFriends, setAddFriends] = useState({
    Action: "AddFriends",
    FriendAddedBy: loggedData.userLogged,
    FriendName: "",
  });

  // Função de tratamento de mudança de valor do input.
  const handleChange = (e) => {
    setAddFriends({ ...addFriends, FriendName: e.target.value });
  };

  // Função para lidar com a adição de amigos.
  const handleAddFriends = (e) => {
    fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify(addFriends),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        // Alerta com a resposta do servidor.
        alert(data);
      });

    // Reseta o estado do amigo a ser adicionado.
    setAddFriends({ ...addFriends, FriendName: "" });
    window.location.reload();
  };

  return (
    <>
      <article className="article_add_friends">
        <input
          className="input_add_friends"
          name="addUser"
          onChange={handleChange}
          value={addFriends.FriendName}
          placeholder="Add Friend"
          autoComplete="none"
          required
          type="text"
        />
        <button className="button_add_friends" onClick={handleAddFriends}>
          Add
        </button>
      </article>
    </>
  );
}

export default AddFriends;
