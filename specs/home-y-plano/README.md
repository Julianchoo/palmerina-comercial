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
- [x] [task-03-home](./tasks/task-03-home.md)

## Wave 1 verification

Review PASS. Seven new conceptual images plus the approved hero. Map data and geometry unchanged; desktop/mobile controls, routes and iframe verified. Typecheck and scoped ESLint PASS. Global lint retains the prior missing React plugin configuration error. The alias plano.html preserves the return link from the maqueta.

## Wave 2 verification

Review PASS. Home rebuilt with all seven new images and the approved hero; residential directory prioritizes five countries, with specific routes to the project, three access references and four complementary services. Independent production and standalone browser checks at 1440/390 passed images, navigation, unit-plan search/ficha and return, rental route, and horizontal overflow. No application JavaScript errors. Build, typecheck and scoped ESLint PASS; global lint retains its existing React-plugin configuration error. Geographic Maps returned HTTP 200 with valid TLS; the QA browser's certificate block is documented in the preview README and verification.json. Production keeps the real iframe, and the standalone preview presents location text and an external Maps link.

Reviewable deliverable: [preview/index.html](./preview/index.html). No push or deployment performed.
