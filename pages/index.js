import { useEffect, useState } from "react";
import "../styles/routes/Home.scss";

export default function Home() {
  const [data, setData] = useState();

  const fetchData = async () => {
    const response = await fetch("/api/fetch-data");
    const json = await response.json();
    setData(json);
  };

  // Uncomment this to fetch data every second(Make shift live update)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <main className="HomeContainer">
      <button onClick={async () => fetchData()}>Fetch</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  );
}
