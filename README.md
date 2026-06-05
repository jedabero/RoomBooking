# RoomBooking — Pruebas Unitarias

Sistema de reserva de salas. Este proyecto aplica las estrategias del **Taller de Pruebas Unitarias** para diseñar, implementar y validar un módulo de negocio mediante **pruebas automatizadas** con TypeScript y Vitest.

---

## Dominio

**RoomBooking** permite gestionar la reserva de salas de reunión. Las reglas de negocio incluyen:

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
│   ├── rules/           # Reglas de negocio (ReservationConflict, Availability, etc.)
│   └── exception/       # Excepciones de dominio
test/
└── domain/
    └── rules/           # Pruebas unitarias del dominio
```

---

### Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar pruebas
npx vitest run

# Reporte de cobertura
npx vitest run --coverage
```

Las pruebas deben ejecutarse **de manera automática** sin pasos adicionales.

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
