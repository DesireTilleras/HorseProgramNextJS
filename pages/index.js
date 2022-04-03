import styles from "../styles/Home.module.css";
import { ButtonLabel, StyledButton } from "../components/Styled/StyledButton.style";
import { StyledCard, StyledGrid } from "../components/Styled/StyledCard.style";
import {Card} from '../components/Card'

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Stall Lilledal!</h1>
        <StyledGrid>
          {data.map((horse) => {
            return (
              <Card key={horse._key} item={horse.name}/>
            );
          })}
        </StyledGrid>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/createDB`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
