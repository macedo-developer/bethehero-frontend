import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./style.css";
import { FiLogIn } from "react-icons/fi";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";
import loadingImg from "../../assets/load.svg";

import api from "../../services/api";

export default function Logon() {
  const [loading, setLoading] = useState(false);

  const [id, setId] = useState("");

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await api.post("session", { id });

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);

      setLoading(false);

      history.push("/profile");
    } catch (err) {
      setLoading(false);
      alert("Falha, tente novamente");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu Logon</h1>
          <input
            placeholder="Your ID"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button
            className="button"
            type="submit"
            disabled={loading ? "true" : ""}
          >
            {!loading && "Login"}
            {loading && <img src={loadingImg} alt="loading" />}
          </button>

          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <div className="welcome">
        <img src={heroesImg} alt="Heroes" />
      </div>
    </div>
  );
}
