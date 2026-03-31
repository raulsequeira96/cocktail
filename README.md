# Cocktail Studio

Aplicacion web para explorar cocktails con busqueda inteligente, filtros avanzados, ordenamiento, favoritos persistentes y vista responsive optimizada para desktop y mobile.

## Tabla de contenidos

1. [Resumen](#resumen)
2. [Funcionalidades](#funcionalidades)
3. [Stack tecnologico](#stack-tecnologico)
4. [Arquitectura](#arquitectura)
5. [Requisitos](#requisitos)
6. [Inicio rapido](#inicio-rapido)
7. [Scripts disponibles](#scripts-disponibles)
8. [Variables y configuracion](#variables-y-configuracion)
9. [Calidad y pruebas](#calidad-y-pruebas)
10. [Build y despliegue](#build-y-despliegue)
11. [Troubleshooting](#troubleshooting)
12. [Estado tecnico y roadmap](#estado-tecnico-y-roadmap)

## Resumen

Cocktail Studio consume TheCocktailDB para listar bebidas, aplicar filtros por categoria/vaso/ingrediente/tipo de alcohol y consultar detalle completo de cada receta. El estado global se maneja con Redux y parte de la experiencia se persiste en `localStorage` y query params para sesiones compartibles.

## Funcionalidades

- Busqueda por nombre, categoria, vaso, tipo de alcohol, ingredientes y tags.
- Filtros avanzados: alcohol, categoria, vaso e ingrediente.
- Ordenamiento: destacado, nombre asc/desc, cantidad de ingredientes y aleatorio.
- Modo responsive:
	- Desktop: filtros visibles en la barra principal.
	- Mobile: filtros dentro de drawer lateral.
- Boton de sorpresa para descubrir cocktails al azar.
- Favoritos persistentes en `localStorage`.
- Modal de detalle con ingredientes, metadatos y opcion de compartir.
- Sincronizacion parcial de filtros en URL para vistas reutilizables.

## Stack tecnologico

- React 19 + TypeScript.
- Material UI 7 (`@mui/material`, `@mui/icons-material`).
- `@mui/styles` para estilos legacy con `makeStyles`.
- Redux Toolkit + React Redux para estado global.
- Axios para consumo de API.
- Testing Library + Jest para pruebas.
- Create React App (`react-scripts` 5) como toolchain actual.

## Arquitectura

Estructura principal del proyecto:

```
src/
	components/
		cocktail/
			CocktailBar.tsx
			CocktailCatalog.tsx
			DialogCocktailDetails.tsx
			styles.ts
	constants/
		cocktailConstant.ts
	interfaces/
		cocktailInterfaces.ts
	redux/
		actions/
			cocktailActions.ts
		reducers/
			cocktailReducer.ts
			reducers.ts
		store.ts
```

Flujo de datos:

1. La UI dispara acciones desde componentes.
2. Los thunks consultan API y normalizan respuesta.
3. El reducer aplica filtros y orden al estado.
4. La UI consume estado derivado via `useSelector`.

## Requisitos

- Node.js LTS recomendado (v20+).
- Yarn Classic (v1) o npm.

## Inicio rapido

Instalacion y arranque local:

```bash
yarn install
yarn start
```

Aplicacion disponible en:

- `http://localhost:3000`

## Scripts disponibles

- `yarn start`: inicia entorno de desarrollo.
- `yarn build`: genera build de produccion en `build/`.
- `yarn test`: ejecuta tests en modo interactivo.
- `yarn eject`: expone configuracion de CRA (irreversible).

## Variables y configuracion

Actualmente la app usa constantes internas para endpoints. Si se desea externalizar, se recomienda mover base URL a variables de entorno (`.env`) y leerlas desde una capa de configuracion.

## Calidad y pruebas

Pruebas:

```bash
yarn test
```

Recomendaciones de calidad actuales:

- Mantener pruebas de integracion para filtros y drawer mobile.
- Validar persistencia en `localStorage` y sincronizacion de URL.
- Cubrir casos de fallback cuando la API responde incompleta.

## Build y despliegue

Generar artefacto productivo:

```bash
yarn build
```

El resultado queda en `build/` y puede desplegarse en cualquier hosting estatico (Nginx, Netlify, Vercel, S3 + CloudFront, etc.).

## Troubleshooting

### `yarn start` falla al resolver dependencias de CRA

- Verificar `react-scripts` fijo en `5.0.1`.
- Reinstalar dependencias limpias:

```bash
rm -rf node_modules yarn.lock
yarn install
```

### Error relacionado con `ajv/dist/compile/codegen`

- Confirmar presencia de `ajv` v8 en dependencias.
- Reinstalar lockfile y dependencias.

### Error de tema con `theme.spacing is not a function`

- Usar el mismo objeto de tema para Material UI y `@mui/styles`.

## Estado tecnico y roadmap

Estado actual:

- El proyecto es funcional y estable para desarrollo local.
- Se ejecuta sobre Create React App 5, que hoy tiene mantenimiento limitado.

Roadmap sugerido (2026):

1. Migrar de CRA a Vite para mejorar DX, tiempos de build y compatibilidad moderna.
2. Reemplazar gradualmente `@mui/styles` por `sx`/`styled` para alinearse a MUI actual.
3. Incorporar pipeline CI con test + build + auditoria de dependencias.
4. Ampliar cobertura de pruebas para estados de filtros, favoritos y detalle.

## Licencia

Uso interno / educativo. Definir licencia explicita antes de publicacion externa.
