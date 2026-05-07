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
    <main className="min-h-dvh bg-background text-foreground">
      <section className="relative isolate min-h-dvh overflow-hidden">
        <Image
          src="/assets/exo-portada3.jpg"
          alt="Portada original de Exo: Portales del Tiempo"
          fill
          priority
          className="-z-20 object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(3,5,8,0.9),rgba(3,5,8,0.72)_48%,rgba(3,5,8,0.94))] md:bg-[linear-gradient(90deg,rgba(3,5,8,0.96),rgba(3,5,8,0.68)_45%,rgba(3,5,8,0.34))]" />

        <div className="mx-auto grid min-h-dvh w-full max-w-360 items-center gap-6 px-4 py-6 sm:px-6 md:grid-cols-[minmax(20rem,32rem)_minmax(0,1fr)] md:gap-8 md:px-8 md:py-8 lg:px-12">
          <form
            onSubmit={submitMemory}
            className="w-full rounded-2xl border border-white/10 bg-black/40 p-6 shadow-2xl backdrop-blur-xl sm:p-8 lg:p-10"
          >
            <Image
              src="/assets/negativo.png"
              alt="Artcore logo"
              width={156}
              height={70}
              className="mb-6 h-auto w-30 sm:w-36"
            />

            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-[#05dbf2] sm:text-sm">
              Sympoietic Kaleidoscope
            </p>
            <h1 className="text-4xl font-semibold leading-none text-white sm:text-5xl lg:text-6xl">
              KAIROX
            </h1>
            <p className="mt-5 max-w-prose text-sm leading-6 text-white/78 sm:text-base sm:leading-7">
              GaIA, la inteligencia bio-algorítmica del brazalete de Donna
              Despret, entrelaza recuerdos humanos, pulsos ambientales y la voz
              mineral de un planeta al borde del desajuste.
            </p>

            <div className="mt-7 space-y-4 sm:space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/84">
                  Tu recuerdo
                </span>
                <textarea
                  value={memory}
                  onChange={(event) => setMemory(event.target.value)}
                  maxLength={240}
                  required
                  rows={3}
                  className="min-h-28 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white shadow-inner backdrop-blur-md outline-none transition-all duration-300 placeholder:text-white/30 focus:border-[#05dbf2] focus:bg-white/10 focus:ring-4 focus:ring-[#05dbf2]/20"
                />
                <span className="mt-2 block text-right text-xs text-white/52">
                  {memory.length}/240
                </span>
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium text-white/84">
                  Capitulo
                </span>
                <div className="relative">
                  <select
                    value={chapter}
                    onChange={(event) =>
                      setChapter(event.target.value as ChapterId)
                    }
                    className="w-full appearance-none cursor-pointer rounded-xl border border-white/10 bg-white/5 p-4 pr-10 text-sm text-white shadow-inner backdrop-blur-md outline-none transition-all duration-300 focus:border-[#05dbf2] focus:bg-white/10 focus:ring-4 focus:ring-[#05dbf2]/20 [&>option]:bg-[#080c12]"
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

              <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
                <button
                  type="submit"
                  disabled={generate.isPending}
                  className="min-h-12 rounded-xl bg-linear-to-r from-rose-700 to-red-600 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-red-600/25 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
                >
                  {generate.isPending ? "Generando..." : "Generar relato"}
                </button>
                <button
                  type="button"
                  onClick={toggleAudio}
                  className="min-h-12 rounded-xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10 hover:text-[#05dbf2] active:scale-95"
                >
                  {isAudioPlaying ? "Pausar música" : "Reanudar música"}
                </button>
              </div>
            </div>
          </form>

          <section className="min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-black/40 shadow-2xl backdrop-blur-xl">
            <KaleidoscopeCanvas text={gaiaText} />
            <div className="border-t border-white/10 bg-white/5 p-6 md:p-8">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 animate-pulse rounded-full bg-[#ffb400]" />
                <p className="text-xs font-semibold uppercase tracking-widest text-[#ffb400] sm:text-sm">
                  Voz de GaIA
                </p>
              </div>
              <p className="mt-4 max-h-[34vh] overflow-y-auto pr-2 text-base leading-relaxed text-white/90 sm:text-lg sm:leading-loose md:max-h-[28vh] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20 hover:scrollbar-thumb-white/40">
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
