import Link from "next/link";
import styles from "./navbar.module.css";
export default function Navbar() {
  return (
    <nav className={styles.navbarMenu}>
      <div>Apollo System</div>
      <div className={styles.itens}>
        <Link href="/">Home</Link>
        <Link href="/Produtos">Produtos</Link>
        <Link href="/Usuarios">Usuário</Link>
      </div>
    </nav>
  );
}
