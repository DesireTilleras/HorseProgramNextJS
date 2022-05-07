import styles from "../styles/Home.module.css";
import { CostInput } from "../components/CostInput";
import { Button } from "../components/Button";
import { useRouter } from "next/router";

export default function Home({ horses }) {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Stall Lilledal!</h1>
        <CostInput data={horses} />
        <div style={{marginTop:"20px"}}>
          <Button type="button" value="See all costs" onclick={() => router.push("/costInformation")}/>
        </div>
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
