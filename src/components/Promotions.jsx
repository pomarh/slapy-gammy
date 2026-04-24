import React, { useState } from "react";
import ModalPromo from "./ModalPromo";

function Promotions() {
    const promos = [
        {
            id: 1,
            title: "Descuento 20%",
            description: "En muebles de tematica",
            image: "/img/promo1.jpg",
        },
        {
            id: 2,
            title: "Envío Gratis",
            description: "En compras mayores a $200",
            image: "/img/promo2.jpg",
        },
        {
            id: 3,
            title: "Nuevo Ingreso",
            description: "Colección moderna disponible",
            image: "/img/promo3.jpg",
        },
    ];

    // estado de promociones
    const [selectedPromo, setselectedPromo] = useState(null);

    return (
        <section className="bg-tertiary py-16 px-6 md:px-20">
            {selectedPromo && <ModalPromo promo={selectedPromo} onClose={() => setselectedPromo(null)} />}
            {/* TITULO */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-neutral">Promociones</h2>
                <p className="text-gray-300 mt-3">Aprovecha nuestras mejores ofertas</p>
            </div>

            {/* GRID */}
            <div className="grid gap-8 md:grid-cols-3">
                {promos.map((promo) => (
                    <div
                        key={promo.id}
                        onClick={() => setselectedPromo(promo)}
                        className="
                            relative rounded-2xl overflow-hidden
                            group cursor-pointer
                        ">
                        {/* IMAGEN */}
                        <img src={promo.image} alt={promo.title} className="w-full h-64 object-cover group-hover:scale-110 transition duration-300" />

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-5">
                            <h3 className="text-xl font-bold text-white">{promo.title}</h3>
                            <p className="text-gray-200 text-sm">{promo.description}</p>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setselectedPromo(promo);
                                }}
                                className="mt-3 bg-primary text-black px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary transition">
                                Ver oferta
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Promotions;
