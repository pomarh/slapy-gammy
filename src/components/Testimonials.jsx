import React from "react";

function Testimonials() {
    const comments = [
        {
            id: 1,
            name: "Juan Pérez",
            text: "Excelente calidad, los muebles superaron mis expectativas.",
            rating: 5,
        },
        {
            id: 2,
            name: "María López",
            text: "Muy buen servicio y entrega rápida. Totalmente recomendado.",
            rating: 4,
        },
        {
            id: 3,
            name: "Carlos Gómez",
            text: "Diseño moderno y materiales de primera. Volvería a comprar.",
            rating: 5,
        },
    ];

    return (
        <section className="bg-neutral py-16 px-6 md:px-20">
            {/* TITULO */}
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-tertiary">Opiniones de nuestros clientes</h2>
                <p className="text-gray-500 mt-3">Lo que dicen quienes ya confiaron en nosotros</p>
            </div>

            {/* GRID */}
            <div className="grid gap-8 md:grid-cols-3">
                {comments.map((comment) => (
                    <div
                        key={comment.id}
                        className="
                            bg-white rounded-2xl p-6 shadow-md
                            hover:shadow-xl hover:-translate-y-2
                            transition duration-300
                        ">
                        {/* ESTRELLAS */}
                        <div className="flex mb-3">
                            {[...Array(comment.rating)].map((_, i) => (
                                <span key={i} className="text-yellow-400 text-lg">
                                    ★
                                </span>
                            ))}
                        </div>

                        {/* TEXTO */}
                        <p className="text-gray-600 italic">“{comment.text}”</p>

                        {/* USUARIO */}
                        <div className="mt-4 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center font-bold text-black">
                                {comment.name.charAt(0)}
                            </div>

                            <div>
                                <p className="font-semibold text-tertiary">{comment.name}</p>
                                <p className="text-sm text-gray-400">Cliente verificado</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Testimonials;
