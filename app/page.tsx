"use client";
import { useState } from "react";
import Card from "./components/card";

export interface Pokemones {
  imagen: string;
  id: number;
}

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
          className="w-[350px] m-auto mt-10 p-6 bg-white/10 backdrop-blur-lg rounded-xl flex flex-col gap-4"
        >
          <h2 className="text-center text-gray-400 font-bold text-xl ">
            Registrar Jugadores
          </h2>

          <input
            type="text"
            placeholder="Nombre Jugador 1"
            value={jugador1}
            onChange={(e) => setJugador1(e.target.value)}
            className="p-2 rounded bg-white/20"
          />

          <input
            type="text"
            placeholder="Nombre Jugador 2"
            value={jugador2}
            onChange={(e) => setJugador2(e.target.value)}
            className="p-2 rounded bg-white/2"
          />

          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 p-2 rounded mt-2"
          >
            Empezar
          </button>
        </form>
      ) : (
        <Card
          pokemones={pokemones}
          jugador1={jugador1}
          jugador2={jugador2}
        />
      )}
    </>
  );
}
