# Conclusiones y Reflexión Final

## Principales aprendizajes del proceso TDD

La aplicación del ciclo Red → Green → Refactor permitió diseñar el código de forma incremental, asegurando que cada línea de implementación responde directamente a un comportamiento especificado por una prueba. Esto evitó sobrediseño y mantuvo el código enfocado en los requisitos.

## Dificultades y cómo se resolvieron

- **Definición de fronteras de responsabilidad:** Al inicio hubo dudas sobre qué validaciones pertenecían al modelo (constructor) versus a las reglas de dominio. Se resolvió manteniendo los modelos como POPOs sin lógica y delegando toda validación a las reglas.
- **Elección de valores límite:** Identificar los valores frontera para `capacity` (cero, negativo, no entero) requirió analizar el dominio, no solo el tipo de dato.

## Beneficios de aplicar AAA y BDD

- **AAA** facilitó la lectura de las pruebas al separar claramente la preparación, ejecución y verificación. Cualquier miembro del equipo puede entender un test en segundos.
- **BDD** permitió expresar los escenarios en lenguaje natural (Given-When-Then), sirviendo como documentación viva del comportamiento esperado del sistema.

## ¿Qué reglas de negocio fueron más desafiantes?

Las reglas relacionadas con conflictos de reservas y disponibilidad requieren manejo de intervalos de tiempo y superposición parcial, lo que añade complejidad en la definición de clases de equivalencia y casos frontera.

## Mantenibilidad de las pruebas

Para asegurar la mantenibilidad a futuro:
- Nomenclatura consistente (`should...When...`)
- Estructura AAA en todos los tests
- Extracción de constantes y métodos privados en la implementación
- Evitar duplicación mediante describe anidado
