import FormField from "@/components/global/FormField";
import style from "./users.module.css";
import { useState } from "react";
import Link from "next/link";
function Insert() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState();
  const [error, setError] = useState();
  async function handleCadastrar() {
    const result = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: nome,
        email: email,
        password: password,
      }),
    });
    const resultBody = await result.json();
    if (result.status === 201) {
      setNewUser(resultBody);
      setError(null);
    } else if (result.status === 400) {
      setNewUser(null);
      setError(`Email ${email} já está sendo utilizado`);
    } else {
      setNewUser(null);
      setError("Um erro inesperado ocorreu");
    }
    limparCampos();
  }

  function limparCampos() {
    setNome("");
    setEmail("");
    setPassword("");
  }
  return (
    <>
      <div className={style.actionsHeader}>
        <Link href="/users" className={style.buttonSecondary}>
          ⬅ Voltar ao Menu
        </Link>
      </div>
      <div className={style.container} prevent>
        <h2>Cadastrar Usuário</h2>
        <FormField
          label={"Nome"}
          isRequired={true}
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <FormField
          label={"Email"}
          isRequired={true}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <FormField
          label={"Password"}
          isRequired={true}
          type={"password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className={style.button} onClick={handleCadastrar}>
          Cadastrar
        </button>
      </div>
      {newUser && (
        <h3>✅ Usuário "{newUser.username}" cadastrado com sucesso!</h3>
      )}
      {error && <h3 style={{ color: "red" }}>❌ Erro: {error}</h3>}
    </>
  );
}

export default Insert;
