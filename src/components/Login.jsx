import React, { useState } from "react";
//import { supabase } from "../lib/supabase";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login({ onClose }) {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (!form.email || !form.password) {
            setError("Todos los campos son obligatorios");
            return;
        }

        try {
            setLoading(true);

            const { error } = await login(form.email, form.password);

            if (error) {
                setError(error.message);
                return;
            }

            navigate("/dashboard", { replace: true });

            // esperar a que Supabase actualice sesión
            navigate("/dashboard");
        } catch (err) {
            setError("Error inesperado");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full">
            {" "}
            {/* Quitamos section, bg-white, shadow y redondeados extra */}
            <h2 className="text-3xl font-bold text-center text-tertiary mb-6">Iniciar Sesión</h2>
            {error && <p className="text-red-500 text-center mb-4 text-sm">{error}</p>}
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <input
                    type="email"
                    name="email"
                    placeholder="Correo electrónico"
                    value={form.email}
                    onChange={handleChange}
                    className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none"
                />

                <div className="relative">
                    <input
                        type={show ? "text" : "password"}
                        name="password"
                        placeholder="Contraseña"
                        value={form.password}
                        onChange={handleChange}
                        className="border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-primary outline-none w-full"
                    />
                    <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                        {show ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-primary hover:text-black transition">
                    {loading ? "Ingresando..." : "Ingresar"}
                </button>
            </form>
            <p className="text-center text-sm mt-6">
                ¿No tienes cuenta?{" "}
                <Link to="/register" className="text-primary font-semibold">
                    Regístrate
                </Link>
            </p>
        </div>
    );
}

export default Login;
