import FormField from "@/components/global/FormField";
import style from "./users.module.css";
import { useState } from "react";
import Link from "next/link";

function EditarUsuario({ user, id }) {
  const [nome, setNome] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [userWasEdited, setUserWasEdited] = useState(false);
  const [error, setError] = useState();

  async function handleEditar() {
    const result = await fetch(`/api/users/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: nome,
        email: email,
      }),
    });
    if (result.status === 200) {
      setUserWasEdited(true);
      setError(null);
    } else if (result.status === 400) {
      setUserWasEdited(false);
      setError(`Email ${email} já está sendo utilizado`);
    } else {
      setUserWasEdited(false);
      setError("Um erro inesperado ocorreu");
    }
  }

  return (
    <>
      <div className={style.actionsHeader}>
        <Link href="/users" className={style.buttonSecondary}>
          ⬅ Voltar ao Menu
        </Link>
      </div>
      <div className={style.container} prevent>
        <h2>Editar Usuário</h2>
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

        <button className={style.button} onClick={handleEditar}>
          Editar
        </button>
      </div>
      {userWasEdited && <h3>✅ Usuário atualizado com sucesso!</h3>}
      {error && <h3 style={{ color: "red" }}>❌ Erro: {error}</h3>}
    </>
  );
}
export async function getServerSideProps(context) {
  const { id } = context.params;

  const host = context.req.headers.host;

  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const results = await fetch(`${protocol}://${host}/api/users/${id}`);
  const user = await results.json();

  return {
    props: { user, id },
  };
}

export default EditarUsuario;
