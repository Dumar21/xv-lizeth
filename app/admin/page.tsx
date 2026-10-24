"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import { EVENT } from "@/lib/event";
import Ambient from "@/components/Ambient";
import { Divider } from "@/components/Ornaments";

type Guest = {
  id: string;
  code: string;
  name: string;
  phone: string | null;
  max_passes: number;
  confirmed_passes: number;
  status: string;
  message: string | null;
  opened_at: string | null;
};

type Filter = "todos" | "confirmado" | "pendiente" | "no_asiste";

const field =
  "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-claro outline-none transition placeholder:text-lila/50 focus:border-oro/70 focus:bg-white/10";

const statusStyle: Record<string, string> = {
  confirmado: "border-emerald-300/40 bg-emerald-400/10 text-emerald-200",
  pendiente: "border-oro/50 bg-oro/10 text-oro-claro",
  no_asiste: "border-rose-300/40 bg-rose-400/10 text-rose-200",
};

const statusLabel: Record<string, string> = {
  confirmado: "Confirmado",
  pendiente: "Pendiente",
  no_asiste: "No asiste",
};

const smallBtn = "rounded-full border px-4 py-2 text-sm transition active:scale-95";

export default function Admin() {
  const [logged, setLogged] = useState<boolean | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [passes, setPasses] = useState(1);
  const [filter, setFilter] = useState<Filter>("todos");
  const [query, setQuery] = useState("");
  const [copied, setCopied] = useState<string | null>(null);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    const { data } = await supabase.from("guests").select("*").order("created_at", { ascending: false });
    setGuests(data ?? []);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setLogged(!!data.session);
      if (data.session) load();
    });
  }, [load]);

  async function login() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return setError("Correo o contraseña incorrectos");
    setError("");
    setLogged(true);
    load();
  }

  async function logout() {
    await supabase.auth.signOut();
    setLogged(false);
    setGuests([]);
  }

  async function add() {
    if (!name.trim()) return;
    const { error } = await supabase
      .from("guests")
      .insert({ name: name.trim(), phone: phone.trim() || null, max_passes: passes });
    if (error) return setNotice("No se pudo agregar el invitado. Inténtalo de nuevo.");
    setNotice("");
    setName("");
    setPhone("");
    setPasses(1);
    load();
  }

  async function remove(id: string) {
    const { error } = await supabase.from("guests").delete().eq("id", id);
    setConfirmId(null);
    if (error) return setNotice("No se pudo eliminar el invitado. Inténtalo de nuevo.");
    setNotice("");
    load();
  }

  function copy(g: Guest) {
    navigator.clipboard.writeText(link(g.code));
    setCopied(g.id);
    setTimeout(() => setCopied((c) => (c === g.id ? null : c)), 1800);
  }

  const link = (code: string) => `${window.location.origin}/i/${code}`;

  const reminder = (g: Guest) => g.status === "pendiente" && !!g.opened_at;

  const whatsapp = (g: Guest) => {
    const text = reminder(g)
      ? `Hola ${g.name}, te recordamos confirmar tu asistencia a los XV años de ${EVENT.shortName} aquí: ${link(g.code)}`
      : `Hola ${g.name}, estás invitado a los XV años de ${EVENT.shortName}. Abre tu invitación aquí: ${link(g.code)}`;
    return `https://wa.me/${(g.phone ?? "").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;
  };

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return guests.filter((g) => (filter === "todos" || g.status === filter) && (!q || g.name.toLowerCase().includes(q)));
  }, [guests, filter, query]);

  if (logged === null) return null;

  if (!logged) {
    return (
      <main className="relative flex min-h-svh items-center justify-center px-6">
        <Ambient />
        <form
          onSubmit={(e) => {
            e.preventDefault();
            login();
          }}
          className="frame relative z-10 flex w-full max-w-sm flex-col gap-4 p-8"
        >
          <h1 className="gold-text mx-auto inline-block px-3 py-1 font-script text-6xl">Panel XV</h1>
          <Divider className="mx-auto" />
          <label htmlFor="email" className="sr-only">
            Correo
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            className={field}
          />
          <label htmlFor="password" className="sr-only">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className={field}
          />
          {error && (
            <p role="alert" className="text-sm text-rose-200">
              {error}
            </p>
          )}
          <button type="submit" className="btn-gold">
            Entrar
          </button>
        </form>
      </main>
    );
  }

  const confirmed = guests.filter((g) => g.status === "confirmado");
  const pending = guests.filter((g) => g.status === "pendiente");
  const declined = guests.filter((g) => g.status === "no_asiste");
  const people = confirmed.reduce((s, g) => s + g.confirmed_passes, 0);
  const totalPasses = guests.reduce((s, g) => s + g.max_passes, 0);
  const answered = guests.length ? Math.round(((confirmed.length + declined.length) / guests.length) * 100) : 0;

  const stats: [string, number][] = [
    ["Invitados", guests.length],
    ["Confirmados", confirmed.length],
    ["Pendientes", pending.length],
    ["No asisten", declined.length],
    ["Personas", people],
  ];

  const tabs: [Filter, string, number][] = [
    ["todos", "Todos", guests.length],
    ["confirmado", "Confirmados", confirmed.length],
    ["pendiente", "Pendientes", pending.length],
    ["no_asiste", "No asisten", declined.length],
  ];

  return (
    <main className="relative min-h-svh text-claro">
      <Ambient />
      <div className="relative z-10 mx-auto max-w-5xl p-4 md:p-8">
        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="gold-text inline-block px-3 py-1 font-script text-5xl md:text-6xl">Panel XV</h1>
            <p className="px-3 font-serif text-xl italic text-lila">{EVENT.shortName}</p>
          </div>
          <button type="button" onClick={logout} className={`${smallBtn} border-lila/50 text-lila hover:bg-white/10`}>
            Salir
          </button>
        </header>

        <div className="mb-4 grid grid-cols-2 gap-3 md:grid-cols-5">
          {stats.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-oro/30 bg-white/5 p-4 text-center backdrop-blur">
              <p className="gold-text font-serif text-4xl font-semibold tabular-nums">{value}</p>
              <p className="font-serif text-lg italic text-lila">{label}</p>
            </div>
          ))}
        </div>

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
          <div className="mb-2 flex justify-between text-sm text-lila">
            <span>{answered}% ha respondido</span>
            <span>
              {people} de {totalPasses} pases confirmados
            </span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-linear-to-r from-vivo via-oro to-oro-claro transition-all duration-700"
              style={{ width: `${answered}%` }}
            />
          </div>
        </div>

        <div className="frame mb-8 flex flex-col gap-3 p-5 md:flex-row md:items-end">
          <div className="flex-1">
            <label htmlFor="g-name" className="mb-1 block font-serif italic text-lila">
              Nombre o familia
            </label>
            <input id="g-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Familia Pérez" className={field} />
          </div>
          <div className="flex-1">
            <label htmlFor="g-phone" className="mb-1 block font-serif italic text-lila">
              WhatsApp con código de país
            </label>
            <input id="g-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="573001234567" className={field} />
          </div>
          <div className="md:w-24">
            <label htmlFor="g-passes" className="mb-1 block font-serif italic text-lila">
              Pases
            </label>
            <input
              id="g-passes"
              value={passes}
              onChange={(e) => setPasses(Math.max(1, Number(e.target.value)))}
              type="number"
              min={1}
              className={field}
            />
          </div>
          <button type="button" onClick={add} className="btn-gold">
            Agregar
          </button>
        </div>

        {notice && (
          <p role="alert" className="mb-4 text-sm text-rose-200">
            {notice}
          </p>
        )}

        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map(([key, label, count]) => (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`${smallBtn} ${
                  filter === key ? "border-oro bg-oro/15 text-oro-claro" : "border-white/15 text-lila hover:bg-white/10"
                }`}
              >
                {label} <span className="tabular-nums opacity-70">{count}</span>
              </button>
            ))}
          </div>
          <label htmlFor="search" className="sr-only">
            Buscar invitado
          </label>
          <input
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar invitado"
            className={`${field} md:w-64`}
          />
        </div>

        <div className="flex flex-col gap-3">
          {shown.length === 0 && (
            <p className="rounded-2xl border border-dashed border-white/15 p-8 text-center font-serif text-xl italic text-lila">
              {guests.length === 0 ? "Aún no hay invitados. Agrega el primero arriba." : "Ningún invitado coincide con tu búsqueda."}
            </p>
          )}

          {shown.map((g) => (
            <div
              key={g.id}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur transition hover:border-oro/40 md:flex-row md:items-center md:justify-between"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-lg font-semibold">{g.name}</p>
                  <span className={`rounded-full border px-3 py-0.5 text-xs ${statusStyle[g.status] ?? statusStyle.pendiente}`}>
                    {statusLabel[g.status] ?? g.status}
                  </span>
                  {g.opened_at && (
                    <span className="flex items-center gap-1 text-xs text-lila">
                      <span className="h-1.5 w-1.5 rounded-full bg-oro" />
                      Abrió la invitación
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-lila">
                  {g.status === "confirmado"
                    ? `${g.confirmed_passes} de ${g.max_passes} pases`
                    : `${g.max_passes} ${g.max_passes === 1 ? "pase" : "pases"}`}
                </p>
                {g.message && <p className="mt-2 font-serif text-lg italic text-claro/85">“{g.message}”</p>}
              </div>

              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => copy(g)} className={`${smallBtn} border-lila/50 hover:bg-white/10`}>
                  {copied === g.id ? "¡Copiado!" : "Copiar link"}
                </button>
                {g.phone && (
                  <a
                    href={whatsapp(g)}
                    target="_blank"
                    rel="noreferrer"
                    className={`${smallBtn} border-green-500 bg-green-600 hover:bg-green-500`}
                  >
                    {reminder(g) ? "Recordar" : "WhatsApp"}
                  </a>
                )}
                {confirmId === g.id ? (
                  <>
                    <button
                      type="button"
                      onClick={() => remove(g.id)}
                      className={`${smallBtn} border-red-400 bg-red-500/80 hover:bg-red-500`}
                    >
                      Sí, eliminar
                    </button>
                    <button type="button" onClick={() => setConfirmId(null)} className={`${smallBtn} border-white/20 hover:bg-white/10`}>
                      Cancelar
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmId(g.id)}
                    className={`${smallBtn} border-red-400/70 text-red-300 hover:bg-red-400/10`}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}