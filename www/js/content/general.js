// Fitxes generals (bilingües)
const both = (ca, es) => ({ ca, es });

export const OFFICIAL_URL = "https://www.accio.gencat.cat/es/serveis/convocatories-dajuts/llistat-ajuts/tramits/Prova-daptitud-personal-PAP-per-a-lacces-als-graus-en-educacio-infantil-i-educacio-primaria";

export const GENERAL_THEORY = [
  { id: "t_pap", topic: "info", icon: "🎓", title: both("Què és la PAP i com és", "Qué es la PAP y cómo es"),
    html: both(`<p>La <b>Prova d'Aptitud Personal (PAP)</b> és obligatòria per accedir als graus d'<b>Educació Infantil</b> i <b>Educació Primària</b> a Catalunya. Consta de <b>dos exàmens</b>:</p>
<h4>1. Competència comunicativa i raonament crític (CCIRC) · 100 punts</h4>
<ul><li><b>Secció 1 – Comprensió lectora</b> (30 p): preguntes de resposta tancada (+3 si l'encertes, −1,5 si falles, 0 en blanc) i preguntes obertes.</li>
<li><b>Secció 2 – Expressió escrita</b> (50 p): columna d'opinió, conte, carta... Es valora: valoració global (5), adequació (15), coherència (15) i cohesió (15).</li>
<li><b>Secció 3 – Domini del sistema lingüístic</b> (20 p): en un text amb errors n'has de <b>detectar 10, corregir-los i justificar-los</b> (0,5 + 0,75 + 0,75 per error).</li>
<li>⚠️ A tota la prova es descompta <b>−1 punt per cada error normatiu</b>.</li></ul>
<h4>2. Competència logicomatemàtica (CLOM)</h4>
<ul><li>Problemes de nombres, proporcionalitat, mesura, geometria, àlgebra, estadística, probabilitat i raonament lògic.</li>
<li>No cal haver cursat matemàtiques al batxillerat.</li>
<li>Es valora el procés i la <b>justificació</b>, no només el resultat.</li></ul>
<h4>Qui l'ha de fer?</h4>
<p>Qui accedeix des del batxillerat, CFGS, proves per a més grans de 25/45 anys, accés per a més grans de 40 o sistemes estrangers, i qui no l'ha superada abans. N'estan exempts qui ja l'ha aprovada (des del 2017) o té una titulació universitària.</p>
<p>📅 Hi ha una convocatòria ordinària (abril) i una d'extraordinària (juliol). Consulta sempre les dates i requisits a la web oficial.</p>`,
      `<p>La <b>Prueba de Aptitud Personal (PAP)</b> es obligatoria para acceder a los grados de <b>Educación Infantil</b> y <b>Educación Primaria</b> en Cataluña. Consta de <b>dos exámenes</b>:</p>
<h4>1. Competencia comunicativa y razonamiento crítico (CCIRC) · 100 puntos</h4>
<ul><li><b>Sección 1 – Comprensión lectora</b> (30 p): preguntas cerradas (+3 si aciertas, −1,5 si fallas, 0 en blanco) y preguntas abiertas.</li>
<li><b>Sección 2 – Expresión escrita</b> (50 p): columna de opinión, cuento, carta... Se valora: valoración global (5), adecuación (15), coherencia (15) y cohesión (15).</li>
<li><b>Sección 3 – Dominio del sistema lingüístico</b> (20 p): en un texto con errores tienes que <b>detectar 10, corregirlos y justificarlos</b> (0,5 + 0,75 + 0,75 por error).</li>
<li>⚠️ En toda la prueba se descuenta <b>−1 punto por cada error normativo</b>.</li></ul>
<h4>2. Competencia logicomatemática (CLOM)</h4>
<ul><li>Problemas de números, proporcionalidad, medida, geometría, álgebra, estadística, probabilidad y razonamiento lógico.</li>
<li>No hace falta haber cursado matemáticas en bachillerato.</li>
<li>Se valora el proceso y la <b>justificación</b>, no solo el resultado.</li></ul>
<h4>¿Quién tiene que hacerla?</h4>
<p>Quien accede desde bachillerato, CFGS, pruebas para mayores de 25/45 años, acceso para mayores de 40 o sistemas extranjeros, y quien no la ha superado antes. Están exentos quienes ya la aprobaron (desde 2017) o tienen una titulación universitaria.</p>
<p>📅 Hay una convocatoria ordinaria (abril) y una extraordinaria (julio). Consulta siempre fechas y requisitos en la web oficial.</p>`) },
  { id: "t_props", topic: "escr", icon: "🏗️", title: both("Adequació, coherència i cohesió", "Adecuación, coherencia y cohesión"),
    html: both(`<p><b>Adequació</b>: el text s'adapta a la situació. Gènere correcte (columna, carta...), registre formal i constant, té en compte el lector i la intenció.</p>
<p><b>Coherència</b>: el text té sentit global. Una idea central (tesi), estructura clara (introducció – desenvolupament – conclusió), idees rellevants i ben ordenades, sense contradiccions.</p>
<p><b>Cohesió</b>: els mecanismes lingüístics que lliguen el text. Connectors, puntuació, paràgrafs, pronoms i sinònims per evitar repeticions, el·lipsis.</p>
<h4>Plantilla per a un text d'opinió</h4>
<ol><li><b>Introducció</b>: ganxo (pregunta, anècdota, dada) + tesi.</li><li><b>Argument 1</b> + exemple.</li><li><b>Argument 2</b> + exemple.</li><li><b>Contraargument</b> i refutació («És cert que..., però...»).</li><li><b>Conclusió</b>: reformula la tesi i tanca amb una idea potent.</li></ol>
<p>💡 Reserva 5 minuts per revisar accents, apòstrofs, concordances i barbarismes: cada error resta 1 punt!</p>`,
      `<p><b>Adecuación</b>: el texto se adapta a la situación. Género correcto (columna, carta...), registro formal y constante, tiene en cuenta al lector y la intención.</p>
<p><b>Coherencia</b>: el texto tiene sentido global. Una idea central (tesis), estructura clara (introducción – desarrollo – conclusión), ideas relevantes y bien ordenadas, sin contradicciones.</p>
<p><b>Cohesión</b>: los mecanismos lingüísticos que enlazan el texto. Conectores, puntuación, párrafos, pronombres y sinónimos para evitar repeticiones, elipsis.</p>
<h4>Plantilla para un texto de opinión</h4>
<ol><li><b>Introducción</b>: gancho (pregunta, anécdota, dato) + tesis.</li><li><b>Argumento 1</b> + ejemplo.</li><li><b>Argumento 2</b> + ejemplo.</li><li><b>Contraargumento</b> y refutación («Es cierto que..., pero...»).</li><li><b>Conclusión</b>: reformula la tesis y cierra con una idea potente.</li></ol>
<p>💡 Reserva 5 minutos para revisar tildes, concordancias y barbarismos: ¡cada error resta 1 punto!</p>`) },
  { id: "t_conn", topic: "cohesio", icon: "🔗", title: both("Connectors (català i castellà)", "Conectores (catalán y castellano)"),
    html: both(`<table class="tbl"><tr><th>Funció</th><th>Català</th><th>Castellà</th></tr>
<tr><td>Ordenar</td><td>en primer lloc, d'una banda, finalment</td><td>en primer lugar, por un lado, finalmente</td></tr>
<tr><td>Afegir</td><td>a més, així mateix, fins i tot</td><td>además, asimismo, incluso</td></tr>
<tr><td>Oposar</td><td>però, tanmateix, no obstant això, en canvi</td><td>pero, sin embargo, no obstante, en cambio</td></tr>
<tr><td>Concedir</td><td>tot i que, encara que, malgrat que</td><td>aunque, a pesar de que, si bien</td></tr>
<tr><td>Causa</td><td>perquè, ja que, atès que, com que</td><td>porque, ya que, puesto que, dado que</td></tr>
<tr><td>Conseqüència</td><td>per tant, així doncs, en conseqüència</td><td>por tanto, así pues, por consiguiente</td></tr>
<tr><td>Exemplificar</td><td>per exemple, com ara</td><td>por ejemplo, como</td></tr>
<tr><td>Reformular</td><td>és a dir, o sigui, dit d'una altra manera</td><td>es decir, o sea, dicho de otro modo</td></tr>
<tr><td>Concloure</td><td>en resum, en definitiva, en conclusió</td><td>en resumen, en definitiva, en conclusión</td></tr></table>`,
      `<table class="tbl"><tr><th>Función</th><th>Catalán</th><th>Castellano</th></tr>
<tr><td>Ordenar</td><td>en primer lloc, d'una banda, finalment</td><td>en primer lugar, por un lado, finalmente</td></tr>
<tr><td>Añadir</td><td>a més, així mateix, fins i tot</td><td>además, asimismo, incluso</td></tr>
<tr><td>Oponer</td><td>però, tanmateix, no obstant això, en canvi</td><td>pero, sin embargo, no obstante, en cambio</td></tr>
<tr><td>Conceder</td><td>tot i que, encara que, malgrat que</td><td>aunque, a pesar de que, si bien</td></tr>
<tr><td>Causa</td><td>perquè, ja que, atès que, com que</td><td>porque, ya que, puesto que, dado que</td></tr>
<tr><td>Consecuencia</td><td>per tant, així doncs, en conseqüència</td><td>por tanto, así pues, por consiguiente</td></tr>
<tr><td>Ejemplificar</td><td>per exemple, com ara</td><td>por ejemplo, como</td></tr>
<tr><td>Reformular</td><td>és a dir, o sigui, dit d'una altra manera</td><td>es decir, o sea, dicho de otro modo</td></tr>
<tr><td>Concluir</td><td>en resum, en definitiva, en conclusió</td><td>en resumen, en definitiva, en conclusión</td></tr></table>`) },
  { id: "t_errhunt", topic: "errors", icon: "🔍", title: both("Com detectar i justificar errors", "Cómo detectar y justificar errores"),
    html: both(`<p>A la secció 3 has de trobar <b>10 errors</b>, corregir-los i <b>justificar-los amb terminologia gramatical</b> (la justificació «amb conceptes gramaticals pertinents» val més que una d'intuïtiva).</p>
<h4>Llista de revisió (busca per ordre)</h4>
<ol><li><b>Accents i dièresis</b>: aguda/plana/esdrúixola, diacrítics.</li><li><b>Apòstrofs i contraccions</b>: la humitat, se'n, al.</li><li><b>Concordances</b>: subjecte–verb, nom–adjectiu (la pobra dona).</li><li><b>Pronoms febles</b>: li/l'hi, els/lis, hi/en.</li><li><b>Formes verbals</b>: participis (imprès), subjuntius (pogués).</li><li><b>Preposicions i règim</b>: adonar-se que, visitar el metge.</li><li><b>Barbarismes i calcs</b>: tenir que, disfrutar, desde.</li><li><b>Lèxic impropi</b>: tràfic/trànsit.</li><li><b>Numerals i guionets</b>: quaranta-vuit, vint-i-dos.</li><li><b>Cultura general i coherència</b>: dades falses o contradiccions.</li></ol>
<p>✍️ Model de justificació: «<i>Imprimit</i> és incorrecte perquè el participi del verb <i>imprimir</i> és irregular: <i>imprès</i>.»</p>`,
      `<p>En la sección 3 tienes que encontrar <b>10 errores</b>, corregirlos y <b>justificarlos con terminología gramatical</b> (la justificación «con conceptos gramaticales pertinentes» vale más que una intuitiva).</p>
<h4>Lista de revisión (busca por orden)</h4>
<ol><li><b>Tildes</b>: aguda/llana/esdrújula, diacríticas, hiatos.</li><li><b>Homófonos</b>: hecho/echo, haber/a ver, tuvo/tubo.</li><li><b>Concordancias</b>: sujeto–verbo, haber impersonal.</li><li><b>Pronombres</b>: leísmo, laísmo, orden (se me).</li><li><b>Formas verbales</b>: anduve, condujiste, fuiste, si tuviera.</li><li><b>Preposiciones</b>: dequeísmo y queísmo.</li><li><b>Catalanismos</b>: hacer tarde, picar a la puerta.</li><li><b>Locuciones impropias</b>: en base a, a nivel de.</li><li><b>Puntuación</b>: vocativos, incisos.</li><li><b>Cultura general y coherencia</b>: datos falsos o contradicciones.</li></ol>
<p>✍️ Modelo de justificación: «<i>Habían muchos problemas</i> es incorrecto porque el verbo <i>haber</i> impersonal es invariable: <i>había</i>.»</p>`) },
];
