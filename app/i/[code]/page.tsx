"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform, type Variants } from "motion/react";
import confetti from "canvas-confetti";
import { supabase } from "@/lib/supabase";
import { EVENT } from "@/lib/event";
import Ambient from "@/components/Ambient";
import Countdown from "@/components/Countdown";
import {
  CalendarIcon,
  CheckIcon,
  Divider,
  HeartIcon,
  PinIcon,
  SideFlourish,
  SparkleIcon,
  WideOrnament,
  XVBadge,
} from "@/components/Ornaments";
import {
  BalloonCluster,
  Butterfly,
  FloralCorner,
  Mis15Display,
  RoyalTiara,
} from "@/components/Decorations";
import { HandwritingText } from "@/components/HandwritingText";
import { EnvelopeCover } from "@/components/EnvelopeCover";

type Guest = { name: string; max_passes: number; status: string; confirmed_passes: number };

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];
const COLORS = ["#D4AF37", "#F6E7A8", "#7C3AED", "#C4B5FD"];

const stage: Variants = {
  hide: {},
  show: { transition: { staggerChildren: 0.2, delayChildren: 0.35 } },
};

const rise: Variants = {
  hide: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 1.1, ease } },
};

const bloom: Variants = {
  hide: { opacity: 0, scale: 0.94, filter: "blur(14px)" },
  show: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 1.6, ease } },
};

const stepBtn =
  "flex h-12 w-12 items-center justify-center rounded-full border border-oro/60 text-2xl text-oro transition hover:bg-oro/10 active:scale-95 disabled:opacity-30 disabled:hover:bg-transparent";

function Fade({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.2, ease }}
    >
      {children}
    </motion.div>
  );
}

function downloadIcs() {
  const start = new Date(EVENT.isoDate);
  const end = new Date(start.getTime() + 6 * 3600000);
  const fmt = (d: Date) => d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//XV//ES",
    "BEGIN:VEVENT",
    `UID:${fmt(start)}@xv`,
    `DTSTAMP:${fmt(new Date())}`,
    `DTSTART:${fmt(start)}`,
    `DTEND:${fmt(end)}`,
    `SUMMARY:Mis XV años de ${EVENT.shortName}`,
    `LOCATION:${`${EVENT.place}, ${EVENT.address}`.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  const blob = new Blob([lines.join("\r\n")], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "xv-anos.ics";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function Letter({ guest, code, initialDone }: { guest: Guest; code: string; initialDone: string | null }) {
  const calm = useReducedMotion();
  const { scrollY } = useScroll();
  const archY = useTransform(scrollY, [0, 700], [0, -50]);
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [covered, setCovered] = useState(true);
  const [photoOk, setPhotoOk] = useState(true);
  const [passes, setPasses] = useState(guest.confirmed_passes || guest.max_passes);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [fail, setFail] = useState("");
  const [done, setDone] = useState<string | null>(initialDone);

  useEffect(() => {
    document.body.style.overflow = covered ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [covered]);

  function open() {
    if (opened) return;
    setOpened(true);
    // La cámara entra a la carta (~2s). Cuando la luz llena la pantalla,
    // quitamos el cover y arranca el hero justo debajo.
    setTimeout(() => {
      setRevealed(true);
      setCovered(false);
      confetti({
        particleCount: 90,
        spread: 90,
        startVelocity: 32,
        scalar: 0.9,
        origin: { x: 0.5, y: 0.55 },
        colors: COLORS,
        disableForReducedMotion: true,
      });
    }, 2000);
  }

  async function send(attending: boolean) {
    setSending(true);
    setFail("");
    const { data, error } = await supabase.rpc("confirm_rsvp", {
      p_code: code,
      p_attending: attending,
      p_passes: passes,
      p_message: message,
    });
    setSending(false);
    if (error || !data) {
      setFail("No pudimos guardar tu respuesta. Revisa tu conexión e inténtalo de nuevo.");
      return;
    }
    setDone(attending ? "confirmado" : "no_asiste");
    if (attending) {
      const burst = { colors: COLORS, disableForReducedMotion: true, ticks: 220 };
      confetti({ ...burst, particleCount: 90, angle: 60, spread: 70, origin: { x: 0, y: 0.75 } });
      confetti({ ...burst, particleCount: 90, angle: 120, spread: 70, origin: { x: 1, y: 0.75 } });
    }
  }

  const rows = [
    { icon: <CalendarIcon className="h-7 w-7" />, title: EVENT.dateText, text: EVENT.timeText },
    { icon: <PinIcon className="h-7 w-7" />, title: EVENT.place, text: EVENT.address },
    { icon: <SparkleIcon className="h-6 w-6" />, title: "Vestimenta", text: EVENT.dressCode },
  ];

  return (
    <main className="relative min-h-svh overflow-x-clip text-claro">
      <Ambient />

      {/* Side flourishes — visible on wide screens to fill empty edges */}
      <div className="pointer-events-none fixed inset-y-0 left-0 z-[2] hidden w-24 lg:block xl:w-32">
        <SideFlourish side="left" className="h-full w-full opacity-40" />
      </div>
      <div className="pointer-events-none fixed inset-y-0 right-0 z-[2] hidden w-24 lg:block xl:w-32">
        <SideFlourish side="right" className="h-full w-full opacity-40" />
      </div>

      <div className="relative z-10">
        {/* ─── Hero Section ───────────────────────────────────────── */}
        <motion.section
          variants={stage}
          initial="hide"
          animate={revealed ? "show" : "hide"}
          className="flex min-h-svh flex-col items-center justify-center gap-5 px-6 py-16 text-center"
        >
          <motion.div variants={bloom} style={{ y: calm ? 0 : archY }} className="relative mb-4">
            {/* Romantic Floral Garland on top-right of photo arch */}
            <FloralCorner
              position="top-right"
              className="absolute -top-7 -right-9 z-20 h-28 w-28 sm:h-36 sm:w-36 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
            />

            {/* Fluttering Iridescent Butterflies */}
            <Butterfly
              className="absolute -top-10 right-14 z-30 sm:-top-12 sm:right-20"
              size={54}
              rotation={20}
            />
            <Butterfly
              className="absolute top-1/2 -left-10 z-30 hidden sm:block sm:-left-14"
              size={42}
              rotation={-22}
              flip
            />

            <div className="relative h-80 w-60 rounded-t-[999px] rounded-b-3xl bg-linear-to-b from-oro-claro via-oro to-oro-oscuro p-[3px] shadow-[0_0_80px_rgba(212,175,55,0.25)] sm:h-96 sm:w-72 lg:h-[28rem] lg:w-80">
              <div className="relative h-full w-full overflow-hidden rounded-t-[999px] rounded-b-[21px] bg-linear-to-b from-vivo to-noche">
                <div className="damask absolute inset-0" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="gold-text px-4 py-2 font-script text-[9rem] leading-none lg:text-[11rem]">
                    {EVENT.shortName.charAt(0)}
                  </span>
                </div>
                {photoOk && (
                  <img
                    src="/lizeth.jpg"
                    alt={`Foto de ${EVENT.shortName}`}
                    onError={() => setPhotoOk(false)}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                )}
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-medianoche/70 to-transparent" />
              </div>
            </div>
            <SparkleIcon className="twinkle absolute -left-7 top-12 h-5 w-5 text-oro-claro" />
            <SparkleIcon
              className="twinkle absolute -right-6 top-32 h-7 w-7 text-oro"
              style={{ "--l": "1.2s" } as React.CSSProperties}
            />
            <SparkleIcon
              className="twinkle absolute -left-4 bottom-16 h-4 w-4 text-lila"
              style={{ "--l": "2.1s" } as React.CSSProperties}
            />
            {/* Extra sparkles for width */}
            <SparkleIcon
              className="twinkle absolute -right-12 top-16 hidden h-3 w-3 text-oro-claro/60 sm:block"
              style={{ "--l": "3.4s" } as React.CSSProperties}
            />
            <SparkleIcon
              className="twinkle absolute -left-14 top-40 hidden h-4 w-4 text-lila/50 sm:block"
              style={{ "--l": "0.6s" } as React.CSSProperties}
            />
          </motion.div>

          {/* Majestic Centerpiece: Crowned Royal 15 Display */}
          <Mis15Display variants={rise} calm={calm} />

          {/* Handwriting Calligraphy Animation for Name */}
          <motion.h1
            variants={bloom}
            className="px-4 py-2 font-script text-7xl leading-[1.15] sm:text-9xl lg:text-[10rem]"
          >
            <HandwritingText text={EVENT.shortName} trigger={revealed} delay={0.6} />
          </motion.h1>

          <motion.div variants={rise}>
            <WideOrnament />
          </motion.div>

          <motion.p variants={rise} className="font-serif text-2xl text-orquidea sm:text-3xl lg:text-4xl">
            {EVENT.dateText}
          </motion.p>

          <motion.div variants={rise} className="mt-6 flex flex-col items-center gap-2 text-lila">
            <span className="font-serif text-lg italic sm:text-xl">Desliza</span>
            <motion.span
              animate={calm ? undefined : { y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
              className="h-10 w-px bg-linear-to-b from-oro to-transparent"
            />
          </motion.div>
        </motion.section>

        {/* ─── Countdown Section with Festive Balloons & Butterfly ─── */}
        <section className="relative px-6 py-24 text-center overflow-visible">
          {/* Metallic Party Balloons floating on the left side */}
          <div className="pointer-events-none absolute left-3 top-6 hidden sm:block md:left-8 lg:left-16 z-0">
            <BalloonCluster className="h-64 w-40 sm:h-76 sm:w-48 lg:h-88 lg:w-56" />
          </div>

          {/* Butterfly fluttering near the countdown on the right */}
          <Butterfly
            className="pointer-events-none absolute right-4 top-10 hidden sm:block md:right-12 lg:right-20 z-10"
            size={50}
            rotation={-20}
            flip
          />

          <Fade className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-10">
            <div className="relative">
              <RoyalTiara className="absolute -top-7 left-1/2 -translate-x-1/2 h-8 w-20 sm:h-10 sm:w-24 opacity-80" />
              <XVBadge className="mt-2 h-20 w-20 sm:h-24 sm:w-24" />
            </div>
            <h2 className="gold-text inline-block px-3 py-1 font-script text-6xl sm:text-7xl lg:text-8xl">Faltan</h2>
            <Countdown target={EVENT.isoDate} />
            <WideOrnament className="mt-4 opacity-50" />
          </Fade>
        </section>

        {/* ─── Details Section ────────────────────────────────────── */}
        <section className="mx-auto flex max-w-2xl flex-col items-center gap-10 px-6 py-24 text-center lg:max-w-3xl">
          <Fade className="flex flex-col items-center gap-5">
            <h2 className="gold-text inline-block px-3 py-1 font-script text-6xl sm:text-7xl lg:text-8xl">Te espero</h2>
            <p className="max-w-md font-serif text-2xl italic leading-relaxed text-lila sm:text-3xl">
              Me haría muy feliz celebrar contigo este día tan especial.
            </p>
          </Fade>

          {/* Detail cards in glassmorphism style */}
          <div className="flex w-full flex-col gap-5">
            {rows.map((row, i) => (
              <Fade key={row.title}>
                <div className="glass-card flex items-center gap-5 p-6 sm:p-8">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-oro/50 bg-oro/10 text-oro shadow-[0_0_30px_rgba(212,175,55,0.15)] sm:h-20 sm:w-20">
                    {row.icon}
                  </div>
                  <div className="text-left">
                    <p className="font-serif text-2xl text-orquidea sm:text-3xl">{row.title}</p>
                    <p className="mt-1 text-lg text-lila sm:text-xl">{row.text}</p>
                  </div>
                </div>
                {i < rows.length - 1 && (
                  <div className="mx-auto mt-5 h-10 w-px bg-linear-to-b from-oro/40 to-transparent" />
                )}
              </Fade>
            ))}
          </div>

          <Fade className="flex w-full flex-col justify-center gap-4 sm:flex-row">
            <a href={EVENT.mapsUrl} target="_blank" rel="noreferrer" className="btn-gold px-8 py-4 text-center text-lg">
              Ver ubicación
            </a>
            <button type="button" onClick={downloadIcs} className="btn-violet px-8 py-4 text-lg">
              Agregar al calendario
            </button>
          </Fade>
        </section>

        {/* ─── RSVP Section ───────────────────────────────────────── */}
        <section id="rsvp" className="mx-auto max-w-xl px-6 pb-24 lg:max-w-2xl">
          <Fade>
            <WideOrnament className="mx-auto mb-12 opacity-40" />
          </Fade>
          <Fade>
            <div className="frame p-8 text-center sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {done ? (
                  <motion.div
                    key="done"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex flex-col items-center gap-5 py-6"
                  >
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border border-oro/70 bg-oro/10 text-oro shadow-[0_0_40px_rgba(212,175,55,0.3)]">
                      {done === "confirmado" ? <CheckIcon className="h-12 w-12" /> : <HeartIcon className="h-11 w-11" />}
                    </div>
                    <p className="gold-text px-3 py-1 font-script text-5xl sm:text-6xl">
                      {done === "confirmado" ? "¡Gracias por confirmar!" : "Lamentamos que no puedas venir"}
                    </p>
                    <p className="font-serif text-2xl italic text-lila">
                      {done === "confirmado"
                        ? `Te esperamos con ${passes} ${passes === 1 ? "persona" : "personas"}.`
                        : "Gracias por avisarnos."}
                    </p>
                    <button type="button" className="mt-2 text-lg text-lila underline underline-offset-4" onClick={() => setDone(null)}>
                      Cambiar respuesta
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col gap-6"
                  >
                    <h2 className="gold-text inline-block px-3 py-1 font-script text-5xl sm:text-6xl">Confirma tu asistencia</h2>
                    <p className="font-serif text-2xl italic text-lila">
                      Tienes {guest.max_passes} {guest.max_passes === 1 ? "pase" : "pases"}
                    </p>

                    {guest.max_passes > 1 && (
                      <div className="flex items-center justify-center gap-6">
                        <button
                          type="button"
                          aria-label="Menos personas"
                          className={stepBtn}
                          disabled={passes <= 1}
                          onClick={() => setPasses((n) => Math.max(1, n - 1))}
                        >
                          −
                        </button>
                        <div className="w-24 text-center">
                          <p className="gold-text font-serif text-6xl leading-none tabular-nums sm:text-7xl">{passes}</p>
                          <p className="mt-1 font-serif text-lg italic text-lila">{passes === 1 ? "persona" : "personas"}</p>
                        </div>
                        <button
                          type="button"
                          aria-label="Más personas"
                          className={stepBtn}
                          disabled={passes >= guest.max_passes}
                          onClick={() => setPasses((n) => Math.min(guest.max_passes, n + 1))}
                        >
                          +
                        </button>
                      </div>
                    )}

                    <div className="flex flex-col gap-2 text-left">
                      <label htmlFor="msg" className="font-serif text-xl italic text-lila">
                        Un mensaje para {EVENT.shortName} (opcional)
                      </label>
                      <textarea
                        id="msg"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={3}
                        placeholder="Escribe unas palabras para ella"
                        className="resize-none rounded-2xl border border-white/10 bg-medianoche/60 p-4 text-lg text-claro outline-none transition placeholder:text-lila/50 focus:border-oro/70"
                      />
                    </div>

                    {fail && (
                      <p role="alert" className="text-sm text-rose-200">
                        {fail}
                      </p>
                    )}

                    <button type="button" disabled={sending} onClick={() => send(true)} className="btn-gold py-4 text-lg">
                      {sending ? "Enviando…" : "Sí, asistiré"}
                    </button>
                    <button
                      type="button"
                      disabled={sending}
                      onClick={() => send(false)}
                      className="text-lg text-lila underline underline-offset-4 disabled:opacity-50"
                    >
                      No podré asistir
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Fade>
        </section>

        {/* ─── Footer ─────────────────────────────────────────────── */}
        <footer className="flex flex-col items-center gap-5 px-6 pb-24 text-center">
          <WideOrnament className="opacity-40" />
          <p className="font-serif text-2xl italic text-lila sm:text-3xl">Gracias por ser parte de mi historia</p>
          <p className="gold-text inline-block px-3 py-1 font-script text-6xl sm:text-7xl">{EVENT.shortName}</p>
          <Divider />
        </footer>
      </div>

      {/* ─── Cover / Envelope ─────────────────────────────────────── */}
      <AnimatePresence>
        {covered && (
          <motion.div key="cover" exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <EnvelopeCover
              guestName={guest.name}
              shortName={EVENT.shortName}
              onOpen={open}
              calm={calm}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

export default function Invitation() {
  return (
    <Suspense
      fallback={
        <main className="relative flex min-h-svh items-center justify-center px-6">
          <Ambient />
          <p className="relative z-10 animate-pulse font-serif text-3xl italic text-lila">Preparando tu invitación…</p>
        </main>
      }
    >
      <InvitationInner />
    </Suspense>
  );
}

function InvitationInner() {
  const { code } = useParams<{ code: string }>();
  const [guest, setGuest] = useState<Guest | null>(null);
  const [state, setState] = useState<"loading" | "missing" | "ready">("loading");

  useEffect(() => {
    supabase.rpc("get_invitation", { p_code: code }).then(({ data }) => {
      const g = data?.[0];
      if (!g) return setState("missing");
      setGuest(g);
      setState("ready");
    });
  }, [code]);

  if (state === "loading") {
    return (
      <main className="relative flex min-h-svh items-center justify-center px-6">
        <Ambient />
        <p className="relative z-10 animate-pulse font-serif text-3xl italic text-lila">Preparando tu invitación…</p>
      </main>
    );
  }

  if (state === "missing" || !guest) {
    return (
      <main className="relative flex min-h-svh items-center justify-center px-6 text-center">
        <Ambient />
        <div className="relative z-10 flex flex-col items-center gap-5">
          <XVBadge className="h-20 w-20" />
          <Divider />
          <p className="font-serif text-3xl text-orquidea sm:text-4xl">No encontramos tu invitación</p>
          <p className="max-w-sm font-serif text-xl italic text-lila sm:text-2xl">
            Revisa que el enlace esté completo o pide uno nuevo.
          </p>
        </div>
      </main>
    );
  }

  return (
    <Letter
      key={code}
      guest={guest}
      code={code}
      initialDone={guest.status !== "pendiente" ? guest.status : null}
    />
  );
}