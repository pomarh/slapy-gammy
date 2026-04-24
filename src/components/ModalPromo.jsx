import React, { useEffect } from "react";

function ModalPromo({ promo, onClose }) {
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
            <div
                className="
                fixed inset-0 z-50
                bg-black/70 backdrop-blur-sm
                flex items-center justify-center
                px-4
                animate-fadeIn
            "
                onClick={onClose}>
                {/* CARD */}
                <div
                    onClick={(e) => e.stopPropagation()}
                    className="
                    bg-white rounded-3xl overflow-hidden
                    max-w-2xl w-full
                    shadow-2xl
                    transform transition-all duration-300
                    scale-100
                ">
                    {/* IMAGEN + GRADIENT */}
                    <div className="relative">
                        <img src={promo.image} alt={promo.title} className="w-full h-72 object-cover" />

                        {/* overlay degradado */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                        {/* badge */}
                        <span className="absolute top-4 left-4 bg-primary text-black px-3 py-1 text-xs rounded-full font-bold">Oferta</span>

                        {/* botón cerrar */}
                        <button
                            onClick={onClose}
                            className="
                            absolute top-4 right-4
                            bg-white/80 backdrop-blur
                            w-10 h-10 rounded-full
                            flex items-center justify-center
                            text-lg font-bold
                            hover:bg-secondary hover:text-white
                            transition
                        ">
                            ✕
                        </button>
                    </div>

                    {/* CONTENIDO */}
                    <div className="p-6 md:p-8 space-y-4 text-center md:text-left">
                        <h2 className="text-2xl md:text-3xl font-bold text-tertiary">{promo.title}</h2>

                        <p className="text-gray-600 text-sm md:text-base">{promo.description}</p>

                        {/* CTA */}
                        <button
                            className="
                            w-full md:w-auto
                            bg-secondary text-white
                            px-6 py-3 rounded-xl
                            font-semibold
                            hover:bg-primary hover:text-black
                            transition
                            shadow-md
                        ">
                            Aprovechar oferta
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ModalPromo;
