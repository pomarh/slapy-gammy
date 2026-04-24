import React, { useEffect } from "react";

function Cartproduct({ product, onClose }) {
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
            window.addEventListener("keydown".handleEsc);
            return () => window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    return (
        <>
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4" onClick={onClose}>
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="
                    relative
                    bg-white rounded-2xl
                    max-w-4xl w-full
                    overflow-hidden
                    shadow-2xl
                    grid md:grid-cols-2
                ">
                    {/* IMAGEN */}
                    <div className="bg-gray-100">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>

                    {/* INFO */}
                    <div className="p-6 md:p-8 flex flex-col justify-between">
                        {/* TOP */}
                        <div className="space-y-4">
                            {/* cerrar */}
                            <button
                                onClick={onClose}
                                className="
                                    absolute top-4 right-4
                                    bg-black/70 text-white
                                    w-10 h-10 rounded-full
                                    flex items-center justify-center
                                    text-lg font-bold
                                    hover:bg-primary hover:text-black
                                    transition
    ">
                                ✕
                            </button>

                            <h2 className="text-2xl md:text-3xl font-bold text-tertiary">{product.name}</h2>

                            <p className="text-gray-500">
                                Este mueble está diseñado con materiales de alta calidad, ideal para darle un toque moderno y elegante a tu hogar.
                            </p>

                            <p className="text-2xl font-bold text-primary">{product.price}</p>
                        </div>

                        {/* BOTONES */}
                        <div className="flex flex-col md:flex-row gap-3 mt-6">
                            <button
                                className="
                                flex-1
                                bg-secondary text-white py-3 rounded-lg
                                font-semibold
                                hover:bg-primary hover:text-black
                                transition
                            ">
                                Contactanos
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Cartproduct;
