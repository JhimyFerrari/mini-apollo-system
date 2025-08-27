import { useEffect, useState } from "react";
import style from "./users.module.css";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

function List() {
  const [allUsers, setAllUsers] = useState([]);

  const router = useRouter();
  useEffect(() => {
    async function fetchUsers() {
      try {
        const results = await fetch("/api/users", {
          method: "GET",
        });
        const resultBody = await results.json();

        setAllUsers(resultBody);
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  async function handleExcluir(id) {
    try {
      await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      });
      setAllUsers(allUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.log(error);
    }
  }

  function handleEditar(id) {
    router.push(`${id}`);
  }
  return (
    <>
      <div className={style.actionsHeader}>
        <Link href="/users" className={style.buttonSecondary}>
          ⬅ Voltar ao Menu
        </Link>
      </div>

      <div className={style.tableContainer}>
        <table className={style.userTable}>
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>*</th>
            </tr>
          </thead>
          <tbody>
            {allUsers.length === 0 ? (
              <tr>
                <td colSpan="3" className={style.emptyRow}>
                  Nenhum usuário encontrado
                </td>
              </tr>
            ) : (
              allUsers.map((item) => (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                  <td className={style.actionsCell}>
                    <Image
                      className={style.actionLink}
                      onClick={() => handleEditar(item.id)}
                      src={"/icons/editbutton.svg"}
                      width={28}
                      height={28}
                      alt="Editar"
                    />
                    <Image
                      className={style.actionLink}
                      onClick={async () => await handleExcluir(item.id)}
                      src={"/icons/delete.png"}
                      width={40}
                      height={40}
                      alt="Excluir"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default List;
