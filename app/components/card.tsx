"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Pokemones } from "../page";

interface PropsPokemones {
  pokemones: Pokemones[];
  jugador1: string;
  jugador2: string;
}

export default function Card({ pokemones, jugador1, jugador2 }: PropsPokemones) {
  // mezcla cartas
  const mezclarCartas = () => {
    const duplicadas = [...pokemones, ...pokemones].map((carta, index) => ({
      ...carta,
      uniqueId: index,
    }));
    return duplicadas.sort(() => Math.random() - 0.5);
  };

  const [cartas, setCartas] = useState(mezclarCartas());
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const [acertadas, setAcertadas] = useState<number[]>([]);
  const [bloqueado, setBloqueado] = useState(false);

  const [turno, setTurno] = useState<1 | 2>(1);
  const [puntos1, setPuntos1] = useState(0);
  const [puntos2, setPuntos2] = useState(0);

  //Reiniciar todo
  const reiniciar = () => {
    setCartas(mezclarCartas());
    setSeleccionadas([]);
    setAcertadas([]);
    setTurno(1);
    setPuntos1(0);
    setPuntos2(0);
  };

  // Comparar cartas
  useEffect(() => {
    if (seleccionadas.length === 2) {
      setBloqueado(true);

      const [i1, i2] = seleccionadas;
      const carta1 = cartas[i1];
      const carta2 = cartas[i2];

      if (carta1.id === carta2.id) {
        //coinciden puntos
        setAcertadas((prev) => [...prev, carta1.id]);

        if (turno === 1) {
          setPuntos1((p) => p + 1);
        } else {
          setPuntos2((p) => p + 1);
        }

        //El jugador que acierta sigue jugando
        setTimeout(() => {
          setSeleccionadas([]);
          setBloqueado(false);
        }, 900);
      } else {
        // No coinciden  cambia turno
        setTimeout(() => {
          setSeleccionadas([]);
          setTurno(turno === 1 ? 2 : 1);
          setBloqueado(false);
        }, 900);
      }
    }
  }, [seleccionadas]);

  const elegirCarta = (index: number) => {
    if (bloqueado) return;
    if (seleccionadas.includes(index)) return;
    if (acertadas.includes(cartas[index].id)) return;

    setSeleccionadas((prev) => [...prev, index]);
  };

  const paresTotales = pokemones.length;
  const juegoTerminado = acertadas.length === paresTotales;

  //en construccion
  let mensajeGanador = "";
  if (juegoTerminado) {
    if (puntos1 > puntos2) mensajeGanador = `${jugador1} ganó `;
    else if (puntos2 > puntos1) mensajeGanador = `${jugador2} ganó `;
    else mensajeGanador = "Empate";
  }

  return (
    <>
      {/* Panel de jugadores */}
      <div className="flex justify-between items-center top-4 left-8 text-center my-6 gap-4 p-2">
        <div className="flex justify-center gap-8 text-lg font-semibold ml-4">
          <p className={turno === 1 ? "text-white scale-110 border rounded-bl-sm rounded-tr-sm bg-green-300 px-4 py-2" : "opacity-70" }
          >
            {jugador1}: {puntos1} pts
          </p>

          <p className={turno === 2 ? "text-blue-500 scale-110 border rounded-bl-sm rounded-tr-sm bg-blue-300 px-4 py-2" : "opacity-70"}
          >
            {jugador2}: {puntos2} pts
          </p>

           <p className="mt-2 text-sm text-gray-400">
          Turno de: <span className="font-bold">{turno === 1 ? jugador1 : jugador2}</span>
          </p>
        </div>

        <div className=" text-lg font-semibold mr-4">
          <button
            onClick={reiniciar}
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded cursor-pointer"
          >
            Reiniciar Juego
          </button>
        </div>
    </div>

      {/* en construccion ya que aplicare un modal !!!!!!*/}
      {juegoTerminado && (
        <p className="text-center font-bold text-3xl mb-4 text-green-400">
          {mensajeGanador}
        </p>
      )}

      {/* Cartas */}
      <ul className="w-[480px] sm:w-[680px] md:w-[990px] grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 m-auto gap-4 p-5">
        {cartas.map((pokemon, index) => {
          const volteada =
            seleccionadas.includes(index) || acertadas.includes(pokemon.id);

          return (
            <li
              key={pokemon.uniqueId}
              onClick={() => elegirCarta(index)}
              className="border border-gray-300/10 shadow rounded-lg p-4 cursor-pointer backdrop-blur-sm flex items-center justify-center hover:scale-105 transition-all"
            >
              {volteada ? (
                <Image
                  src={pokemon.imagen}
                  alt={pokemon.id.toString()}
                  width={280}
                  height={280}
                />
              ) : (
                <div className="w-[280px] h-[280px] bg-[url(/imagenes/pokemon-fondo.jpg)] rounded-lg" />
              )}
            </li>
          );
        })}
      </ul>
      
    </>
  );
}
