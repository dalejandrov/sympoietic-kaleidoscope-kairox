# Sympoietic Kaleidoscope KAIROX

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react&logoColor=111)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=fff)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8?logo=tailwindcss&logoColor=fff)
![tRPC](https://img.shields.io/badge/tRPC-11-2596be?logo=trpc&logoColor=fff)
![OpenAI](https://img.shields.io/badge/OpenAI-SDK-412991?logo=openai&logoColor=fff)
![Vitest](https://img.shields.io/badge/Vitest-4-6e9f18?logo=vitest&logoColor=fff)
![Biome](https://img.shields.io/badge/Biome-2-60a5fa)

**Sympoietic Kaleidoscope KAIROX** es una experiencia narrativa generativa construida con Next.js, React, tRPC y OpenAI.

La aplicación permite que una persona escriba un recuerdo breve, seleccione un capítulo del universo de **KAIROX** y reciba una narración de **GaIA** que combina memoria personal, datos ambientales simulados y una eco-cita del lore original.

---

## Tabla de contenidos

- [Descripción](#descripción)
- [Stack tecnológico](#stack-tecnológico)
- [Requisitos](#requisitos)
- [Variables de entorno](#variables-de-entorno)
- [Instalación](#instalación)
- [Desarrollo local](#desarrollo-local)
- [Scripts disponibles](#scripts-disponibles)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Arquitectura de GaIA](#arquitectura-de-gaia)
- [Manejo de errores](#manejo-de-errores)
- [Pruebas](#pruebas)
- [Notas de migración](#notas-de-migración)
- [Producción](#producción)
- [Licencia](#licencia)
- [Créditos](#créditos)

---

## Descripción

KAIROX propone una interfaz poética entre memoria, ecología especulativa y narración generativa.

El flujo principal de la experiencia es:

1. La persona escribe un recuerdo breve.
2. Selecciona un capítulo del universo narrativo de KAIROX.
3. La app genera datos ambientales simulados.
4. Se selecciona una eco-cita asociada al lore original.
5. GaIA produce una narración final combinando todos los elementos.

Cuando no existe una API key de OpenAI configurada, el sistema utiliza un fallback local para permitir el desarrollo y la prueba visual sin consumir créditos.

---

## Stack tecnológico

- **Next.js App Router**
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **tRPC 11**
- **TanStack React Query**
- **OpenAI SDK**
- **Zod**
- **Vitest**
- **Biome**

---

## Requisitos

Antes de instalar el proyecto, asegúrate de tener disponible:

- Node.js compatible con Next.js 16
- npm
- Opcionalmente, una API key de OpenAI para respuestas reales generadas por modelo

---

## Variables de entorno

El proyecto utiliza un archivo `.env` local.

```env
OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.2
```

### Comportamiento esperado

- Si `OPENAI_API_KEY` tiene valor, GaIA usa el SDK oficial de OpenAI.
- Si `OPENAI_API_KEY` está vacío, la app activa un fallback local.
- `OPENAI_MODEL` permite configurar el modelo usado por el servicio de GaIA.

Esto permite probar la experiencia visual, el flujo de tRPC y la lógica del cliente sin depender de llamadas reales a OpenAI.

---

## Instalación

Instala las dependencias del proyecto:

```bash
npm install
```

---

## Desarrollo local

Levanta el servidor de desarrollo:

```bash
npm run dev
```

Luego abre la aplicación en el navegador:

```text
http://localhost:3000
```

---

## Scripts disponibles

### Desarrollo

```bash
npm run dev
```

Inicia el servidor de desarrollo de Next.js.

### Build

```bash
npm run build
```

Compila la aplicación para producción.

### Producción local

```bash
npm run start
```

Sirve la build de producción generada previamente.

### Lint

```bash
npm run lint
```

Ejecuta Biome para validar lint, formato e imports.

### Formato

```bash
npm run format
```

Formatea el proyecto usando Biome.

### Tests

```bash
npm run test
```

Ejecuta la suite de pruebas con Vitest.

### Type-check

```bash
npx tsc --noEmit
```

Valida los tipos de TypeScript sin generar archivos.

---

## Estructura del proyecto

```text
src/app
```

Contiene las rutas de Next.js, el layout global y el endpoint de tRPC en `api/trpc`.

```text
src/components
```

Contiene la interfaz cliente.

Archivos principales:

```text
src/components/KairoxExperience.tsx
src/components/KaleidoscopeCanvas.tsx
```

- `KairoxExperience.tsx` contiene la experiencia principal.
- `KaleidoscopeCanvas.tsx` renderiza el canvas generativo.

```text
src/lib
```

Contiene datos y utilidades compartidas:

- Capítulos.
- Eco-citas`.
- Helpers ambientales.
- Construcción del request de GaIA.

```text
src/server
```

Contiene código exclusivo del servidor:

- Configuración de tRPC.
- Servicios.
- Prompts.
- Validación de entorno.
- Manejo seguro de errores.


---

## Arquitectura de GaIA

El servicio principal de GaIA vive en:

```text
src/server/services/gaia.ts
```

El prompt original se preserva en:

```text
src/server/prompts/gaia.ts
```

El input enviado al modelo usa etiquetas semánticas para mantener claridad estructural:

```text
<CHAPTER>
<CHAPTER_ID>
<MEMORY>
<ENV_DATA>
<ECO_QUOTE>
```


---

## Manejo de errores

El proyecto evita exponer errores internos al cliente.

Archivos principales:

```text
src/server/errors.ts
src/server/services/gaiaError.ts
```

### Estrategia

- `ServerSafeError` define errores seguros para el cliente.
- `toSafeTrpcError` transforma errores internos en errores compatibles con tRPC.
- `gaiaError.ts` centraliza errores específicos del servicio de GaIA.
- Los detalles internos quedan preservados en `cause`.
- El cliente solo recibe mensajes seguros y controlados.

---

## Pruebas

La suite de Vitest cubre:

- Formato de datos ambientales.
- Construcción del request cliente.
- Prompt e input semántico para OpenAI.
- Validación del schema tRPC.
- Fallback local de GaIA.
- Errores seguros server-side.

Ejecuta las pruebas con:

```bash
npm run test
```

