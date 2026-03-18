import React, { useState, useEffect } from "react";

export const ChatbotForm = () => {
  const [menuItems, setMenuItems] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState("");

  const getMenuItems = async () => {
    const url = import.meta.env.VITE_SUPABASE_URL + "menu_items";
    const token = import.meta.env.VITE_TOKEN;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        apikey: token,
      },
    });

    const data = await response.json();
    let menu = "";
    for (let i = 0; i < data.length; i++) {
      menu += `[${i + 1}) ${data[i].name} - $ ${data[i].price}]`;
    }

    setMenuItems(menu);
  };

  useEffect(() => {
    getMenuItems();
  }, []);

  const instructions = `
  You are a friendly restaurant waiter, Pengy, at Prime Palette. Your personality is warm, professional, and knowledgeable about the menu.

  Menu Items:

  ${menuItems}

  Rules:
  1. Only answer questions about food, drinks, and restaurant-related topics
  2. If asked about non-menu topics, politely redirect to menu items
  3. Be helpful and descriptive about menu items
  4. Keep responses concise but informative
  5. Always maintain the waiter persona

  Format Rule: Only respond in plain text. Don't use any format like HTML or Mark Down.

  You can use emojis.
  `;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = import.meta.env.VITE_GEMINI_URL;
    const token = import.meta.env.VITE_GEMINI_KEY;

    const history = messages.concat();
    history.push({ role: "user", text: question });

    setMessages(history);
    setLoading(true);

    const apiHistory = history.map((item) => ({
      role: item.role,
      parts: [{ text: item.text }],
    }));

    const result = await fetch(url, {
      method: "POST",
      headers: {
        "x-goog-api-key": token,
      },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: instructions }] },
        contents: apiHistory,
      }),
    });

    const data = await result.json();

    const answer = data.candidates[0].content.parts[0].text;
    const response = { role: "model", text: answer };

    history.push(response);
    setMessages(history);

    setLoading(false);
    setQuestion("");
  };

  return (
    <>
      <div className="container mt-5 chat-history">
        <h5 className="mb-3 text-center">Prime Palette Assistant</h5>
        <form onSubmit={handleSubmit}>
          <label className="fw-bold">Chat</label>
          <div className="mt-3 mb-3">
            {messages.map((item, i) => (
              <p
                key={i}
                className={`p-2 mb-2
                  ${item.role === "model" ? "text-warning" : "text-info"}`}
              >
                {item.text}
              </p>
            ))}
          </div>

          {loading ? <p>Loading...</p> : <></>}

          <div className="mb-3">
            <input
              type="text"
              value={question}
              className="form-control"
              placeholder="Ask your question"
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>
          <button className="btn btn-outline-success">Send</button>
        </form>
      </div>
    </>
  );
};
