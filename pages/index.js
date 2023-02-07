import { useEffect, useState } from "react";
import "../styles/routes/Home.scss";
import Header from "../component/Header/Header";
import { Cashify } from "../Utils/Cashify";
import Logo from "../component/Logo/Logo";
import Simulate from "../Utils/simulator";

export default function Home() {
  const [stockItems, setStockItems] = useState([
    {
      Name: "Anna Cafe",
      Price: 400,
      Delta: 1
    },
    {
      Name: "Nescafe",
      Price: 105,
      Delta: 1
    },
    {
      Name: "Laundry",
      Price: 0,
      Delta: 1
    },
    {
      Name: "Grabbo",
      Price: 0,
      Delta: 1
    },
    {
      Name: "Naveen Tea",
      Price: 0,
      Delta: 1
    },
    {
      Name: "Surya Tuck",
      Price: 0,
      Delta: 1
    },
    {
      Name: "Adarsh",
      Price: 0,
      Delta: 1
    },
    {
      Name: "Cycle Shop",
      Price: 0,
      Delta: 1
    },
    {
      Name: "Bookstore",
      Price: 0,
      Delta: 1
    },
    {
      Name: "19th Hole",
      Price: 0,
      Delta: 1
    },
    {
      Name: "Raju Cab",
      Price: 0,
      Delta: 1
    },
    {
      Name: "Pharmacy",
      Price: 0,
      Delta: 1
    },
    {
      Name: "C Block Printer",
      Price: 0,
      Delta: 1
    },
    {
      Name: "Swad Kathi",
      Price: 0,
      Delta: 1
    },
    {
      Name: "Mahesh",
      Price: 0,
      Delta: 1
    }

  ]);

  // const [stockItems, setStockItems] = useState([])
  const fetchData = async () => {
    const response = await fetch("/api/fetch-data");
    const json = await response.json();
    // return Simulate(json)
    console.log(Simulate(json).prices_new)
    setStockItems((prev) => {
      return Simulate(json).prices_new.map((item, index) => {
        return ({
          ...item,
          Delta: prev[index].Price <= item.Price ? 1 : -1
        })
      })
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData()
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="HomeContainer">
      {/* <Header /> */}
      <section className="HeroSection">
        <div className="HeroSection--subHeader">
          <img src="/Img/Logo.svg" />
          <span>x</span>
          <img src="/Img/Inspira.svg" />
        </div>
        <div className="HeroSection--title">
          <div>
            <img src="/Img/Title.svg" />
            <img src="/Img/Title.svg" />
          </div>
          <div>
            <img src="/Img/Title.svg" />
            <img src="/Img/Title.svg" />
            <img src="/Img/Title.svg" />
            <img src="/Img/Title.svg" />
          </div>
          <div>
            <img src="/Img/Title.svg" />
            <img src="/Img/Title.svg" />
          </div>
        </div>
        <div className="HeroSection__content">
          {stockItems.map((item, index) => (
            <div className="HeroSection__content--item" key={index}>
              <label>{item.Name}</label>
              <span
                className={`HeroSection__content--${item.Delta === 1 ? "green" : "red"
                  }`}
              >
                {Cashify(item.Price)}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
