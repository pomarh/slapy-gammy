import React from "react";
import Navbar from "./Navbar";

function Header() {
    return (
        <>
            <header className=" h-dvh bg-[url(`/img/hero.jpg`)] bg-cover bg-center">
                <div className="h-dvh bg-gray-800/50">
                    <Navbar />
                    <div className=" h-full flex flex-col justify-center items-center lg:items-start gap-6 px-6 md:px-20 text-center lg:text-left ">
                        <p className="text-[#BF0500] uppercase font-semibold text-xl">Calidad que perdura</p>
                        <h1 className="text-neutral text-6xl font-bold uppercase text-center lg:text-left lg:text-7xl">Muebles a medida</h1>
                        <p className="text-neutral text-center text-xl lg:text-left">Transforma tu casa en el hogar que siempre soñaste</p>
                        <button className="bg-secondary text-black px-6 py-3 lg:px-8 lg:py-5 lg:text-xl rounded-lg font-semibold text-sm hover:bg-secondary transition ">
                            Contactanos
                        </button>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
