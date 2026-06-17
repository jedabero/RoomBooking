# RoomBooking — Pruebas Unitarias e Integración

[![CI](https://github.com/jedabero/RoomBooking/actions/workflows/ci.yml/badge.svg)](https://github.com/jedabero/RoomBooking/actions/workflows/ci.yml)

> **Nota Codecov:** la carga de cobertura está configurada en GitHub Actions, pero el badge de Codecov se deja pendiente hasta validar la configuración del repositorio en Codecov.

**RoomBooking** es el repositorio académico. **RoomBooker** es el sistema de reserva de salas modelado en este proyecto. El proyecto aplica estrategias de **pruebas unitarias**, **pruebas de integración** y **pruebas de sistema/API simulada** mediante TypeScript y Vitest.

---

## Dominio

**RoomBooker / RoomBooking** permite gestionar la reserva de salas de reunión. Las reglas de negocio incluyen:

- Validar disponibilidad de una sala en un rango de tiempo.
- Detectar conflictos entre reservas existentes.
- Aplicar políticas de reserva (duración máxima, anticipación mínima, etc.).
- Validar datos de entrada de salas y reservas.
- Controlar permisos según el rol del usuario.

---

## 🎯 Objetivos

- Aplicar los principios del **Desarrollo Guiado por Pruebas (TDD)** en el dominio elegido.
- Diseñar pruebas unitarias que validen **reglas de negocio puras** (sin dependencias de bases de datos, HTTP o interfaces gráficas).
- Implementar las pruebas siguiendo el patrón **AAA (Arrange – Act – Assert)**.
- Definir y documentar **Clases de Equivalencia** y **Valores Límite**.
- Expresar los comportamientos esperados mediante **BDD (Given – When – Then)**.
- Documentar todo el proceso en un **Wiki dentro del repositorio**, siguiendo el modelo del *Taller de Pruebas Unitarias*.

---

### Estructura del proyecto

```
src/
├── domain/
│   ├── model/           # Entidades y Value Objects (Room, Reservation, TimeRange, etc.)
│   └── rules/           # Reglas de negocio (ReservationConflict, Availability, etc.)
├── application/
│   └── services/        # Servicios de aplicación que coordinan reglas y repositorios
├── infrastructure/
│   └── persistence/     # Repositorios in-memory e interfaces
└── delivery/
    └── http/            # API simulada sin servidor HTTP real
test/
├── domain/
│   └── rules/           # Pruebas unitarias del dominio
└── integration/
    ├── application/     # Pruebas de integración entre servicios, repositorios y dominio
    └── delivery/        # Pruebas de sistema/API simulada
```

---

### Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar pruebas
npx vitest run

# Ejecutar pruebas unitarias
npm run test:unit

# Ejecutar pruebas de integración
npm run test:integration

# Ejecutar pruebas de sistema/API simulada
npm run test:system

# Reporte de cobertura
npx vitest run --coverage
```

Las pruebas deben ejecutarse **de manera automática** sin pasos adicionales.

---

## Pruebas de Integración y Sistema

### Objetivo

Validar que las capas principales de RoomBooker colaboran correctamente sin depender de una base de datos real ni de un servidor HTTP real. Las pruebas complementan la suite unitaria previa y verifican flujos completos de reserva, disponibilidad, permisos y administración de salas.

### Arquitectura bajo prueba

La arquitectura probada integra estas capas:

```text
delivery/API simulada -> application service -> repository in-memory -> domain rules
```

La API simulada retorna objetos tipo HTTP con `status` y `body`. Esto permite validar estados como `200`, `201`, `400`, `403`, `404` y `409` sin introducir frameworks web innecesarios.

### Capas integradas

| Capa | Componentes | Responsabilidad |
|---|---|---|
| Dominio | `ReservationConflict`, `Availability`, `ReservationPolicy`, `Permission`, `RoomValidation` | Reglas puras de negocio. |
| Aplicación | `ReservationService`, `RoomService`, `AvailabilityService` | Coordinación de casos de uso. |
| Infraestructura | `InMemoryRoomRepository`, `InMemoryReservationRepository` | Persistencia simulada para integración. |
| Delivery | `RoomBookingApi` | API simulada con respuestas tipo HTTP. |

### Escenarios cubiertos

| Escenario | Tipo | Archivo |
|---|---|---|
| Crear una reserva válida persiste la reserva. | Integración | `test/integration/application/ReservationService.integration.test.ts` |
| Crear una reserva con conflicto es rechazado. | Integración/Sistema | `test/integration/application/ReservationService.integration.test.ts`, `test/integration/delivery/RoomBookingApi.system.test.ts` |
| Una reserva consecutiva no se considera conflicto. | Integración | `test/integration/application/ReservationService.integration.test.ts` |
| Una reserva cancelada no bloquea disponibilidad. | Integración | `test/integration/application/ReservationService.integration.test.ts` |
| Consultar disponibilidad excluye salas ocupadas e inactivas. | Integración/Sistema | `test/integration/application/AvailabilityService.integration.test.ts`, `test/integration/delivery/RoomBookingApi.system.test.ts` |
| Una sala inactiva no puede reservarse. | Integración | `test/integration/application/ReservationService.integration.test.ts` |
| Un usuario común no puede ejecutar acciones administrativas. | Integración/Sistema | `test/integration/application/RoomService.integration.test.ts`, `test/integration/delivery/RoomBookingApi.system.test.ts` |
| Un administrador puede gestionar salas. | Integración/Sistema | `test/integration/application/RoomService.integration.test.ts`, `test/integration/delivery/RoomBookingApi.system.test.ts` |

### Comandos de ejecución

```bash
npm ci
npm run typecheck
npm run test:unit
npm run test:integration
npm run test:system
npm run test:coverage
```

### Cobertura

La cobertura se genera con Vitest y V8 sobre:

```text
src/domain/**
src/application/**
src/infrastructure/**
src/delivery/**
```

Resultado local de referencia:

```text
Statements   : 99.33% (150/151)
Branches     : 97.5% (78/80)
Functions    : 100% (46/46)
Lines        : 99.3% (142/143)
```

### CI/CD

El workflow `.github/workflows/ci.yml` se ejecuta en `push` y `pull_request` hacia `main`. El pipeline instala dependencias con `npm ci`, ejecuta typecheck, pruebas unitarias, integración, sistema y cobertura. También publica el directorio `coverage/` como artifact y envía cobertura a Codecov si el repositorio está configurado.

### Restricción de integración

Para usar el pipeline como restricción antes de integrar cambios en `main`, configurar branch protection en GitHub:

1. Ir a `Settings` -> `Branches`.
2. Crear o editar una regla para `main`.
3. Activar `Require status checks to pass before merging`.
4. Seleccionar el workflow/check `CI`.
5. Activar `Require branches to be up to date before merging` si se desea exigir actualización previa.

---

## PARA ENTREGAR

### 1. Repositorio principal

- Código fuente del proyecto con sus pruebas unitarias.
- Archivo `.gitignore` (excluir `node_modules`, `dist`, `coverage`, etc.).
- Archivo `integrantes.txt` con los nombres completos del equipo.
- Ejecución reproducible:

```bash
npm install
npx vitest run
npx vitest run --coverage
```

- URL pública del repositorio (GitHub, GitLab u otro).

---

### 2. Wiki del proyecto (documentación obligatoria)

> El **Wiki** será el documento oficial de entrega.
> Se recomienda seguir la estructura del **Taller de Pruebas Unitarias**.

#### Estructura sugerida del Wiki

1. **Inicio**
   - Descripción del dominio y propósito del sistema.
   - Regla principal o problema a resolver.
   - Integrantes del equipo.

2. **TDD (Red → Green → Refactor)**
   - Descripción del ciclo TDD aplicado.
   - Evidencias de al menos **tres iteraciones** (Rojo, Verde, Refactor).
   - Capturas, commits o breves explicaciones.

3. **Patrón AAA (Arrange – Act – Assert)**
   - Ejemplo de test con estructura AAA y breve explicación.
   - Cómo se asegura la legibilidad de las pruebas.

4. **Clases de Equivalencia y Valores Límite**
   - Tabla de casos representativos.
   - Justificación de bordes elegidos y cobertura esperada.

5. **BDD (Behavior Driven Development)**
   - Escenarios en formato **Given – When – Then**.
   - Correspondencia con las pruebas unitarias.

6. **Cobertura y Resultados**
   - Captura del **reporte de cobertura** (Vitest + V8/Istanbul).
   - Mínimo **80% cobertura global** y **80% en el paquete de dominio**.
   - Comentario sobre líneas no cubiertas o casos no incluidos.

7. **Conclusiones y Reflexión Final**
   - Principales aprendizajes del proceso TDD.
   - Dificultades y cómo se resolvieron.
   - Beneficios de aplicar AAA y BDD.

---

## Métricas de calidad

| Métrica | Requisito mínimo |
|----------|------------------|
| **Cobertura global (Vitest + V8/Istanbul)** | ≥ 80% |
| **Cobertura en paquete de dominio** | ≥ 80% |
| **Número mínimo de clases de prueba** | 5 |
| **Estilo de nomenclatura** | `should...When...()` |
| **Buenas prácticas** | Código limpio, sin duplicaciones, constantes extraídas, nombres expresivos. |

---

## Reflexión esperada en el Wiki

- ¿Qué reglas de negocio fueron más desafiantes de validar con pruebas?
- ¿Cómo influyó el enfoque **TDD** en el diseño del código?
- ¿Qué aportó el patrón **AAA** a la comprensión de los tests?
- ¿Qué utilidad encontró en las **Clases de Equivalencia** y los **escenarios BDD**?
- ¿Cómo aseguraría la mantenibilidad de sus pruebas a futuro?

---

## Rúbrica de evaluación

| **Criterios de evaluación** | **Indicadores de cumplimiento** | **Excelente (5 pts)** | **Bueno (4 pts)** | **Necesita mejorar (3.5 pts)** | **Deficiente (2.5 pts)** | **No cumple (0 pts)** |
|------------------------------|---------------------------------|------------------------|--------------------|---------------------------------|---------------------------|------------------------|
| **Diseño del dominio** | Claridad, coherencia y relevancia del dominio elegido. | Dominio bien definido, con reglas de negocio reales y aplicables. | Dominio comprensible, con reglas básicas bien identificadas. | Dominio poco claro o simplificado en exceso. | No hay correspondencia entre dominio y pruebas. | No se define dominio funcional. |
| **Estructura y organización del código** | Implementa arquitectura limpia y buenas prácticas. | Estructura ordenada, modular y coherente. | Cumple la mayoría de principios con leves inconsistencias. | Organización parcial o sin separación clara de capas. | Estructura confusa o con dependencias innecesarias. | No presenta estructura funcional. |
| **Aplicación del ciclo TDD (Red → Green → Refactor)** | Evidencia de desarrollo iterativo basado en pruebas. | Documenta al menos 3 iteraciones claras con resultados. | Se evidencian ciclos parciales o incompletos. | TDD se menciona pero no se demuestra claramente. | Sin evidencia práctica de TDD. | No aplica TDD. |
| **Patrón AAA (Arrange–Act–Assert)** | Claridad y consistencia en los tests. | Todos los tests aplican AAA correctamente. | Mayoría de los tests con AAA consistente. | Estructura irregular o confusa. | Solo algunos tests aplican AAA. | No se aplica AAA. |
| **Clases de equivalencia y valores límite** | Definición y aplicación de casos representativos. | Tabla completa y justificada, reflejada en los tests. | Casos correctos pero sin justificación detallada. | Tabla parcial o confusa. | Casos incompletos o erróneos. | No se aplica la técnica. |
| **Escenarios BDD (Given–When–Then)** | Coherencia entre escenarios narrativos y pruebas. | Escenarios claros, completos y coherentes. | Escenarios bien planteados pero con faltantes menores. | Redacción ambigua o poco estructurada. | Escenarios mal formulados o inconsistentes. | No aplica BDD. |
| **Cobertura de código (Vitest + V8/Istanbul)** | Porcentaje de código probado. | ≥ 80% global y en dominio. | Entre 70% y 79%. | Entre 60% y 69%. | Menor a 60%. | No presenta cobertura. |
| **Documentación en Wiki** | Wiki como documento oficial de entrega. | Completo, estructurado y con evidencias claras. | Incluye secciones clave pero sin suficiente detalle. | Incompleto o poco organizado. | Parcial o sin evidencia visual. | No presenta Wiki. |
| **Reflexión técnica y conclusiones** | Análisis del proceso y aprendizajes. | Reflexión profunda y analítica sobre TDD, AAA y BDD. | Reflexión general con ejemplos. | Comentarios superficiales o incompletos. | Reflexión mínima o incoherente. | Sin reflexión. |
| **Calidad general y mantenibilidad** | Código, documentación y presentación global. | Excelente claridad, orden y consistencia técnica. | Buen nivel general con leves omisiones. | Correcto pero sin cohesión entre partes. | Deficiente o sin conexión entre código y documentación. | Proyecto incompleto o inejecutable. |

| Rango de puntaje | Desempeño |
| ---------------- | -------------------------------------------------------- |
| 45 – 50          | Excelente dominio técnico y metodológico. |
| 35 – 44          | Buen trabajo con documentación o cobertura parcial. |
| 30 – 34          | Cumple con lo básico pero sin profundidad. |
| < 30             | No cumple con los criterios mínimos del taller/proyecto. |

---

## Documentación completa

La documentación detallada del proyecto (TDD, AAA, Clases de Equivalencia, BDD, cobertura y conclusiones) se encuentra en [`docs/wiki/`](docs/wiki/) y está diseñada para publicarse en el **Wiki del repositorio**.

---

## Referencias

- Myers, G. J., *The Art of Software Testing* (3rd ed.).
- Koskela, L., *Effective Unit Testing*.
- Martin, R. C., *Clean Architecture*.
- Documentación oficial: *Vitest*, *V8*, *BDD Gherkin Syntax*.

---

> **Nota final:**
> Este proyecto es una **extensión práctica del Taller de Pruebas Unitarias**.
> Se espera que los estudiantes **repliquen la metodología** aplicada en el taller dentro de su propio dominio.
> Documentar todo el proceso en el **Wiki** del repositorio y demostrando el uso correcto de **TDD, AAA, Clases de Equivalencia y BDD**.

---

## Créditos y uso académico

**Autor original del taller:** César Augusto Vega Fernández
**Curso:** Testing y Validación de Software
**Programa:** Maestría en Ingeniería de Software – Universidad de La Sabana
**Año:** 2025

**Equipo RoomBooking:**
- Jeison David Berdugo Orejarena
- Jagler David Velasquez Velasquez
- Rigo Armando Rosero Castillo

Este taller y su contenido fueron diseñados por el profesor **César Augusto Vega Fernández** como material académico para el curso *Testing y Validación de Software*, impartido en la **Maestría en Ingeniería de Software de la Universidad de La Sabana**.

Su propósito es exclusivamente educativo y está orientado a fortalecer las competencias de los estudiantes en **TDD, AAA, Clases de Equivalencia, BDD** y validación de software en contextos de arquitectura limpia.

---

### Licencia de uso

Este material se distribuye bajo la licencia [Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional (CC BY-NC-SA 4.0)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es).

Puedes **usar, adaptar o compartir** este contenido con fines educativos, siempre que:

1. Se reconozca la autoría del profesor **César Augusto Vega Fernández**.
2. No se utilice con fines comerciales.
3. Las obras derivadas se distribuyan bajo la misma licencia.

---

© Universidad de La Sabana – Facultad de Ingeniería
Maestría en Ingeniería de Software – 2025
