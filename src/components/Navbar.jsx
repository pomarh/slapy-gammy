import React, { useState } from "react";
import { Link } from "react-router-dom";
import Login from "../components/Login";

function Navbar() {
    const [menu, setMenu] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    // funcion para el menu mobil
    function menuToggle() {
        setMenu(!menu);
    }

    const closeMenu = () => {
        setMenu(false);
    };

    return (
        <>
            <nav className="bg-tertiary text-neutral shadow-md relative">
                <div className="flex items-center justify-between h-16 px-4 md:px-20">
                    <div className="flex items-center gap-3">
                        <button className="text-2xl md:hidden text-secondary" onClick={menuToggle}>
                            {menu ? "✕" : "☰"}
                        </button>

                        <Link to={"/"} className="flex items-center">
                            <span className="text-secondary font-extrabold text-xl">Slapy</span>
                            <span className="text-primary font-bold text-xl">Gammy</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex gap-10">
                        <Link to={"/"} className="hover:text-primary">
                            Inicio
                        </Link>
                        <Link to={"/"} className="hover:text-primary">
                            Nosotros
                        </Link>
                        <Link to={"/"} className="hover:text-primary">
                            Galería
                        </Link>
                        <Link to={"/"} className="hover:text-primary">
                            Contacto
                        </Link>
                    </div>

                    <div>
                        <button
                            onClick={() => setShowLogin(true)}
                            className="bg-primary text-black px-4 py-1 rounded-lg font-semibold text-sm hover:bg-secondary transition">
                            Regístrate
                        </button>
                    </div>
                </div>

                <div
                    className={`${menu ? "flex" : "hidden"} 
                flex-col absolute top-16 left-0 w-full bg-tertiary p-5 gap-5 md:hidden`}>
                    <Link to={"/"} onClick={closeMenu} className="text-center hover:text-primary">
                        Inicio
                    </Link>
                    <Link to={"/"} onClick={closeMenu} className="text-center hover:text-primary">
                        Nosotros
                    </Link>
                    <Link to={"/"} onClick={closeMenu} className="text-center hover:text-primary">
                        Galería
                    </Link>
                    <Link to={"/"} onClick={closeMenu} className="text-center hover:text-primary">
                        Contacto
                    </Link>
                </div>
                {showLogin && (
                    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
                        <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
                            {/* BOTÓN CERRAR */}
                            <button onClick={() => setShowLogin(false)} className="absolute top-3 right-3 text-xl">
                                ✕
                            </button>

                            {/* AQUÍ TU LOGIN */}
                            <Login onClose={() => setShowLogin(false)} />
                        </div>
                    </div>
                )}
            </nav>
        </>
    );
}

export default Navbar;
