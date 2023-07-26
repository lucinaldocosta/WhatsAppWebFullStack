import React, { useEffect, useState } from "react";
import "../Styles/Components/SendMessages.css";
import GetMessages from "./GetMessages";

function SendMessages() {
  const [friendName, setFriendName] = useState("");
  const [updateMessages, setUpdateMessages] = useState(false);
  const [message, setMessage] = useState("");
  const [sendMessage, setSendMessage] = useState({
    Action: "SendMessages",
    WhoSend: "",
    WhoReceive: "",
    Message: "",
  });

  // Atualiza o objeto sendMessage sempre que a mensagem for alterada.
  useEffect(() => {
    const loggedData = JSON.parse(sessionStorage.getItem("logged"));
    setSendMessage({
      ...sendMessage,
      WhoSend: loggedData.userLogged,
      WhoReceive: loggedData.messageFor,
      Message: message,
    });
  }, [message]);

  // Função para lidar com a seleção do amigo para enviar a mensagem.
  const handleChangeFriend = (friendSelect) => {
    setFriendName(friendSelect);
  };

  // Atualiza o estado da mensagem conforme o usuário digita.
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  // Função para lidar com o envio da mensagem.
  const handleSendMessage = () => {
    console.log(sendMessage)
    fetch("http://localhost:3000", {
      method: "POST",
      body: JSON.stringify(sendMessage),
      headers: { "Content-Type": "application/json" },
    });
    setMessage("");
    setUpdateMessages(true);

    setTimeout(() => {
      setUpdateMessages(false);
    }, 100);
  };

  // Renderiza o componente
  return (
    <>
      <GetMessages
        onFriendSelect={handleChangeFriend}
        updateMessages={updateMessages}
      />
      <section
        className={
          friendName === ""
            ? "section_send_messages_off"
            : "section_send_messages"
        }
      >
        <article className="article_send_messages">
          {/* Campo de entrada de texto para a mensagem */}
          <input
            type="text"
            value={message}
            onChange={handleChange}
            className="input_messages"
            placeholder="Write a message here"
            autoComplete="none"
            required
          />
          {/* Botão para enviar a mensagem */}
          <button className="button_send_messages" onClick={handleSendMessage}>Send</button>
        </article>
      </section>
    </>
  );
}

export default SendMessages;
