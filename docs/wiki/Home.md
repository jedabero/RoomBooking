# RoomBooking — Documentación del Proyecto

## Descripción del dominio

**RoomBooking** es un sistema de reserva de salas de reunión. El propósito del sistema es gestionar la disponibilidad, asignación y control de salas en una organización, asegurando que las reglas de negocio se cumplan antes de confirmar una reserva.

### Reglas de negocio

1. **Validación de salas** — Una sala debe tener un identificador, un nombre y una capacidad válida (entero positivo) para poder ser registrada.
2. **Políticas de reserva** — Las reservas deben cumplir con restricciones de duración máxima y anticipación mínima.
3. **Detección de conflictos** — No pueden existir dos reservas que se superpongan en la misma sala y en el mismo rango de tiempo.
4. **Disponibilidad** — Una sala solo puede reservarse si está disponible en el rango solicitado.
5. **Permisos por rol** — El acceso a las operaciones del sistema depende del rol del usuario (ADMIN, MANAGER, USER).

### Problema a resolver

Diseñar e implementar un módulo de dominio puro que valide estas reglas de negocio mediante **pruebas unitarias automatizadas**, siguiendo la metodología TDD, el patrón AAA, y documentando mediante Clases de Equivalencia y escenarios BDD.

### Integrantes del equipo

- Jeison David Berdugo Orejarena
- Jagler David Velasquez Velasquez
- Rigo Armando Rosero Castillo
