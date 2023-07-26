import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import "./Styles/App.css";

function App() {
  const navigate = useNavigate();

  // useEffect que verifica se o usuário está logado
  useEffect(() => {
    // Recupera os dados do usuário logado do sessionStorage.
    const loggedData = JSON.parse(sessionStorage.getItem("logged"));

    // Faz uma solicitação para verificar se o usuário está logado no servidor.
    fetch("http://localhost:3000/islogged")
      .then((res) => res.json())
      .then((data) => {
        data.map((item) => {
          // Verifica se o usuário atual está logado.
          if (
            item.IsLogged === "true" &&
            item.Username === loggedData.userLogged
          ) {
            // Redireciona para a página inicial se o usuário estiver logado e tenta acessar a página de login ou registro
            if (
              (
                window.location.pathname === "/" ||
                window.location.pathname === "signup"
              ) 
              &&  item.IsLogged === "true"
            ) {
              navigate("/home");
            }
          }
          // Verifica se o usuário atual não esta logado.
          if (!item.IsLogged) {
            if (
              window.location.pathname === "/" ||
              window.location.pathname === "signup"
            ) {
              navigate("/");
            }
          }
        });
      });
  }, [window.location.pathname]);

  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
