import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CartContext } from "../Contexts/Context";

const sampleProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: "$59.99",
        description: "High-quality noise-canceling headphones.",
        image: "https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1730902752084WhatsApp%20Image%202024-11-06%20at%2015.18.39_07c025c6.jpg?alt=media&token=86ec46e1-3651-494c-8f03-e7a7c5952f9b"
    },
    {
        id: 2,
        name: "Smartwatch",
        price: "$99.99",
        description: "Track fitness and notifications on your wrist.",
        image: "https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1730902752084WhatsApp%20Image%202024-11-06%20at%2015.18.39_07c025c6.jpg?alt=media&token=86ec46e1-3651-494c-8f03-e7a7c5952f9b"
    },
    {
        id: 3,
        name: "Gaming Mouse",
        price: "$29.99",
        description: "Precision gaming with customizable buttons.",
        image: "https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1730902752084WhatsApp%20Image%202024-11-06%20at%2015.18.39_07c025c6.jpg?alt=media&token=86ec46e1-3651-494c-8f03-e7a7c5952f9bhttps://firebasestorage.googleapis.com/v0/b/ecoflux-51b"
    },
    {
        id: 4,
        name: "Laptop Stand",
        price: "$39.99",
        description: "Ergonomic aluminum stand for laptops.",
        image: "https://firebasestorage.googleapis.com/v0/b/ecoflux-51b0a.appspot.com/o/1730902752084WhatsApp%20Image%202024-11-06%20at%2015.18.39_07c025c6.jpg?alt=media&token=86ec46e1-3651-494c-8f03-e7a7c5952f9b"
    },
];

export default function Products({ isSidebarOpen }) {
    const [products, setProducts] = useState([]);
    const [isOnline, setIsOnline] = useState(true);
    const [loading, setLoading] = useState(true);
      const { user, data } = useContext(CartContext)
    const [loadedImages, setLoadedImages] = useState({});

    useEffect(() => {
        const timer = setTimeout(() => {
            setProducts(sampleProducts);
            setLoading(false);
        }, 1000);

        const updateOnlineStatus = () => setIsOnline(navigator.onLine);
        window.addEventListener("online", updateOnlineStatus);
        window.addEventListener("offline", updateOnlineStatus);
        updateOnlineStatus();

        return () => {
            clearTimeout(timer);
            window.removeEventListener("online", updateOnlineStatus);
            window.removeEventListener("offline", updateOnlineStatus);
        };
    }, []);

    const handleImageLoad = (id) => {
        setLoadedImages((prev) => ({ ...prev, [id]: true }));
    };

   return (
    <div className={`transition-all duration-300 ${isSidebarOpen ? '' : ''}`}>
        {/* Header */}
        <div className="bg-white xl:flex items-center justify-between p-6 shadow">
            <h1 className="text-sm mt-2 font-bold">
                Welcome back, <span className="text-sm">{data?.name || user?.name}</span>
            </h1>
            <div>
                    <button className="p-3 bg-blue-400  mt-2 text-white cursor-pointer font-semibold text-sm rounded-md">Create Product</button>
                </div>
        </div>

        {/* Main Content */}
        <div className="p-6">
            {!isOnline ? (
                <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-6">
                    <p className="text-lg font-semibold text-red-500 mb-2">You’re offline</p>
                    <p className="text-sm text-gray-500">Please check your internet connection.</p>
                </div>
            ) : loading ? (
                <div className="flex items-center justify-center min-h-[40vh]">
                    <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white rounded-lg shadow p-4 flex flex-col justify-between"
                        >
                            <div>
                                <div className="relative w-full h-40 mb-4 bg-gray-200 rounded-md overflow-hidden flex items-center justify-center">
                                    {!loadedImages[product.id] && (
                                        <div className="absolute w-8 h-8 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
                                    )}
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${
                                            loadedImages[product.id] ? "opacity-100" : "opacity-0"
                                        }`}
                                        onLoad={() => handleImageLoad(product.id)}
                                        onError={(e) => {
                                            e.target.src = "https://via.placeholder.com/300x200?text=Image+Not+Found";
                                            handleImageLoad(product.id);
                                        }}
                                    />
                                </div>
                                <h3 className="text-md font-semibold mb-1">{product.name}</h3>
                                <p className="text-gray-500 text-sm mb-2">{product.description}</p>
                                <p className="text-blue-600 font-bold mb-3">{product.price}</p>
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={() => handleEdit(product.id)}
                                    className="text-sm cursor-pointer px-3 py-1 rounded bg-yellow-400 hover:bg-yellow-500 text-white"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="text-sm cursor-pointer px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white"
                                >
                                    Delete
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    </div>
);

}
