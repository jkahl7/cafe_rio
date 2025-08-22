"use client"
import ChatContainer from "./components/Chat/Container";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
      <ChatContainer />
      </main>
    </div>
  );
}
