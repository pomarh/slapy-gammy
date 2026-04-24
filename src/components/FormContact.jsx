import React, { useState } from "react";
import emailjs from "@emailjs/browser";

function FormContact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // ✨ VALIDACIÓN
    const validate = () => {
        let newErrors = {};

        if (!form.name.trim()) {
            newErrors.name = "El nombre es obligatorio";
        }

        if (!form.email.trim()) {
            newErrors.email = "El correo es obligatorio";
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = "Correo inválido";
        }

        if (!form.message.trim()) {
            newErrors.message = "El mensaje es obligatorio";
        }

        return newErrors;
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    // 📩 ENVÍO
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setLoading(true);

            await emailjs.send(
                "service_1viv0po",
                "template_7z7jiw5",
                {
                    from_name: form.name,
                    from_email: form.email,
                    message: form.message,
                },
                "dXqo-HA8TV4G3rvpB",
            );

            setSuccess(true);
            setForm({ name: "", email: "", message: "" });
            setErrors({});
        } catch (error) {
            console.error(error);
            alert("Error al enviar el mensaje");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-tertiary py-16 px-6 md:px-20">
            <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl">
                <h2 className="text-3xl font-bold text-tertiary mb-6 text-center">Contáctanos</h2>

                {success && <p className="text-green-600 text-center mb-4">✅ Mensaje enviado correctamente</p>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    {/* NOMBRE */}
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Tu nombre"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary"
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>

                    {/* EMAIL */}
                    <div>
                        <input
                            type="email"
                            name="email"
                            placeholder="Tu correo"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary"
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>

                    {/* MENSAJE */}
                    <div>
                        <textarea
                            name="message"
                            placeholder="Tu mensaje"
                            value={form.message}
                            onChange={handleChange}
                            rows="5"
                            className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-primary"></textarea>
                        {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                    </div>

                    {/* BOTÓN */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="
                            bg-secondary text-white py-3 rounded-lg
                            font-semibold
                            hover:bg-primary hover:text-black
                            transition
                            disabled:opacity-50
                        ">
                        {loading ? "Enviando..." : "Enviar mensaje"}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default FormContact;
