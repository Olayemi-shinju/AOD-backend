import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function CreateCategoryModal({ closeModal }) {
    const [name, setName] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [errors, setErrors] = useState({});
    const fileInputRef = useRef();

    useEffect(() => {
        if (imageFile) {
            const url = URL.createObjectURL(imageFile);
            setPreviewUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [imageFile]);

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Category name is required.";
        if (!imageFile) newErrors.image = "Category image is required.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        // Example form submission (handle actual logic here)
        console.log("Submitted category:", { name, imageFile });

        // Reset
        setName("");
        setImageFile(null);
        closeModal();
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative"
            >
                <button
                    onClick={closeModal}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
                >
                    &times;
                </button>

                <h2 className="text-lg font-semibold mb-4">Create Category</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category Name
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            placeholder="Enter category name"
                        />
                        {errors.name && (
                            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Category Image
                        </label>
                        <div
                            className="relative border border-dashed border-gray-300 rounded-md p-4 bg-gray-50 hover:bg-gray-100 transition cursor-pointer text-center"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        setImageFile(file);
                                        setErrors((prev) => ({ ...prev, image: null }));
                                    }
                                }}
                                className="absolute inset-0 opacity-0 cursor-pointer"
                            />
                            <p className="text-sm text-gray-500">
                                Click to upload an image
                            </p>
                        </div>
                        {errors.image && (
                            <p className="text-xs text-red-500 mt-1">{errors.image}</p>
                        )}
                        {previewUrl && (
                            <img
                                src={previewUrl}
                                alt="Preview"
                                className="mt-3 h-32 w-full object-contain rounded-lg border border-gray-200 shadow-sm"
                            />
                        )}
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            className="px-4 py-2 cursor-pointer text-sm border rounded hover:bg-gray-100"
                            onClick={closeModal}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 cursor-pointer text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
