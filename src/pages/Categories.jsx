import { useContext, useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CreateCategoryModal from "../Modal/CreateCategory";
import { CartContext } from "../Contexts/Context";
const initialCategories = [
    { id: 1, name: "Electronics", image: "https://th.bing.com/th/id/OIF.568kucYlmhJBgzlOmrFkEg?w=261&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" },
    { id: 2, name: "Fashion", image: "https://th.bing.com/th/id/OIF.568kucYlmhJBgzlOmrFkEg?w=261&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" },
    { id: 3, name: "Home & Kitchen", image: "https://th.bing.com/th/id/OIF.568kucYlmhJBgzlOmrFkEg?w=261&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" },
    { id: 4, name: "Books", image: "https://th.bing.com/th/id/OIF.568kucYlmhJBgzlOmrFkEg?w=261&h=188&c=7&r=0&o=7&dpr=1.5&pid=1.7&rm=3" },
];

export default function Categories({ isSidebarOpen }) {
    const [categories, setCategories] = useState(initialCategories);
    const [isOnline, setIsOnline] = useState(true);
    const [loading, setLoading] = useState(true);
    const [open, setOpen] = useState(false)
  const { user, data } = useContext(CartContext)

    const openModal = ()=>{
        setOpen(true)
    }

    const closeModal = ()=>{
        setOpen(false)
    }

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
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

    const handleDelete = (id) => {
        setCategories((prev) => prev.filter((cat) => cat.id !== id));
    };

    const handleEdit = (id) => {
        const newName = prompt("Enter new category name:");
        if (newName?.trim()) {
            setCategories((prev) =>
                prev.map((cat) =>
                    cat.id === id ? { ...cat, name: newName.trim() } : cat
                )
            );
        }
    };

    if (!isOnline) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-6">
                <p className="text-lg font-semibold text-red-500 mb-2">You’re offline</p>
                <p className="text-sm text-gray-500">Please check your internet connection.</p>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[40vh]">
                <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return (
        <div className={`transition-all duration-300 ${isSidebarOpen ? '' : ''}`}>
            {/* Header */}
            <div className="bg-white xl:flex mt-2 items-center justify-between p-6 shadow">
                <h1 className="text-sm font-bold">
                    Welcome back, <span className="text-sm">{data?.name || user?.name}</span>
                </h1>
                <button onClick={openModal} className="p-3 cursor-pointer mt-2 bg-blue-400 text-white font-semibold text-sm rounded-md">
                    Create Category
                </button>
            </div>

            {/* Categories Card */}
            <div className="p-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <h2 className="text-2xl font-bold mb-4">Categories</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {categories.map((cat) => (
                            <motion.div
                                key={cat.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-100 rounded-lg p-2 shadow flex flex-col items-center relative"
                            >
                                <Link to={`/product/${cat.id}`}>
                                    <img
                                        src={cat.image}
                                        alt={cat.name}
                                        className="w-full h-28 object-contain rounded-md mb-2"
                                        onError={(e) =>
                                            (e.target.src = "https://via.placeholder.com/150?text=Image+Not+Found")
                                        }
                                    />
                                </Link>
                                <span className="text-sm font-medium text-center">{cat.name}</span>

                                {/* Action Buttons */}
                                <div className="absolute top-2 right-2 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(cat.id)}
                                        className="text-yellow-500 cursor-pointer hover:text-yellow-600"
                                        title="Edit"
                                    >
                                        <FaEdit size={14} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(cat.id)}
                                        className="text-red-500 cursor-pointer hover:text-red-700"
                                        title="Delete"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                        {categories.length === 0 && (
                            <div className="col-span-full text-center text-gray-500 text-sm">
                                No categories found.
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {
                open && <div>
                    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={closeModal}></div>
                    <CreateCategoryModal closeModal={closeModal}/>
                </div>
            }
        </div>
    );
}
