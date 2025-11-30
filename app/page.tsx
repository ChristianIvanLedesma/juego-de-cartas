"use client";
import { useState } from "react";
import Card from "./components/card";


export interface Pokemones {
  imagen: string;
  id: number;
  
}

const niveles = [
  { value: "facil", label: "Fácil (5 cartas)", color: "text-green-400" },
  { value: "medio", label: "Medio (12 cartas)", color: "text-yellow-400" },
  { value: "dificil", label: "Difícil (18 cartas)", color: "text-red-400" },
];

export const pokemones: Pokemones[] = [
  { id: 1, imagen: "/imagenes/pokemon1.jpg" },
  { id: 2, imagen: "/imagenes/charmander.png" },
  { id: 3, imagen: "/imagenes/Eevee.webp" },
  { id: 4, imagen: "/imagenes/gengar.png" },
  { id: 5, imagen: "/imagenes/pokemon2.jpg" },
  { id: 6, imagen: "/imagenes/rowlet.webp" },
  { id: 7, imagen: "/imagenes/volvasor.jpg" },
  { id: 8, imagen: "/imagenes/pokemon3.jpg" },
  
];

export default function Home() {
  const [jugador1, setJugador1] = useState("");
  const [jugador2, setJugador2] = useState("");
  const [inicio, setInicio] = useState(false);
  const [nivel, setNivel] = useState("facil");
  const [open, setOpen] = useState(false);



  



  const empezarJuego = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jugador1.trim() || !jugador2.trim()) return;
    setInicio(true);
  };

  return (
    <>
      {!inicio ? (
        <form
  onSubmit={empezarJuego}
  className="w-[380px] mx-auto mt-24 p-6 rounded-2xl
             bg-white/10 backdrop-blur-xl border border-white/20
             shadow-[0_0_25px_rgba(255,255,255,0.15)]
             flex flex-col gap-5 animate-[fadeIn_0.4s_ease]"
>

  <h2 className="text-center text-white font-extrabold text-2xl drop-shadow">
    🎮 Memory Pokémon
  </h2>

  {/* Selector de nivel */}
 <div className="relative w-48">
      <div
        className="bg-white/10 border border-white/20 px-3 py-2 rounded cursor-pointer"
        onClick={() => setOpen(!open)}
      >
        Nivel:{" "}
        <span className="font-bold capitalize">
          {nivel || "Seleccionar"}
        </span>
      </div>

      {open && (
        <div className="absolute left-0 w-full mt-2 bg-black/80 border border-white/10 rounded shadow-lg z-10">
          {niveles.map((n) => (
            <div
              key={n.value}
              onClick={() => {
                setNivel(n.value);
                setOpen(false);
              }}
              className={`px-3 py-2 cursor-pointer hover:bg-white/10 ${n.color}`}
            >
              {n.label}
            </div>
          ))}
        </div>
      )}
    </div>
  


  {/* Inputs de jugadores */}
  <div className="flex flex-col gap-3">

    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-400 font-medium">Jugador 1</label>
      <input
        type="text"
        placeholder="Nombre del Jugador 1"
        value={jugador1}
        onChange={(e) => setJugador1(e.target.value)}
        className="p-2 rounded-lg bg-white/20 outline-none
                   border border-white/30 focus:border-blue-400 transition"
      />
    </div>

    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-400 font-medium">Jugador 2</label>
      <input
        type="text"
        placeholder="Nombre del Jugador 2"
        value={jugador2}
        onChange={(e) => setJugador2(e.target.value)}
        className="p-2 rounded-lg bg-white/20 outline-none
                   border border-white/30 focus:border-blue-400 transition"
      />
    </div>

  </div>

  {/* Botón iniciar */}
  <button
    type="submit"
    className="mt-2 py-2 rounded-lg font-bold text-white
               bg-linear-to-br from-blue-500 to-blue-600
               hover:brightness-110 shadow-lg 
               transition-all active:scale-95"
  >
    🚀 Empezar
  </button>

</form>

      ) : (
        <>
     

        <Card
          pokemones={pokemones}
          jugador1={jugador1}
          jugador2={jugador2}
          nivel={nivel}
        />
        </>
      )}
    </>
  );
}
