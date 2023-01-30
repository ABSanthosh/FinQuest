import { useEffect, useState } from "react";
import "../styles/routes/Home.scss";
import Header from "../component/Header/Header";
import { Cashify } from "../Utils/Cashify";

export default function Home() {
  const [stockItems, setStockItems] = useState([
    {
      name: "Anna Cafe",
      cost: 3000,
      delta: 1,
    },
    {
      name: "Naveen",
      cost: 2000,
      delta: -1,
    },
    {
      name: "Quench",
      cost: 1000,
      delta: 1,
    },
    {
      name: "Book Store",
      cost: 5000,
      delta: -1,
    },
    {
      name: "Raju cabs",
      cost: 10000,
      delta: -1,
    },
    {
      name: "Pharmacy",
      cost: 10000,
      delta: -1,
    },
    {
      name: "Adarsh",
      cost: 10000,
      delta: 1,
    },
    {
      name: "Adarsh",
      cost: 10000,
      delta: 1,
    },
    {
      name: "Adarsh",
      cost: 10000,
      delta: 1,
    },
    {
      name: "Adarsh",
      cost: 10000,
      delta: 1,
    },
    {
      name: "Adarsh",
      cost: 10000,
      delta: 1,
    },
    {
      name: "Adarsh",
      cost: 10000,
      delta: 1,
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedStockItems = stockItems.map((item) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        const cost = item.cost + delta * Math.floor(Math.random() * 1000);
        return {
          ...item,
          cost,
          delta,
        };
      });
      setStockItems(updatedStockItems);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="HomeContainer">
      <Header />
      <section className="HeroSection">
        <div className="HeroSection--title">
          <img src="/Img/Title.svg" />
        </div>
        <div className="HeroSection__content">
          {stockItems.map((item, index) => (
            <div className="HeroSection__content--item" key={index}>
              <label>{item.name}</label>
              <span
                className={`HeroSection__content--${
                  item.delta === 1 ? "green" : "red"
                }`}
              >
                {Cashify(item.cost)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
