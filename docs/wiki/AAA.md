# Patrón AAA (Arrange – Act – Assert)

Todas las pruebas del proyecto siguen el patrón AAA para garantizar legibilidad y estructura consistente.

## Estructura

```
// Arrange — preparar datos y dependencias
// Act     — ejecutar la acción bajo prueba
// Assert  — verificar el resultado esperado
```

## Ejemplo

```typescript
it('shouldReturnFalseWhenCapacityIsZero', () => {
  // Arrange
  const room = new Room('4', 'Sala D', 0)
  const validator = new RoomValidation()

  // Act
  const result = validator.validate(room)

  // Assert
  expect(result).toBe(false)
})
```

Cada sección está claramente delimitada con un comentario y una línea en blanco, lo que permite identificar rápidamente qué hace el test.

## Beneficios

- **Separación de responsabilidades:** Cada fase del test tiene un propósito claro.
- **Legibilidad:** Cualquier persona puede entender el test sin necesidad de leer la implementación.
- **Aislamiento:** Los errores se localizan fácilmente (falla en Arrange, Act o Assert).
