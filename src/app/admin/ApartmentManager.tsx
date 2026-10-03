"use client";

import { useCallback, useEffect, useState } from "react";
import type { Apartment } from "./lib/apartments";

const blank = {
  projectId: "p1",
  number: "",
  floor: "",
  rooms: "",
  area: "",
  price: "",
  status: "AVAILABLE",
};

export default function ApartmentManager() {
  const [items, setItems] = useState<Apartment[]>([]);
  const [form, setForm] = useState(blank);
  const [editing, setEditing] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const refresh = useCallback(async () => {
    const response = await fetch(
      `/admin/api/get-apartments?q=${encodeURIComponent(query)}`,
      { cache: "no-store" },
    );
    const data = await response.json();
    if (!response.ok)
      throw new Error(data.error || "Байрны жагсаалтыг татаж чадсангүй");
    setItems(data.apartments);
  }, [query]);
  useEffect(() => {
    let active = true;
    fetch(`/admin/api/get-apartments?q=${encodeURIComponent(query)}`, {
      cache: "no-store",
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Байрны жагсаалтыг татаж чадсангүй");
        return data.apartments as Apartment[];
      })
      .then((data) => {
        if (active) setItems(data);
      })
      .catch((e: Error) => {
        if (active) setError(e.message);
      });
    return () => {
      active = false;
    };
  }, [query]);

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    const payload = {
      ...form,
      floor: form.floor ? Number(form.floor) : null,
      rooms: form.rooms ? Number(form.rooms) : null,
      area: Number(form.area),
      price: Number(form.price),
      ...(editing ? { id: editing } : {}),
    };
    const response = await fetch(
      `/admin/api/${editing ? "update-apartment" : "create-apartment"}`,
      {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
    );
    const data = await response.json();
    if (!response.ok) {
      setError(data.error || "Хадгалж чадсангүй");
      return;
    }
    setForm(blank);
    setEditing(null);
    await refresh();
  }
  async function edit(item: Apartment) {
    const response = await fetch(
      `/admin/api/get-apartment?id=${encodeURIComponent(item.id)}`,
      { cache: "no-store" },
    );
    const result = await response.json();
    if (!response.ok) {
      setError(result.error || "Байрны мэдээллийг татаж чадсангүй");
      return;
    }
    item = result.apartment as Apartment;
    setEditing(item.id);
    setForm({
      projectId: item.projectId,
      number: item.number,
      floor: item.floor?.toString() || "",
      rooms: item.rooms?.toString() || "",
      area: String(item.area),
      price: String(item.price),
      status: item.status,
    });
  }
  async function remove(id: string) {
    if (!window.confirm("Энэ байрыг устгах уу?")) return;
    const response = await fetch(
      `/admin/api/delete-apartment?id=${encodeURIComponent(id)}`,
      { method: "DELETE" },
    );
    if (!response.ok) {
      setError("Байрыг устгаж чадсангүй");
      return;
    }
    await refresh();
  }
  const input =
    "min-w-0 rounded border border-outline-variant bg-surface-container px-3 py-2 text-sm text-on-surface";

  return (
    <section className="glass-card p-4 sm:p-5 lg:col-span-2 space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="font-headline-sm text-base font-semibold">
          Байрны удирдлага
        </h2>
        <input
          className={input}
          placeholder="Байрны дугаар хайх"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <form
        onSubmit={save}
        className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2 md:grid-cols-4"
      >
        <input
          className={input}
          required
          placeholder="Төсөл ID (p1)"
          value={form.projectId}
          onChange={(e) => setForm({ ...form, projectId: e.target.value })}
        />
        <input
          className={input}
          required
          placeholder="Байр №"
          value={form.number}
          onChange={(e) => setForm({ ...form, number: e.target.value })}
        />
        <input
          className={input}
          type="number"
          placeholder="Давхар"
          value={form.floor}
          onChange={(e) => setForm({ ...form, floor: e.target.value })}
        />
        <input
          className={input}
          type="number"
          placeholder="Өрөө"
          value={form.rooms}
          onChange={(e) => setForm({ ...form, rooms: e.target.value })}
        />
        <input
          className={input}
          required
          type="number"
          min="0"
          step="0.01"
          placeholder="Талбай м²"
          value={form.area}
          onChange={(e) => setForm({ ...form, area: e.target.value })}
        />
        <input
          className={input}
          required
          type="number"
          min="0"
          placeholder="Үнэ ₮"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <select
          className={input}
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="AVAILABLE">Боломжтой</option>
          <option value="RESERVED">Захиалгатай</option>
          <option value="SOLD">Борлуулсан</option>
        </select>
        <div className="flex flex-wrap gap-2 min-[420px]:col-span-2 md:col-span-1">
          <button className="flex-1 rounded bg-primary-container px-3 py-2 text-sm font-semibold text-surface md:flex-none">
            {editing ? "Шинэчлэх" : "Нэмэх"}
          </button>
          {editing && (
            <button
              type="button"
              className="flex-1 rounded border border-outline-variant px-3 py-2 text-sm md:flex-none"
              onClick={() => {
                setForm(blank);
                setEditing(null);
              }}
            >
              Болих
            </button>
          )}
        </div>
      </form>
      {error && (
        <p role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-outline-variant text-on-surface-variant">
              <th className="p-2">Байр</th>
              <th className="p-2">Төсөл</th>
              <th className="p-2">Давхар</th>
              <th className="p-2">Талбай</th>
              <th className="p-2">Үнэ</th>
              <th className="p-2">Төлөв</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-outline-variant/50">
                <td className="p-2">№{item.number}</td>
                <td className="p-2">{item.projectId}</td>
                <td className="p-2">{item.floor ?? "—"}</td>
                <td className="p-2">{item.area} м²</td>
                <td className="p-2">{item.price.toLocaleString("mn-MN")} ₮</td>
                <td className="p-2">{item.status}</td>
                <td className="p-2 whitespace-nowrap">
                  <button
                    onClick={() => edit(item)}
                    className="mr-2 text-primary-container"
                  >
                    Засах
                  </button>
                  <button
                    onClick={() => remove(item.id)}
                    className="text-error"
                  >
                    Устгах
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!items.length && (
          <p className="p-3 text-sm text-on-surface-variant">
            Байр бүртгэгдээгүй байна.
          </p>
        )}
      </div>
    </section>
  );
}
