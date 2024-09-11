<div align="center">

| Portfolio Personal MGC |
| ---------------------- |

</div>

Este portafolio está desarrollado con **Next.js**, **Supabase** y **TypeScript**. Aquí presento las principales características que lo hacen único:

## Autenticación y Comentarios

- **Inicio de sesión con GitHub**: Los usuarios pueden autenticarse con su cuenta de GitHub.
- **Sistema de comentarios**: Una vez autenticados, los usuarios pueden dejar comentarios en mi portafolio. Los comentarios se almacenan y reflejan automáticamente en la base de datos.

## Cookies y Geolocalización

- **Cookies**: Se almacenan cookies para recordar información del usuario y mejorar la experiencia de navegación.
- **Geolocalización**: Utilizo geolocalización para registrar la ubicación de los usuarios. Los datos se guardan en la base de datos de Supabase mediante SQL.
- **Registro de visitas**: Almaceno la cantidad de veces que un perfil es visitado, identificando a los usuarios por su dirección IP. Si la IP se repite, no se incrementa el contador.

## Navegación Fluida

- **Transiciones entre páginas**: Implemento **View Transitions** para que las transiciones entre páginas sean suaves y fluidas, brindando una experiencia visual más dinámica.

## Componentes UI y Tipado

- **Componentes interactivos**: La interfaz cuenta con botones animados y movimientos personalizados, diseñados específicamente para mejorar la interacción del usuario.
- **Tipado con TypeScript**: Cada componente está fuertemente tipado con **TypeScript**, y las definiciones de props están separadas, garantizando una estructura clara y mantenible.

## Sección Privada del Usuario

- **Área de usuario**: Los usuarios autenticados tienen acceso a una sección privada.
- **Formulario interactivo**: En esta área, pueden compartir mensajes conmigo a través de un formulario, y también tienen la opción de eliminarlos si lo desean.

## Base de Datos

- **Gestión de datos**: Toda la lógica de backend está desarrollada con SQL en **Supabase**, asegurando un manejo eficiente y escalable de los datos del usuario y visitas.
