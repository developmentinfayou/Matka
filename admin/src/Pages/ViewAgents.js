import React, { useState, useEffect } from "react";
import axiosInstance from "../Utils/axiosInstance";

export default function ViewAgents() {
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const response = await axiosInstance.get("/admin/get-agents");
            setAgents(response.data);
        } catch (err) {
            alert("Failed to fetch agents");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">All Agents</h2>
            <table className="min-w-full bg-white border">
                <thead className="bg-gray-200">
                    <tr>
                        <th className="px-4 py-2 border">ID</th>
                        <th className="px-4 py-2 border">Name</th>
                        <th className="px-4 py-2 border">Mobile</th>
                        <th className="px-4 py-2 border">Wallet</th>
                        <th className="px-4 py-2 border">Share</th>
                        <th className="px-4 py-2 border">Commsion</th>
                        <th className="px-4 py-2 border">State</th>
                        <th className="px-4 py-2 border">Created By</th>
                    </tr>
                </thead>
                <tbody>
                    {agents.map((agent) => (
                        <tr key={agent.id}>
                            <td className="px-4 py-2 border">{agent.id}</td>
                            <td className="px-4 py-2 border">{agent.name}</td>
                            <td className="px-4 py-2 border">{agent.mobile}</td>
                            <td className="px-4 py-2 border">{agent.wallet}</td>
                            <td className="px-4 py-2 border">{agent.share}%</td>
                            <td className="px-4 py-2 border">{agent.commission}%</td>
                            <td className="px-4 py-2 border">{agent.state}</td>
                            <td className="px-4 py-2 border">{agent.REFER_BY}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
