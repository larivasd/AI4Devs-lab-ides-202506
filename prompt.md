## IDE: Cursor - Agent Auto 

PROMPT PARA IMPLEMENTAR SISTEMA DE GESTIÓN DE CANDIDATOS ATS

-Necesito que implementes un sistema completo de gestión de candidatos para un ATS (Applicant Tracking System) con las siguientes especificaciones técnicas:

REQUISITOS FUNCIONALES:
-Formulario de registro de candidatos con campos: nombre, apellido, email, teléfono, dirección, educación y experiencia laboral
-Validación de datos en frontend y backend (email válido, campos obligatorios)
-Carga de archivos CV en formatos PDF/DOCX
-Mensajes de confirmación y manejo de errores
-Interfaz responsive y accesible

ARQUITECTURA TÉCNICA:
-Backend: Node.js con Express/TypeScript
-Frontend: React con TypeScript
-Base de datos: PostgreSQL con Prisma ORM
-Almacenamiento de archivos: Sistema de archivos local o cloud storage

TAREAS ESPECÍFICAS A IMPLEMENTAR:
-Base de datos:
--Crear modelo Prisma para candidatos con todos los campos necesarios
--Incluir campos para CV y metadatos de archivos
--Generar y ejecutar migración inicial

-Backend:
-API REST para CRUD de candidatos
-Endpoint para subir archivos CV
-Validación de datos con middleware
-Manejo de errores y respuestas HTTP apropiadas

-Frontend:
-Componente de formulario de candidatos con validación
-Integración con API backend
-Componente de carga de archivos
-Mensajes de feedback (éxito/error)
-Diseño responsive y accesible

CONSIDERACIONES TÉCNICAS:
-Usar TypeScript en todo el stack
-Implementar validación tanto en frontend como backend
-Manejar archivos de manera segura
-Seguir mejores prácticas de UX/UI
-Incluir manejo de estados de carga y errores

Por favor, implementa esta funcionalidad paso a paso, comenzando por la base de datos y siguiendo con el backend y frontend. Asegúrate de que todo esté integrado correctamente y funcione de manera fluida.

-prompts posteriores:
1. por favor, incluye las pruebas unitarias en ambos proyectos de back y de front
2. agrega los archivos de prueba con ejemplos para ambos proyectos, solo pruebas unitarias, no de integracion
3. hay error en la consola corriendo el front, chequea que pasa
4. en la opcion de editar el candidato, cuando abre el modal debe mostrar los datos prellenados
5. las pruebas unitarias fallan, ajusta y chequea que sucede, aplica automaticamente cualquier cambio que consideres para corregirlo.
6. por ultimo, actualiza el readme por favor, con la estructura del proyecto actual