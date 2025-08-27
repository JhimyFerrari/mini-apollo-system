import Link from "next/link";
import style from "./users.module.css";

function Users() {
  return (
    <div className={style.linkContainer}>
      <Link href="/users/insert" className={style.button}>
        Cadastrar Usuários
      </Link>
      <Link href="/users/list" className={style.buttonSecondary}>
        Listar Usuários
      </Link>
    </div>
  );
}

export default Users;
