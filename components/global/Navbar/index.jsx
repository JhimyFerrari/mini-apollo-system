import Link from "next/link";
import styles from "./navbar.module.css";
export default function Navbar() {
  return (
    <nav className={styles.navbarMenu}>
      <div>Apollo System</div>
      <div className={styles.itens}>
        <Link href="/">Home</Link>
        <Link href="/users">Usuário</Link>
      </div>
    </nav>
  );
}
