import React from "react";
import "./style.css";

import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

import { FiArrowLeft } from "react-icons/fi";
import LogoImg from "../../assets/logo.svg";
import loadingImg from "../../assets/load.svg";

import { useState } from "react";

export default function NewIncidents() {
  const [loading, setLoading] = useState(false);

  const ongId = localStorage.getItem("ongId");

  const history = useHistory();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  async function handleNewIncident(e) {
    e.preventDefault();

    setLoading(true);

    const data = {
      title,
      description,
      value,
    };

    try {
      const response = await api.post("/incidents", data, {
        headers: {
          Authorization: ongId,
        },
      });

      alert("Cadastrado com sucesso");
      history.push("/profile");

      setLoading(false);
    } catch (err) {
      setLoading(false);
      alert("Ocorreu um erro!");
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be The Hero" />
          <h1>Novo Caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar para home
          </Link>
        </section>

        <form onSubmit={handleNewIncident}>
          <input
            placeholder="Título do caso"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            placeholder="Descricao"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            placeholder="Valor em reais"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button
            className="button"
            type="submit"
            disable={loading ? "true" : ""}
          >
            {!loading && "Cadastrar"}
            {loading && <img src={loadingImg} alt="loading" />}
          </button>
        </form>
      </div>
    </div>
  );
}
