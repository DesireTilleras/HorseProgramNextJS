import styles from "../styles/Home.module.css";
import { CostInput } from "../components/CostInput";
import { Button } from "../components/Button";
import { useRouter } from "next/router";
import { Weather } from "../components/Weather";

export default function Home({ horses, weatherData }) {
  const router = useRouter();
  let time = new Date();
  let prognosis = getWeather().parameters[18].values[0]



  function getWeather(){    
    for(let i = 0; i < weatherData.timeSeries.length; i ++ ){
      let currentTime;
      if(Number(time.getHours())<10){
        currentTime = "0"+String(time.getHours());      
      }
      else{
        currentTime = time.getHours();
      }
      const data = weatherData.timeSeries[i].validTime.split("T")[1].startsWith(currentTime);
      if (data) return weatherData.timeSeries[i];       
    }
  }
    
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <Weather weatherInfo={prognosis} />
        <h1 className={styles.title}>Stall Lilledal!</h1>
        <CostInput data={horses} />
        <div style={{ marginTop: "20px" }}>
          <Button
            type="button"
            value="See all costs"
            onclick={() => router.push("/costInformation")}
          />
        </div>
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps({ req, res }) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const result = await fetch(`http://localhost:3000/api/createDB`);
  const horses = await result.json();

  const allData = await fetch(
    `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/12.2940/lat/57.1063/data.json`
  ).catch(console.error());

  const weatherData = await allData.json()



  // Pass data to the page via props
  return { props: { horses, weatherData } };
}
