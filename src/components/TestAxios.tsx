"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TestAxios() {
    interface Post { id: number; title: string; body: string }
    const [data, setData] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts");
                setData(res.data);
            } catch (err) {
                const message = err instanceof Error ? err.message : "Failed to fetch";
                setError(message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="p-6 space-y-4">
            <h1 className="text-xl font-bold">Posts</h1>
            {data.slice(0, 5).map((post) => (
                <div key={post.id} className="border p-3 rounded shadow-sm">
                    <h2 className="font-semibold">{post.title}</h2>
                    <p className="text-sm">{post.body}</p>
                </div>
            ))}
        </div>
    );
}
