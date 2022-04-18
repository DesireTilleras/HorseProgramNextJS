import styles from "../styles/Home.module.css";

import { CostInput } from "../components/CostInput";

import {Button} from '../components/Button'


import { Router, useRouter } from "next/router";


export default function Home({ horses }) {
const router = useRouter()

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Stall Lilledal!</h1>
        <CostInput data={horses} />

          <button onClick = {() =>router.push("/costInformation")}>See cost history</button>

      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/createDB`);
  const horses = await res.json();

  // Pass data to the page via props
  return { props: { horses } };
}
