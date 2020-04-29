import React, { useState } from "react";

import "./style.css";

import api from "../../services/api";

import { Link, useHistory } from "react-router-dom";

import { FiArrowLeft } from "react-icons/fi";
import LogoImg from "../../assets/logo.svg";
import loadingImg from "../../assets/load.svg";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    setLoading(true);
    const data = {
      name,
      email,
      whatsapp,
      city,
      uf,
    };
    try {
      const response = await api.post("ongs", data);

      alert(`Seu ID: ${response.data.id}`);

      setLoading(false);
      history.push("/");
    } catch (err) {
      setLoading(false);
      alert("Ocorreu um erro");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={LogoImg} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="WhatsApp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={(e) => setUf(e.target.value)}
            />
          </div>

          <button
            className="button"
            type="submit"
            disable={loading ? "true" : ""}
          >
            {!loading && "Cadastrar"}
            {loading && <img src={loadingImg} alt="Loading" />}
          </button>
        </form>
      </div>
    </div>
  );
}
