"use client";

import { useEffect, useState, type FormEvent } from "react";
import { addRun, routesSelect, trucksSelect } from "./actions";

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

  return (
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 16, maxWidth: 420 }}>
      <h1>Adicionar caminhão à rota</h1>

      <label style={{ display: "grid", gap: 8 }}>
        Caminhão
        <select value={truckId} onChange={(event) => setTruckId(event.target.value)}>
          <option value="">Selecione um caminhão</option>
          {trucks.map((truck) => (
            <option key={truck.id} value={String(truck.id)}>
              {truck.name ?? truck.placa ?? truck.label ?? truck.codigo ?? `Caminhão ${truck.id}`}
            </option>
          ))}
        </select>
      </label>

      <label style={{ display: "grid", gap: 8 }}>
        Rota
        <select value={routeId} onChange={(event) => setRouteId(event.target.value)}>
          <option value="">Selecione uma rota</option>
          {routes.map((route) => (
            <option key={route.id} value={String(route.id)}>
              {route.name ?? route.label ?? route.codigo ?? `Rota ${route.id}`}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" disabled={loading || !truckId || !routeId}>
        {loading ? "Salvando..." : "Salvar"}
      </button>

      {message ? <p>{message}</p> : null}
    </form>
  );
}