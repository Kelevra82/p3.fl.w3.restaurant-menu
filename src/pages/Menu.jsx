import React, { useState, useEffect } from "react";
import { Card } from "../components/Card";

export const Menu = () => {
  const [menu, setMenu] = useState([]);

  const getMenu = async () => {
    const url = import.meta.env.VITE_SUPABASE_URL + "menu_items";
    const token = import.meta.env.VITE_TOKEN;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: token,
      },
    });
    const data = await response.json();
    setMenu(data);
  };
  useEffect(() => {
    getMenu();
  }, []);

  const breakfast = menu.filter((item) => item.category === "breakfast");
  const lunch = menu.filter((item) => item.category === "lunch");
  const dinner = menu.filter((item) => item.category === "dinner");
  const drinks = menu.filter((item) => item.category === "drinks");

  return (
    <>
      <main className="mt-5 text-center">
        <h1 className="text-center mb-5">Restaurant Menu</h1>

        <h2>Breakfast</h2>
        <div className="row g-4 cards my-2">
          {breakfast.map((item) => (
            <div className="col-12 col-lg-4">
              <Card
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image_url}
              />
            </div>
          ))}
        </div>

        <h2>Lunch</h2>
        <div className="row g-4 cards my-2">
          {lunch.map((item) => (
            <div className="col-12 col-lg-4">
              <Card
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image_url}
              />
            </div>
          ))}
        </div>

        <h2>Dinner</h2>
        <div className="row g-4 cards my-2">
          {dinner.map((item) => (
            <div className="col-12 col-lg-4">
              <Card
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image_url}
              />
            </div>
          ))}
        </div>
        <h2>Drinks</h2>
        <div className="row g-4 cards my-2">
          {drinks.map((item) => (
            <div className="col-12 col-lg-4">
              <Card
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image_url}
              />
            </div>
          ))}
        </div>
      </main>
    </>
  );
};
