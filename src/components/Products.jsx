import React, { useState } from "react";
import Cartproduct from "./Cartproduct";

function Products() {
    const products = [
        {
            id: 1,
            name: "Estante de cubos de Mario Bross",
            price: "$250",
            image: "/img/product1.jpg",
        },
        {
            id: 2,
            name: "Bufetera de Sala ",
            price: "$120",
            image: "/img/product2.jpg",
        },
        {
            id: 3,
            name: "Mesa esquina de sala ",
            price: "$400",
            image: "/img/product3.jpg",
        },
        {
            id: 4,
            name: "Escritorio Moderna",
            price: "$350",
            image: "/img/product4.jpg",
        },
    ];

    // estados para los productos
    const [selectProduct, setSelectProduct] = useState(null);
    return (
        <>
            <section className="bg-neutral py-16 px-6 md:px-20">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-tertiary">Nuestros Productos</h2>
                    <p className="text-gray-500 mt-3">Diseños únicos con estilo moderno</p>
                </div>

                {selectProduct && <Cartproduct product={selectProduct} onClose={() => setSelectProduct(null)} />}

                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => setSelectProduct(product)}
                            className="
                            bg-white rounded-2xl overflow-hidden shadow-md
                            hover:shadow-xl hover:-translate-y-2
                            transition duration-300
                        ">
                            {/* IMAGEN */}
                            <div className="relative">
                                <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />

                                {/* etiqueta tipo Nintendo */}
                                <span className="absolute top-3 left-3 bg-primary text-black text-xs px-3 py-1 rounded-full font-semibold">
                                    Nuevo
                                </span>
                            </div>

                            {/* INFO */}
                            <div className="p-5 flex flex-col gap-3">
                                <h3 className="text-lg font-bold text-tertiary">{product.name}</h3>

                                <p className="text-primary font-bold text-xl">{product.price}</p>

                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectProduct(product);
                                    }}
                                    className="
                                    mt-2 bg-secondary text-white py-2 rounded-lg
                                    font-semibold
                                    hover:bg-primary hover:text-black
                                    transition
                                ">
                                    Ver más
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
}

export default Products;
