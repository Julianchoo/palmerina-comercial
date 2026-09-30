# Home del paseo y plano interactivo

## Overview

Implementar el pedido directo del usuario del 29/09: siete imágenes nuevas, nueva home para el proyecto actual y acceso a un plano más fácil de usar. El estilo de las imágenes fotorrealistas anteriores está definido en la conversación. La autorización abarca estos cambios reversibles; no requiere repetir la aprobación del alcance solicitado.

## Quick Links

- [Requirements](./requirements.md)
- [Action Required](./action-required.md)

## Dependency Graph

Imágenes y plano se preparan en paralelo. La home integra ambos después de su revisión.

## Waves

| Wave | Tasks | Description |
| --- | --- | --- |
| 1 | task-01, task-02 | Siete imágenes y mapa más cómodo |
| 2 | task-03 | Home visual con los recursos finales |

## Task Status

### Wave 1
- [x] [task-01-imagenes](./tasks/task-01-imagenes.md)
- [x] [task-02-plano](./tasks/task-02-plano.md)

### Wave 2
- [ ] [task-03-home](./tasks/task-03-home.md)

## Wave 1 verification

Review PASS. Seven new conceptual images plus the approved hero. Map data and geometry unchanged; desktop/mobile controls, routes and iframe verified. Typecheck and scoped ESLint PASS. Global lint retains the prior missing React plugin configuration error. The alias plano.html preserves the return link from the maqueta.
