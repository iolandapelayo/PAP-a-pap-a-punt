# PAP a punt / PAP a punto

App para preparar la **Prueba de Aptitud Personal (PAP)** de acceso a los grados de Educación Infantil y Primaria en Cataluña. Interfaz en **catalán o castellano**, sesiones diarias de **20 minutos**, correcciones al momento y marcador de progreso (XP, niveles, racha, insignias, dominio por temas y nota estimada).

Una sola base de código (`www/`) sirve para las tres plataformas:

| Plataforma | Cómo se distribuye |
|---|---|
| **Web** | Sube la carpeta `www/` a cualquier hosting estático (Netlify, Vercel, GitHub Pages, Firebase Hosting...). Es una PWA: funciona sin conexión y se puede «instalar» desde el navegador. |
| **Android** | Capacitor genera un proyecto de Android Studio → `.aab` para Google Play. |
| **iOS** | Capacitor genera un proyecto de Xcode → App Store (requiere un Mac y una cuenta de Apple Developer). |

## Cuentas de usuario y progreso en la nube (Supabase)

Para usar la app hay que **registrarse con email y contraseña**. El progreso de cada persona se guarda en la nube (y en caché en el dispositivo, para poder practicar sin conexión), así que se recupera al entrar desde cualquier móvil o navegador. Además se guarda un **histórico**: una fila por cada sesión, práctica o simulacro (fecha, modo, aciertos, XP, minutos, nota y resultados por tema). El alumno lo ve en *Progreso → Historial de actividad*.

### Configurar Supabase (una sola vez, ~10 minutos)

1. Crea una cuenta y un proyecto gratuito en [supabase.com](https://supabase.com) (región recomendada: EU).
2. En **SQL Editor → New query**, pega el contenido de [`supabase/schema.sql`](supabase/schema.sql) y pulsa **Run**. Esto crea:
   - `progress`: estado actual del progreso de cada usuario.
   - `activity`: histórico de actividad (no se puede modificar desde la app).
   - Políticas de seguridad (RLS): cada persona solo puede leer y escribir sus propios datos.
   - La función `delete_user()`, para que cada persona pueda borrar su cuenta desde la app (obligatorio en App Store y Google Play).
3. En **Project Settings → API**, copia la *Project URL* y la clave *anon public* y pégalas en [`www/js/config.js`](www/js/config.js). La clave *anon* es pública por diseño; nunca pongas allí la clave *service_role*.
4. En **Authentication → URL Configuration**, pon como *Site URL* la dirección donde publiques la web (p. ej. `https://tu-usuario.github.io/pap-a-punt/`) y añádela también a *Redirect URLs*. Los correos de confirmación y de recuperación de contraseña llevan a esa dirección.
5. (Opcional) En **Authentication → Providers → Email** puedes desactivar *Confirm email* si no quieres que el alumno tenga que confirmar el correo. Para producción, configura un SMTP propio en **Authentication → SMTP**: el servidor de correo incluido tiene un límite de envíos muy bajo.

Si `config.js` no está configurado, la app muestra una pantalla que lo indica.

**Consultar los datos:** en Supabase, *Table Editor → activity* muestra el histórico de todos los usuarios (por ejemplo, para hacer seguimiento de un grupo). *Authentication → Users* muestra las cuentas.

**Protección de datos:** la app guarda email, progreso e histórico. Antes de publicarla en las tiendas necesitas una política de privacidad (Apple y Google la exigen) que explique qué datos se guardan, para qué, dónde (Supabase, región elegida) y cómo borrarlos (Ajustes → Borrar la cuenta).

## Probarla en local

No requiere compilación. Cualquier servidor estático sirve:

```bash
python -m http.server 8080 --directory www
```

Abre http://localhost:8080.

## Generar las apps de iOS y Android

Requisitos: Node.js 18+, Android Studio (para Android) y Xcode en un Mac (para iOS).

```bash
npm install
npx cap add android
npx cap add ios
npm run cap:assets   # genera iconos y splash a partir de assets/ (ver abajo)
npx cap sync
npx cap open android # o: npx cap open ios
```

Para los iconos nativos, crea una carpeta `assets/` con `icon.png` (1024×1024; puedes copiar `www/icons/icon-1024.png`) antes de ejecutar `npm run cap:assets`.

Cada vez que cambies algo en `www/`, ejecuta `npx cap sync`.

## Estructura

```
www/
  index.html, styles.css, manifest.webmanifest, sw.js
  js/app.js          interfaz, registro/login, sesiones, corrección, gamificación
  js/store.js        progreso del usuario (caché local + sincronización)
  js/cloud.js        cuentas y datos en Supabase (auth, progreso, histórico)
  js/config.js       URL y clave pública de Supabase
  js/i18n.js         textos de la interfaz (ca / es)
  js/content/
    lang-ca.js       preguntas, textos con errores y teoría de catalán
    lang-es.js       ídem de castellano
    reading.js       lecturas con preguntas (puntuación PAP +3 / −1,5)
    writing.js       temas de redacción, rúbrica oficial, corrector automático
    math.js          16 generadores de problemas (infinitos) + lógica + teoría
    general.js       ficha de la PAP, propiedades textuales, conectores
supabase/schema.sql  tablas, seguridad (RLS) y borrado de cuenta
docs/                listado de contenidos en Word para revisión docente
```

## Cobertura del temario

- **CCIRC – Comprensión lectora**: textos argumentativos con preguntas cerradas (puntuación real de la PAP) y preguntas abiertas con respuesta modelo.
- **CCIRC – Expresión escrita**: 10 temas (columna, carta, cuento...), temporizador, corrector automático (conectores, repeticiones, errores frecuentes, párrafos) y autoevaluación con la rúbrica oficial (global 5 + adecuación 15 + coherencia 15 + cohesión 15).
- **CCIRC – Dominio del sistema lingüístico**: «caza de errores» sobre textos (como en el examen) con corrección y justificación, más ~100 preguntas de ortografía, morfosintaxis, léxico y cohesión en catalán y castellano.
- **CLOM**: números y fracciones, proporcionalidad y porcentajes, medida, geometría, álgebra, estadística, probabilidad y razonamiento lógico, con solución paso a paso.

## Añadir contenido

Las preguntas son objetos JS sencillos. Ejemplo (en `lang-ca.js`):

```js
{ id: "ca56", topic: "ca_orto", q: "Pregunta", o: ["correcta", "incorrecta 1", "incorrecta 2"], a: 0, e: "Explicación" }
```

En los textos con errores, cada error se marca así: `{error|corrección|justificación}`.

> App no oficial. Consulta siempre la información oficial de la PAP en la web de la Generalitat.
