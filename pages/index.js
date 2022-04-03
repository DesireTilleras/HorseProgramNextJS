import styles from "../styles/Home.module.css";
import { ButtonLabel, StyledButton } from "../components/StyledButton.style";
import { StyledCard, StyledGrid } from "../components/StyledCard.style";

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Stall Lilledal!</h1>
        <StyledButton>
          <ButtonLabel>Hej KNAPP</ButtonLabel>
        </StyledButton>
        <StyledGrid>
          {data.map((horse) => {
            return (
              <StyledCard>
                <p key={horse._key}>{horse.name}</p>
              </StyledCard>
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
