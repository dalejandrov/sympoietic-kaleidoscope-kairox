"use client";

import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { type ChapterId, chapters } from "@/lib/chapters";
import { createGaiaRequest, getInitialChapter } from "@/lib/gaiaRequest";
import { trpc } from "@/trpc/react";
import { KaleidoscopeCanvas } from "./KaleidoscopeCanvas";

const initialText =
  "GaIA aguarda una memoria humana para reconfigurar el bosque de datos de Kairox.";

export function KairoxExperience() {
  const [memory, setMemory] = useState("");
  const [chapter, setChapter] = useState<ChapterId>(getInitialChapter());
  const [gaiaText, setGaiaText] = useState(initialText);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const generate = trpc.gaia.generate.useMutation({
    onSuccess: (data) => setGaiaText(data.text),
  });

  const submitMemory = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await generate.mutateAsync(createGaiaRequest(memory, chapter));

    await audioRef.current?.play().catch(() => undefined);
    setIsAudioPlaying(!audioRef.current?.paused);
  };

  const toggleAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      await audio.play().catch(() => undefined);
    } else {
      audio.pause();
    }

    setIsAudioPlaying(!audio.paused);
  };

  return (
    <main className="h-dvh overflow-hidden bg-background text-foreground">
      <section className="relative isolate h-dvh overflow-hidden">
        <Image
          src="/assets/exo-portada3.jpg"
          alt="Portada original de Exo: Portales del Tiempo"
          fill
          priority
          className="-z-20 object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,5,8,0.9),rgba(3,5,8,0.72)_48%,rgba(3,5,8,0.94))] md:bg-[linear-gradient(90deg,rgba(3,5,8,0.96),rgba(3,5,8,0.68)_45%,rgba(3,5,8,0.34))]" />

        <div className="mx-auto grid h-dvh w-full max-w-360 items-center gap-4 px-4 py-4 sm:px-6 md:grid-cols-[minmax(18rem,28rem)_minmax(0,1fr)] md:gap-5 md:px-6 md:py-5 lg:grid-cols-[minmax(20rem,30rem)_minmax(0,1fr)] lg:gap-6 lg:px-8 xl:px-12">
          <form
            onSubmit={submitMemory}
            className="w-full rounded-xl border border-white/10 bg-black/40 p-4 shadow-2xl backdrop-blur-xl sm:p-5 lg:p-6 xl:p-8"
          >
            <Image
              src="/assets/negativo.png"
              alt="Artcore logo"
              width={156}
              height={70}
              className="mb-4 h-auto w-24 sm:w-28 lg:w-32"
            />

            <p className="mb-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-[#05dbf2] sm:text-xs">
              Sympoietic Kaleidoscope
            </p>
            <h1 className="text-4xl font-semibold leading-none text-white sm:text-5xl xl:text-6xl">
              KAIROX
            </h1>
            <p className="mt-3 max-w-prose text-sm leading-5 text-white/78 sm:leading-6 xl:text-base xl:leading-7">
              GaIA, la inteligencia bio-algorítmica del brazalete de Donna
              Despret, entrelaza recuerdos humanos, pulsos ambientales y la voz
              mineral de un planeta al borde del desajuste.
            </p>

            <div className="mt-5 space-y-3 lg:space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-white/84">
                  Tu recuerdo
                </span>
                <textarea
                  value={memory}
                  onChange={(event) => setMemory(event.target.value)}
                  maxLength={240}
                  required
                  rows={3}
                  className="min-h-22 w-full resize-none rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white shadow-inner backdrop-blur-md outline-none transition-all duration-300 placeholder:text-white/30 focus:border-[#05dbf2] focus:bg-white/10 focus:ring-4 focus:ring-[#05dbf2]/20 lg:min-h-24 xl:min-h-28"
                />
                <span className="mt-1.5 block text-right text-xs text-white/52">
                  {memory.length}/240
                </span>
              </label>

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-white/84">
                  Capitulo
                </span>
                <div className="relative">
                  <select
                    value={chapter}
                    onChange={(event) =>
                      setChapter(event.target.value as ChapterId)
                    }
                    className="w-full appearance-none cursor-pointer rounded-lg border border-white/10 bg-white/5 p-3 pr-10 text-sm text-white shadow-inner backdrop-blur-md outline-none transition-all duration-300 focus:border-[#05dbf2] focus:bg-white/10 focus:ring-4 focus:ring-[#05dbf2]/20 [&>option]:bg-[#080c12]"
                  >
                    {chapters.map((currentChapter) => (
                      <option key={currentChapter.id} value={currentChapter.id}>
                        {currentChapter.name}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
                    <ChevronDown className="h-5 w-5 text-white/50" />
                  </div>
                </div>
              </label>

              {generate.error ? (
                <p className="rounded-xl border border-[#eb0045]/40 bg-[#eb0045]/10 p-4 text-sm leading-6 text-[#ff9db8] shadow-sm">
                  {getGaiaErrorMessage(generate.error)}
                </p>
              ) : null}

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <button
                  type="submit"
                  disabled={generate.isPending}
                  className="min-h-11 rounded-lg bg-linear-to-r from-rose-700 to-red-600 px-5 py-2.5 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-red-600/25 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
                >
                  {generate.isPending ? "Generando..." : "Generar relato"}
                </button>
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="min-h-11 rounded-lg border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:text-[#05dbf2] active:scale-95"
                >
                  {isAudioPlaying ? "Pausar música" : "Reanudar música"}
                </button>
              </div>
            </div>
          </form>

          <section className="min-h-0 min-w-0 overflow-hidden rounded-xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl">
            <KaleidoscopeCanvas text={gaiaText} />
            <div className="border-t border-white/10 bg-white/5 p-4 md:p-5 xl:p-6">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#ffb400]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[#ffb400]">
                  Voz de GaIA
                </p>
              </div>
              <p className="mt-3 max-h-[24dvh] overflow-y-auto pr-2 text-sm leading-6 text-white/90 md:max-h-[22dvh] lg:text-base lg:leading-7 xl:max-h-[26dvh] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40">
                {gaiaText}
              </p>
            </div>
          </section>
        </div>
      </section>

      {/* biome-ignore lint/a11y/useMediaCaption: ambient background music has no spoken content */}
      <audio
        ref={audioRef}
        src="/assets/Experimental_Ambient_-_Sevennotes.mp3"
        loop
        preload="auto"
      />
    </main>
  );
}

function getGaiaErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "GaIA encontró una interferencia temporal. Intenta generar el relato de nuevo.";
}
