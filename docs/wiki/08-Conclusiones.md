# 08 — Conclusiones

## Aprendizajes técnicos

El enfoque TDD ayudó a separar claramente las reglas de negocio de los modelos de datos. Los modelos se mantuvieron simples y las reglas se implementaron únicamente después de tener pruebas fallidas que describieran el comportamiento esperado.

## Beneficios del patrón AAA

AAA permitió que los tests fueran legibles y auditables. Cada prueba muestra de forma clara la preparación, acción y aserción.

## Beneficios de BDD

Los escenarios Given / When / Then facilitaron conectar el lenguaje del dominio con los tests automatizados.

## Dificultades

- Definir los bordes de solapamiento temporal.
- Evitar lógica en modelos durante la creación de entidades.
- Mantener la documentación alineada con los componentes reales del código.

## Resultado final

El repositorio queda preparado para entrega académica con pruebas unitarias automatizadas, cobertura local, GitHub Actions, configuración de Codecov y documentación base para publicar en la Wiki de GitHub.
