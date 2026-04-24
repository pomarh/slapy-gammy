import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <>
            <footer className="bg-tertiary text-neutral">
                <div className="max-w-7xl mx-auto px-6 md:px-20 py-12 grid gap-10 md:grid-cols-4">
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold">
                            <span className="text-secondary">Slapy</span>
                            <span className="text-primary">Gammy</span>
                        </h2>
                        <p className="text-sm text-gray-400">Muebles a medida diseñados para transformar tu hogar en un espacio único.</p>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-white">Navegación</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link className="hover:text-primary transition">Inicio</Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition">Nosotros</Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition">Galería</Link>
                            </li>
                            <li>
                                <Link className="hover:text-primary transition">Contacto</Link>
                            </li>
                        </ul>
                    </div>

                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-white">Contacto</h3>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Email: contacto@slapygammy.com</li>
                            <li>Tel: +591 77778888</li>
                            <li>La Paz, Bolivia</li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-white">¿Listo para empezar?</h3>
                        <p className="text-sm text-gray-400">Contáctanos y crea el mueble perfecto para tu hogar.</p>
                        <button className="bg-primary text-black px-5 py-2 rounded-lg font-semibold text-sm hover:bg-secondary transition">
                            Solicitar diseño
                        </button>
                    </div>
                </div>

                <div className="border-t border-gray-700 py-4 text-center text-sm text-gray-400">
                    © {new Date().getFullYear()} SlapyGammy. Todos los derechos reservados.
                </div>
            </footer>
        </>
    );
}

export default Footer;
