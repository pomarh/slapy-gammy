import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { logout } = useAuth();

    const [role, setRole] = useState(null);
    const [loadingRole, setLoadingRole] = useState(true);

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const [form, setForm] = useState({
        nombre: "",
        precio: 0,
        stock: 0,
        descripcion: "",
        imagen_url: "",
        calificacion: 0,
    });

    const [editingId, setEditingId] = useState(null);

    // ROLE
    useEffect(() => {
        const getRole = async () => {
            if (!user) return;

            const { data, error } = await supabase.from("profile").select("rol").eq("id", user.id).single();

            if (!error) {
                setRole(data?.rol || "user");
            } else {
                setRole("user");
            }

            setLoadingRole(false);
        };

        getRole();
    }, [user]);

    //  PRODUCTS
    const fetchProducts = async () => {
        const { data } = await supabase.from("productos").select("*");
        setProducts(data || []);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    //  INPUT CHANGE
    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: name === "precio" || name === "stock" || name === "calificacion" ? (value === "" ? 0 : Number(value)) : value,
        });
    };

    // ➕ CREATE / UPDATE
    const handleSubmit = async (e) => {
        e.preventDefault();

        let imageUrl = "";

        if (file) {
            imageUrl = await uploadImage(file);
        }

        const payload = {
            nombre: form.nombre,
            precio: Number(form.precio) || 0,
            stock: Number(form.stock) || 0,
            descripcion: form.descripcion,
            imagen_url: imageUrl,
            calificacion: Number(form.calificacion) || 0,
        };

        const { error } = await supabase.from("productos").insert([payload]);

        if (error) {
            console.log("Error:", error.message);
            return;
        }

        setForm({
            nombre: "",
            precio: 0,
            stock: 0,
            descripcion: "",
            imagen_url: "",
            calificacion: 0,
        });

        setFile(null);
        fetchProducts();
    };

    // funcion para subir imagenes
    const uploadImage = async (file) => {
        const fileName = `${Date.now()}-${file.name}`;

        const { data, error } = await supabase.storage.from("productos").upload(fileName, file);

        if (error) {
            console.log("Error upload:", error.message);
            return null;
        }

        const { data: publicUrl } = supabase.storage.from("productos").getPublicUrl(fileName);

        return publicUrl.publicUrl;
    };

    //  DELETE
    const handleDelete = async (id) => {
        await supabase.from("productos").delete().eq("id", id);
        fetchProducts();
    };

    //  EDIT
    const handleEdit = (product) => {
        setForm(product);
        setEditingId(product.id);
    };

    //  GUARDS
    if (user === undefined) {
        return <p>Cargando...</p>;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    if (loadingRole) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Cargando...</p>
            </div>
        );
    }

    if (role !== "administrador") return <Navigate to="/" />;

    // cerrar secion
    const handleLogout = async () => {
        await supabase.auth.signOut(); // cierra sesión en supabase
        navigate("/"); // redirige
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 md:p-10">
            {/* HEADER */}
            <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>

            {/* FORM CARD */}
            <div className="bg-white p-6 rounded-xl shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">{editingId ? "Editar producto" : "Crear producto"}</h2>

                <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
                    <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} className="border p-2 rounded" />

                    <input
                        name="precio"
                        type="number"
                        placeholder="Precio"
                        value={form.precio ?? ""}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={handleChange} className="border p-2 rounded" />

                    <input
                        name="calificacion"
                        type="number"
                        placeholder="Calificación"
                        value={form.calificacion}
                        onChange={handleChange}
                        className="border p-2 rounded"
                    />

                    <input
                        type="file"
                        accept="image/*"
                        name="imagen_url"
                        placeholder="URL de imagen"
                        value={form.imagen_url}
                        onChange={(e) => setFile(e.target.files[0])}
                        className="border p-2 rounded md:col-span-2"
                    />

                    <textarea
                        name="descripcion"
                        placeholder="Descripción"
                        value={form.descripcion}
                        onChange={handleChange}
                        className="border p-2 rounded md:col-span-2"
                    />

                    <button type="submit" disabled={loading} className="bg-green-600 text-white py-2 rounded md:col-span-2 hover:bg-green-700">
                        {loading ? "Guardando..." : editingId ? "Actualizar producto" : "Crear producto"}
                    </button>
                </form>
            </div>

            {/* PRODUCTS LIST */}
            <div className="grid md:grid-cols-3 gap-6">
                {products.map((p) => (
                    <div key={p.id} className="bg-white rounded-xl shadow overflow-hidden">
                        {p.imagen_url && <img src={p.imagen_url} className="h-40 w-full object-cover rounded" alt={p.nombre} />}

                        <div className="p-4">
                            <h2 className="text-lg font-bold">{p.nombre}</h2>
                            <p className="text-sm text-gray-600">{p.descripcion}</p>

                            <div className="mt-2 text-sm">
                                bs. {p.precio} |stock {p.stock} | ⭐ {p.calificacion}
                            </div>

                            <div className="flex gap-2 mt-4">
                                <button onClick={() => handleEdit(p)} className="bg-blue-500 text-white px-3 py-1 rounded">
                                    Editar
                                </button>

                                <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mb-6 mt-10">
                <h1 className="text-3xl font-bold">Dashboard Admin</h1>

                <button onClick={handleLogout} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                    Cerrar sesión
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
