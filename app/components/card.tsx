"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Pokemones } from "../page";

interface PropsPokemones {
  pokemones: Pokemones[];
  jugador1: string;
  jugador2: string;
  nivel: string;
}

export default function Card({ pokemones, jugador1, jugador2,nivel }: PropsPokemones) {

  let cantidad = 5;

  if (nivel === "medio") cantidad = 12;
  if (nivel === "dificil") cantidad = 18;

  const cartasNivel = pokemones.slice(0, cantidad);

  // mezcla cartas
  const mezclarCartas = () => {
  const duplicadas = [...cartasNivel, ...cartasNivel,].map((carta, index) => ({
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

  const paresTotales = cartasNivel.length;
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
     {/* Panel de jugadores mejorado */}
    <div className="flex justify-between items-center w-full max-w-4xl mx-auto my-6 px-4">

      <div
        className={`flex flex-col items-center w-40 p-4 rounded-xl border 
        backdrop-blur-md shadow-lg transition-all duration-300
        ${turno === 1 ? "bg-green-400/30 scale-105 border-green-300" : "bg-white/10 opacity-70"}`}
      >
        <h3 className="text-lg font-bold text-white">{jugador1}</h3>
        <p className="text-4xl font-extrabold text-white drop-shadow-md">{puntos1}</p>

        {turno === 1 && (
          <span className="mt-2 text-xs font-semibold bg-green-500 text-white px-3 py-1 rounded-full animate-pulse">
            Jugando
          </span>
        )}
      </div>

      <div className="text-center">
        <p className="text-gray-300 text-sm">Turno actual:</p>
        <p className="text-2xl font-bold text-white mt-1">
          {turno === 1 ? jugador1 : jugador2}
        </p>
      </div>

  
        <div
          className={`flex flex-col items-center w-40 p-4 rounded-xl border 
          backdrop-blur-md shadow-lg transition-all duration-300
          ${turno === 2 ? "bg-blue-400/30 scale-105 border-blue-300" : "bg-white/10 opacity-70"}`}
        >
          <h3 className="text-lg font-bold text-white">{jugador2}</h3>
          <p className="text-4xl font-extrabold text-white drop-shadow-md">{puntos2}</p>

          {turno === 2 && (
            <span className="mt-2 text-xs font-semibold bg-blue-500 text-white px-3 py-1 rounded-full animate-pulse">
              Jugando
            </span>
          )}
        </div>

        {/* Botón reinicio */}
        <button
          onClick={reiniciar}
          className="ml-6 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg font-semibold transition-all"
        >
          Reiniciar
        </button>
        <p>{nivel}</p>
      </div>


        {/* Modal ganador */}
        {juegoTerminado && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white/20 border border-white/30 backdrop-blur-xl shadow-2xl rounded-xl p-8 w-[350px] text-center animate-[fadeIn_0.3s_ease]">

              <h2 className="text-3xl font-extrabold text-white drop-shadow mb-4">
                🎉 ¡Ganador!
              </h2>

              <p className="text-xl text-green-300 font-bold mb-6">
                {mensajeGanador}
              </p>

              <button
                onClick={reiniciar}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-lg transition-all"
              >
                Jugar de nuevo
              </button>
            </div>
          </div>
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
