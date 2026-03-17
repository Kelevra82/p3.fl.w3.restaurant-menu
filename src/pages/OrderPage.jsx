import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const OrderPage = () => {
  const [customer_name, setCustomer_Name] = useState("");
  const [order_details, setOrder_Details] = useState("");
  const [result, setResult] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = import.meta.env.VITE_SUPABASE_URL + "orders";
    const token = import.meta.env.VITE_TOKEN;
    const order = {
      customer_name,
      order_details,
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: token,
      },
      body: JSON.stringify(order),
    });

    if (response.ok) {
      setResult("Order created successfully!");

      setCustomer_Name("");
      setOrder_Details("");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      setResult("Error creating order. Please try again.");
    }
  };

  return (
    <main className="container mt-5 order-form">
      <h1 className="text-center mb-4">Place Your Order</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            value={customer_name}
            onChange={(e) => setCustomer_Name(e.target.value)}
            className="form-control"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Order Details</label>
          <textarea
            value={order_details}
            onChange={(e) => setOrder_Details(e.target.value)}
            className="form-control"
            placeholder="Describe your order here..."
          />
        </div>

        <button
          type="submit"
          className="btn btn-success w-100 mt-2"
        >
          Send Order
        </button>
      </form>

      <div>{result}</div>
    </main>
  );
};
