"use client";

import { useEffect, useState, type FormEvent } from "react";
import { addRun, routesSelect, trucksSelect } from "./actions";
import Navbar from "@/components/Navbar";

type SelectOption = {
  id: number;
  name?: string;
  label?: string;
  placa?: string;
  codigo?: string;
};

export default function Page() {
  const [trucks, setTrucks] = useState<SelectOption[]>([]);
  const [routes, setRoutes] = useState<SelectOption[]>([]);
  const [truckId, setTruckId] = useState("");
  const [routeId, setRouteId] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    async function loadData() {
      const [truckData, routeData] = await Promise.all([
        trucksSelect(),
        routesSelect(),
      ]);

      setTrucks(truckData ?? []);
      setRoutes(routeData ?? []);
    }

    loadData();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!truckId || !routeId) {
      setMessage("Selecione um caminhão e uma rota.");
      return;
    }

    setLoading(true);
    setMessage("");

    const result = await addRun(Number(truckId), Number(routeId), []);

    setMessage(result?.message ?? "Caminhão adicionado à rota com sucesso.");
    setLoading(false);
  }

  const links = [
    { name: "Mapa", href: "/mapa" },
    { name: "Cadastrar", href: "/cadastro" },
    { name: "Início", href: "/" },
    { name: "Viagens", href: "/caminhao/rotas/percorrer" }
  ]

  const drops = [
    {
      name: "Caminhões",
      ways: [
        { name: "Lista", href: "/caminhao" },
        { name: "Adicionar", href: "/caminhao/add" },
        { name: "Rotas", href: "/caminhao/rotas" }
      ]
    }
  ]

  return (
    <div className="h-screen flex flex-col">
      <Navbar links={links} drops={drops} location={["Início", "Caminhões", "Rotas", "Viagens", "Adicionar"]} />
      <div
        className="p-6 w-full h-full flex flex-row gap-6 items-center justify-center"
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: 460,
            display: "grid",
            gap: 22,
            padding: 28,
            borderRadius: 24,
            border: "1px solid rgba(148, 163, 184, 0.2)",
            boxShadow: "0 24px 60px rgba(2, 6, 23, 0.72)",
            backdropFilter: "blur(10px)",
          }}
          className="bg-background2"
        >
          <div style={{ display: "grid", gap: 8 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 28,
                fontWeight: 700,
                color: "#f8fafc",
              }}
            >
              Adicionar caminhão à rota
            </h1>
          </div>

          <label style={{ display: "grid", gap: 10, fontWeight: 600, color: "#cbd5e1" }}>
            Caminhão
            <select
              value={truckId}
              onChange={(event) => setTruckId(event.target.value)}
              style={{
                appearance: "none",
                width: "100%",
                padding: "14px 16px",
                borderRadius: 14,
                border: "1px solid #2f2f2f",
                color: "#e2e8f0",
                fontSize: 15,
                outline: "none",
                boxShadow: "0 1px 2px rgba(15, 23, 42, 0.35)",
              }}
              className="bg-background3"
            >
              <option value="">Selecione um caminhão</option>
              {trucks.map((truck) => (
                <option key={truck.id} value={String(truck.id)}>
                  {truck.name ?? truck.placa ?? truck.label ?? truck.codigo ?? `Caminhão ${truck.id}`}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "grid", gap: 10, fontWeight: 600, color: "#cbd5e1" }}>
            Rota
            <select
              value={routeId}
              onChange={(event) => setRouteId(event.target.value)}
              style={{
                appearance: "none",
                width: "100%",
                padding: "14px 16px",
                borderRadius: 14,
                border: "1px solid #2f2f2f",
                color: "#e2e8f0",
                fontSize: 15,
                outline: "none",
                boxShadow: "0 1px 2px rgba(15, 23, 42, 0.35)",
              }}
              className="bg-background3"
            >
              <option value="">Selecione uma rota</option>
              {routes.map((route) => (
                <option key={route.id} value={String(route.id)}>
                  {route.name ?? route.label ?? route.codigo ?? `Rota ${route.id}`}
                </option>
              ))}
            </select>
          </label>

          <button
            type="submit"
            disabled={loading || !truckId || !routeId}
            style={{
              border: "none",
              borderRadius: 14,
              padding: "14px 18px",
              fontSize: 16,
              fontWeight: 700,
              cursor: loading || !truckId || !routeId ? "not-allowed" : "pointer",
              color: "#fff",
              background: loading || !truckId || !routeId
                ? "#94a3b8"
                : "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
              boxShadow: loading || !truckId || !routeId ? "none" : "0 12px 30px rgba(124, 58, 237, 0.35)",
              transition: "all 0.2s ease",
            }}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>

          {message ? (
            <p
              aria-live="polite"
              style={{
                margin: 0,
                padding: "12px 14px",
                borderRadius: 12,
                background: "rgba(59, 130, 246, 0.12)",
                color: "#dbeafe",
                fontWeight: 600,
                border: "1px solid rgba(96, 165, 250, 0.45)",
              }}
            >
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );
}