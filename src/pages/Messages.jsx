import React, { useContext, useState } from "react";
import { CartContext } from "../Contexts/Context";

const initialMessages = [
  {
    id: 1,
    type: "contact",
    name: "Sarah Johnson",
    message:
      "Hi, I'm interested in bulk ordering your products. Can you provide pricing details and shipping options?",
    date: "2025-06-20",
  },
  {
    id: 2,
    type: "review",
    name: "David Miller",
    product: {
      name: "MacBook Pro 16” M3",
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp16-spaceblack-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311075418",
    },
    message:
      "This MacBook is a beast! Great battery life and performance. A bit pricey, but totally worth it for developers.",
    date: "2025-06-18",
  },
  {
    id: 3,
    type: "contact",
    name: "Emily Brown",
    message:
      "I forgot my order number but I made a purchase last week. Can you help?",
    date: "2025-06-21",
  },
  {
    id: 4,
    type: "review",
    name: "Michael Scott",
    product: {
      name: "AirPods Max",
      image:
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airpods-max-select-skyblue-202011?wid=470&hei=556&fmt=png-alpha&.v=1604022365000",
    },
    message:
      "Sound quality is superb. Noise cancellation is next level. A bit bulky but worth the price for audiophiles.",
    date: "2025-06-19",
  },
];

export default function Messages({ isSidebarOpen }) {
  const [messages, setMessages] = useState(initialMessages);
    const { user, data } = useContext(CartContext)
  

  const handleDelete = (id) => {
    setMessages((prev) => prev.filter((msg) => msg.id !== id));
  };

  const reviews = messages.filter((msg) => msg.type === "review");
  const contacts = messages.filter((msg) => msg.type === "contact");

  return (
    <div
      className={`transition-all duration-300 ${
        isSidebarOpen ? "" : ""
      } min-h-screen bg-gray-50`}
    >
      {/* Header */}
      <div className="bg-white p-6 shadow">
        <h1 className="text-sm font-bold">
          Welcome back, <span className="text-sm font-normal">{data?.name || user?.name}</span>
        </h1>
      </div>

      {/* Grid Layout */}
      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Reviews */}
        <div>
          <h2 className="text-base font-semibold mb-4 text-gray-800">
            Product Reviews
          </h2>
          <div className="space-y-4">
            {reviews.map((msg) => (
              <div
                key={msg.id}
                className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 relative"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="absolute top-2 right-2 cursor-pointer text-red-500 text-sm hover:text-red-700"
                >
                  Delete
                </button>

                <div className="xl:flex items-start gap-4">
                  <img
                    src={msg.product.image}
                    alt={msg.product.name}
                    className="h-20 w-20 object-contain rounded-lg border"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold text-sm text-gray-800">
                        {msg.name}
                      </h3>
                      <span className="text-xs text-gray-500">{msg.date}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium text-gray-700">Product:</span>{" "}
                      {msg.product.name}
                    </p>
                    <p className="text-sm text-gray-700 whitespace-pre-line">
                      {msg.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Messages */}
        <div>
          <h2 className="text-base font-semibold mb-4 text-gray-800">
            Contact Messages
          </h2>
          <div className="space-y-4">
            {contacts.map((msg) => (
              <div
                key={msg.id}
                className="bg-white shadow-sm rounded-lg p-5 border border-gray-100 relative"
              >
                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="absolute top-2 right-2 cursor-pointer text-red-500 text-sm hover:text-red-700"
                >
                  Delete
                </button>

                <div className="xl:flex justify-between items-center mb-2">
                  <h3 className="font-semibold text-sm text-gray-800">
                    {msg.name}
                  </h3>
                  <span className="text-xs text-gray-500">{msg.date}</span>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-line">
                  {msg.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
