import styles from "../styles/Home.module.css";

import { getAllCostsForFarm } from "../utils/db_costs";

export default function Home({ allCosts }) {
  console.log(allCosts);
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Stall Lilledal!</h1>

{allCosts.map((item)=>{
    return (
      <div key={item._id}>
        <p>{item._id}</p>
        <p>{item.cost}</p>
        <p>{item.costTitle}</p>
        <p>{item.date}</p>
      </div>
    );
    
})}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps() {


  const allCosts = await getAllCostsForFarm("Lilledal");

  // Pass data to the page via props
  return { props: { allCosts } };
}
