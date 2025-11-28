
# Cartas — Juego de cartas (Next.js + TypeScript)

Una pequeña aplicación de cartas creada con Next.js y TypeScript. Este repositorio contiene una interfaz simple para mostrar cartas, imágenes y lógica básica del juego.

**Descripción**

- Juego orientado a mostrar/gestionar cartas en pantalla. Cada carta es un componente en `app/components/card.tsx` y las imágenes están en `public/imagenes`.

**Cómo jugar**

- Abre la aplicación en el navegador en `http://localhost:3000`.
- Interactúa con las cartas según las acciones implementadas (clics, arreglo o animaciones).

**Reglas del juego**

- **Objetivo:** Ser el jugador con más puntos al finalizar la partida recogiendo o combinando cartas según las reglas de la variante que uses.

- **Preparación:**
  - Baraja el mazo de cartas de forma aleatorias, en donde quedan ocultas las mismas

- **Desarrollo de un turno:**
  1. El jugador activo puede realizar una acción (ver que carta es y seleccionar una 2 carta),si coinciden el jugador se lleva 1 punto de lo contrario pasa el turno al siguiente jugador.
  


- **Puntuación:**
  - Cada convinacion de cartas por jugador equivale 1 punto
 

- **Fin de la partida:**
  - Cuando se cumple la condición de fin (p. ej. se agota el mazo, un jugador alcanza N puntos o se juegan todas las cartas), se calcula la puntuación final y gana el jugador con más puntos.



**Características**

- Interfaz basada en componentes React (Next.js App Router).
- Soporte para imágenes en `public/imagenes`.
- Esqueleto listo para añadir lógica de juego, estados y estilos personalizados.

**Tecnologías**

- `Next.js` (App Router)
- `React` + `TypeScript`
- `pnpm` como gestor de paquetes

**Instalación (desarrollo)**

Abre una terminal (PowerShell) en la carpeta del proyecto y ejecuta:

```
pnpm install
pnpm dev
```

La aplicación la encontras en `http://localhost:3000` o bien ya en produccion en  ``.

**Compilar y ejecutar en producción**

```
pnpm build
pnpm start
```

**Estructura del proyecto (resumen)**

- `app/` : código de la aplicación (páginas, layout y componentes).
  - `app/components/card.tsx` : componente de carta.
  - `app/page.tsx` : página principal.
- `public/imagenes/` : carpeta para las imágenes usadas por las cartas.
- `next.config.ts`, `tsconfig.json` y archivos de configuración comunes.

**Añadir imágenes y cartas**

- Coloca las imágenes en `public/imagenes/` y referencia la ruta relativa desde los componentes.
- Para añadir una nueva carta.

**Personalización**

- Estilos globales en `app/globals.css`.


**Contribuir**

- Si quieres mejorar el juego: crea una rama, añade mejoras y abre un pull request. Describe bien los cambios y añade ejemplos visuales si aplican.
