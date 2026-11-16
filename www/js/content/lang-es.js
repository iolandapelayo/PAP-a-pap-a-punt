// Contenido de lengua castellana (dominio del sistema lingüístico)

export const ES_MCQ = [
  // ---------- Ortografía y acentuación ----------
  { id: "es1", topic: "es_orto", q: "¿Cuál está bien escrita?", o: ["examen", "exámen", "examén"], a: 0, e: "«Examen» es llana terminada en -n: las llanas solo llevan tilde si NO terminan en vocal, -n o -s." },
  { id: "es2", topic: "es_orto", q: "¿Cuál está bien escrita?", o: ["exámenes", "examenes", "examénes"], a: 0, e: "«Exámenes» es esdrújula: las esdrújulas llevan tilde siempre." },
  { id: "es3", topic: "es_orto", q: "Según la Ortografía de la RAE (2010), ¿qué opción es la recomendada?", o: ["Solo tengo dos euros.", "Sólo tengo dos euros.", "Sóló tengo dos euros."], a: 0, e: "El adverbio «solo» y los demostrativos (este, ese, aquel) no llevan tilde, ni siquiera en caso de ambigüedad." },
  { id: "es4", topic: "es_orto", q: "¿Cuál es la forma correcta?", o: ["guion", "guión", "guíon"], a: 0, e: "«Guion» es monosílaba a efectos ortográficos (diptongo ui): no lleva tilde. Igual: truhan, fie, rio (pasado de reír)." },
  { id: "es5", topic: "es_orto", q: "Completa: «No sé ___ no ha venido.»", o: ["por qué", "porque", "porqué"], a: 0, e: "Interrogativa indirecta (por qué motivo): «por qué», separado y con tilde." },
  { id: "es6", topic: "es_orto", q: "Completa: «Explícame el ___ de tu decisión.»", o: ["porqué", "por qué", "porque"], a: 0, e: "«El porqué» es un sustantivo (= la causa, el motivo): junto y con tilde." },
  { id: "es7", topic: "es_orto", q: "Completa: «¡___ si apruebas a la primera!»", o: ["A ver", "Haber", "Aver"], a: 0, e: "«A ver» = preposición + verbo ver. «Haber» es un verbo (infinitivo) o un sustantivo (el haber)." },
  { id: "es8", topic: "es_orto", q: "Completa: «Ya he ___ la cena.»", o: ["hecho", "echo", "echado"], a: 0, e: "«Hecho» es el participio de «hacer» (con h). «Echo/echado» son del verbo «echar» (lanzar, verter)." },
  { id: "es9", topic: "es_orto", q: "Completa: «Saltó la ___ del jardín.»", o: ["valla", "vaya", "baya"], a: 0, e: "Valla = cerca, vallado. Vaya = verbo ir o interjección. Baya = fruto." },
  { id: "es10", topic: "es_orto", q: "Completa: «Se rompió el ___ de escape.»", o: ["tubo", "tuvo"], a: 0, e: "Tubo = pieza cilíndrica hueca. Tuvo = verbo tener." },
  { id: "es11", topic: "es_orto", q: "Completa: «___ me lo dijo ayer.»", o: ["Él", "El"], a: 0, e: "Tilde diacrítica: «él» es pronombre personal; «el» es artículo." },
  { id: "es12", topic: "es_orto", q: "Completa: «___ no ha llegado el tren.»", o: ["Aún", "Aun"], a: 0, e: "«Aún» (con tilde) = todavía. «Aun» (sin tilde) = incluso, hasta: «Aun así, iré»." },
  { id: "es13", topic: "es_orto", q: "Completa: «No es rojo, ___ azul.»", o: ["sino", "si no"], a: 0, e: "«Sino» es conjunción adversativa (contrapone ideas). «Si no» es condicional: «Si no vienes, me enfado»." },
  { id: "es14", topic: "es_orto", q: "Completa: «Se miró ___ en el espejo.»", o: ["a sí mismo", "asimismo", "así mismo"], a: 0, e: "«A sí mismo» = preposición + pronombre reflexivo + mismo. «Asimismo» = también." },
  { id: "es15", topic: "es_orto", q: "¿Cuál está bien escrita?", o: ["prohibir", "proibir", "prohivir"], a: 0, e: "Se escribe con h intercalada y b: prohibir. Los verbos terminados en -bir se escriben con b (salvo hervir, servir, vivir)." },
  { id: "es16", topic: "es_orto", q: "¿Cuál es correcta?", o: ["El examen es el lunes.", "El examen es el Lunes.", "El Examen es el lunes."], a: 0, e: "Los días de la semana y los meses se escriben con minúscula." },
  { id: "es17", topic: "es_orto", q: "¿Qué oración está bien puntuada?", o: ["Juan, ven aquí.", "Juan ven aquí.", "Juan ven, aquí."], a: 0, e: "El vocativo (nombre de la persona a quien hablamos) siempre va entre comas." },
  { id: "es18", topic: "es_orto", q: "¿Qué palabra NO debe llevar tilde?", o: ["fue", "también", "después", "difícil"], a: 0, e: "Los monosílabos no llevan tilde (salvo la diacrítica): fue, dio, vio, fe." },
  { id: "es19", topic: "es_orto", q: "¿Cuál está bien escrita?", o: ["ojalá", "ojala", "ójala"], a: 0, e: "«Ojalá» es aguda terminada en vocal: lleva tilde." },

  // ---------- Gramática ----------
  { id: "es20", topic: "es_gram", q: "Completa: «A María ___ vi ayer en el parque.»", o: ["la", "le", "lo"], a: 0, e: "Es complemento directo femenino: «la». Usar «le» sería leísmo no admitido." },
  { id: "es21", topic: "es_gram", q: "Completa: «A ella ___ dije la verdad.»", o: ["le", "la", "lo"], a: 0, e: "«La verdad» es el CD; «a ella» es complemento indirecto → «le». Usar «la» sería laísmo." },
  { id: "es22", topic: "es_gram", q: "¿Cuál es correcta?", o: ["Había muchas personas.", "Habían muchas personas.", "Habíanse muchas personas."], a: 0, e: "«Haber» impersonal es invariable: había, hubo, habrá... aunque el complemento sea plural." },
  { id: "es23", topic: "es_gram", q: "¿Cuál es correcta?", o: ["Hubo problemas.", "Hubieron problemas.", "Hubiera problemas ayer."], a: 0, e: "«Haber» impersonal no tiene plural: hubo problemas." },
  { id: "es24", topic: "es_gram", q: "Completa: «Pienso ___ es una buena idea.»", o: ["que", "de que"], a: 0, e: "«Pensar algo» no rige preposición «de». «Pienso de que» es dequeísmo." },
  { id: "es25", topic: "es_gram", q: "Completa: «Me alegro ___ hayas venido.»", o: ["de que", "que"], a: 0, e: "«Alegrarse de algo» → «me alegro de que». Omitir la preposición es queísmo." },
  { id: "es26", topic: "es_gram", q: "Completa: «Me acuerdo ___ veníamos aquí.»", o: ["de que", "que"], a: 0, e: "«Acordarse de algo» → me acuerdo de que. Truco: sustituye por «eso» → «me acuerdo de eso»." },
  { id: "es27", topic: "es_gram", q: "Pretérito perfecto simple de «andar» (yo):", o: ["anduve", "andé", "andí"], a: 0, e: "«Andar» es irregular en el pretérito: anduve, anduviste, anduvo..." },
  { id: "es28", topic: "es_gram", q: "Pretérito perfecto simple de «conducir» (tú):", o: ["condujiste", "conduciste", "condujistes"], a: 0, e: "Verbos en -ducir: conduje, condujiste, condujo. Y sin -s final en la 2.ª persona del singular." },
  { id: "es29", topic: "es_gram", q: "Imperativo de «callarse» (vosotros) en la norma culta:", o: ["callaos", "callaros", "callados"], a: 0, e: "En el imperativo de 2.ª persona del plural con «os», se pierde la -d: callaos, sentaos. «Callaros» (infinitivo) es propio del registro coloquial." },
  { id: "es30", topic: "es_gram", q: "¿Cuál es correcta?", o: ["Cuanto más estudias, más aprendes.", "Contra más estudias, más aprendes.", "Contra más estudias, menos aprendes más."], a: 0, e: "La forma culta es «cuanto más... más». «Contra más» es vulgar." },
  { id: "es31", topic: "es_gram", q: "¿Cuál es la opción recomendada?", o: ["detrás de mí", "detrás mío", "detrás mía"], a: 0, e: "Con adverbios de lugar (detrás, delante, encima, cerca) se recomienda «de + pronombre»: detrás de mí." },
  { id: "es32", topic: "es_gram", q: "¿Cuál es correcta?", o: ["Si tuviera dinero, viajaría.", "Si tendría dinero, viajaría.", "Si tendría dinero, viajara."], a: 0, e: "En la condicional con «si», se usa el pretérito imperfecto de subjuntivo (tuviera/tuviese), no el condicional." },
  { id: "es33", topic: "es_gram", q: "¿Qué oración contiene un gerundio INCORRECTO?", o: ["Estudió en Madrid, trasladándose después a París.", "Salió corriendo.", "Aprendí inglés viendo series."], a: 0, e: "El gerundio de posterioridad (acción posterior a la principal) es incorrecto: mejor «...y después se trasladó a París»." },
  { id: "es34", topic: "es_gram", q: "Condicional de «satisfacer» (yo):", o: ["satisfaría", "satisfacería", "satisfaciera"], a: 0, e: "«Satisfacer» se conjuga como «hacer»: haría → satisfaría." },
  { id: "es35", topic: "es_gram", q: "¿Cuál es correcta?", o: ["prever", "preveer", "preveír"], a: 0, e: "«Prever» se conjuga como «ver» (ver anticipadamente): preveo, previó. No confundir con «proveer»." },
  { id: "es36", topic: "es_gram", q: "¿Cuál es correcta?", o: ["Se me ha caído.", "Me se ha caído.", "Me ha caídose."], a: 0, e: "El orden de los pronombres átonos es: se + te/me + le/lo → «se me ha caído»." },
  { id: "es37", topic: "es_gram", q: "¿Cuál es correcta?", o: ["Ayer fuiste al cine.", "Ayer fuistes al cine.", "Ayer fuisteis tú al cine."], a: 0, e: "La 2.ª persona del singular del pretérito perfecto simple no lleva -s: fuiste, dijiste, cantaste." },

  // ---------- Léxico y uso (catalanismos, impropiedades) ----------
  { id: "es38", topic: "es_lex", q: "¿Cuál es un catalanismo?", o: ["hacer tarde (llegar tarde)", "llegar tarde", "retrasarse", "demorarse"], a: 0, e: "«Hacer tarde» es un calco del catalán «fer tard». En castellano: llegar tarde." },
  { id: "es39", topic: "es_lex", q: "¿Cuál es correcta en castellano estándar?", o: ["Llamaron a la puerta.", "Picaron a la puerta.", "Tocaron en la puerta de picar."], a: 0, e: "«Picar a la puerta» es un catalanismo (picar a la porta). En castellano: llamar a la puerta." },
  { id: "es40", topic: "es_lex", q: "¿Cuál es correcta?", o: ["Tengo que ir.", "Tengo de ir.", "Tengo ir."], a: 0, e: "La obligación se expresa con «tener que» o «haber de». «Tengo de ir» es un catalanismo o arcaísmo." },
  { id: "es41", topic: "es_lex", q: "¿Qué expresión es preferible según la RAE?", o: ["según los datos", "en base a los datos", "a base de los datos"], a: 0, e: "«En base a» se desaconseja; mejor: según, a partir de, con base en, basándose en." },
  { id: "es42", topic: "es_lex", q: "«A nivel de» solo es correcto cuando...", o: ["hay niveles o alturas reales", "se refiere a cualquier tema", "se usa en registro formal"], a: 0, e: "«A nivel del mar», «a nivel universitario» (hay niveles). Evita «a nivel de disciplina» → en cuanto a la disciplina." },
  { id: "es43", topic: "es_lex", q: "¿Qué significa «sendos»?", o: ["Uno para cada uno", "Ambos", "Grandes", "Varios"], a: 0, e: "«Les dieron sendos libros» = un libro a cada uno. No significa «ambos» ni «grandes»." },
  { id: "es44", topic: "es_lex", q: "¿Cuál es correcta?", o: ["Se marchó temprano.", "Marchó temprano a casa (= se fue).", "Hizo marchar temprano."], a: 0, e: "Con el sentido de «irse», «marchar» es pronominal: marcharse. «Marchar» sin «se» es un catalanismo en este uso." },
  { id: "es45", topic: "es_lex", q: "¿Cuál es la forma correcta?", o: ["aparte de eso", "a parte de eso", "apartede eso"], a: 0, e: "«Aparte» (además, excepto) se escribe junto. «A parte» solo en «no voy a parte alguna»." },

  // ---------- Cohesión (castellano) ----------
  { id: "es46", topic: "cohesio", q: "¿Qué conector expresa CONCESIÓN?", o: ["aunque", "por lo tanto", "además", "es decir"], a: 0, e: "Concesivos: aunque, a pesar de que, si bien. Expresan una objeción que no impide lo principal." },
  { id: "es47", topic: "cohesio", q: "«Llovía mucho; ___, suspendieron el partido.» ¿Qué conector encaja?", o: ["por consiguiente", "sin embargo", "en cambio", "por ejemplo"], a: 0, e: "Se expresa una consecuencia: por consiguiente, por lo tanto, así pues." },
  { id: "es48", topic: "cohesio", q: "¿Qué mecanismo de cohesión hay en «Compré un libro. Lo leí en un día»?", o: ["Referencia pronominal (anáfora)", "Elipsis", "Conector causal", "Hiperonimia"], a: 0, e: "«Lo» remite a «un libro», mencionado antes: es una anáfora pronominal." },
  { id: "es49", topic: "cohesio", q: "¿Qué tipo de texto busca convencer al receptor con argumentos?", o: ["argumentativo", "narrativo", "descriptivo", "instructivo"], a: 0, e: "El texto argumentativo defiende una tesis con argumentos (datos, ejemplos, autoridad...) y suele cerrar con una conclusión." },
];

export const ES_ERRORS = [
  {
    id: "ese1", lang: "es", title: "La reunión de padres",
    text: "Ayer {fuistes|fuiste|La 2.ª persona del singular del pretérito perfecto simple no lleva -s final: «fuiste».} a la reunión de padres, pero no me contaste nada. La tutora dijo que {habían|había|El verbo «haber» impersonal es invariable: «había muchos problemas».} muchos problemas en la clase y que {a nivel de|en cuanto a la|«A nivel de» solo se usa cuando hay niveles reales; aquí conviene «en cuanto a».} disciplina había que mejorar. {Sinó|Si no|Cuando introduce una condición negativa se escribe separado: «si no».} hacemos algo, el curso será complicado. Yo {pienso de que|pienso que|Dequeísmo: el verbo «pensar» no rige la preposición «de».} deberíamos hablar con los niños. Además, a la directora {le|la|Es un complemento directo femenino («a la directora»): corresponde «la», no «le».} vimos muy preocupada. {Hechó|Echó|El verbo «echar» se escribe sin h.} la culpa al horario. Ojalá {halla|haya|«Haya» es del verbo «haber»; «halla» es del verbo «hallar» (encontrar).} una solución pronto."
  },
  {
    id: "ese2", lang: "es", title: "Mi hermano quiere ser maestro",
    text: "Mi hermano {tambien|también|«También» es aguda terminada en vocal: lleva tilde.} quiere ser maestro. Dice que {despues|después|«Después» es aguda terminada en -s: lleva tilde.} del bachillerato estudiará Magisterio en Barcelona. Le pregunté {porque|por qué|En interrogativas indirectas se escribe «por qué», separado y con tilde.} quería dedicarse a la enseñanza y me respondió que le encantan los niños. Cree que es una profesión {dificil|difícil|«Difícil» es llana terminada en consonante distinta de -n o -s: lleva tilde.} pero muy bonita. Ya ha {echo|hecho|«Hecho», participio de «hacer», se escribe con h.} prácticas en una escuela y {tubo|tuvo|«Tuvo» es del verbo «tener»; «tubo» es un objeto cilíndrico.} muy buena experiencia. {Sólo|Solo|Según la Ortografía de 2010, el adverbio «solo» no lleva tilde.} le falta aprobar la PAP. —{Haber|A ver|«A ver» (preposición + verbo «ver») no debe confundirse con el verbo «haber».} si apruebas a la primera —le dije."
  },
  {
    id: "ese3", lang: "es", title: "La excursión",
    text: "El sábado {hicimos tarde|llegamos tarde|«Hacer tarde» es un catalanismo; en castellano se dice «llegar tarde».} a la excursión porque {me se|se me|El orden correcto de los pronombres átonos es «se me».} olvidó poner el despertador. Cuando llegamos, la guía ya {había marchado|se había marchado|Con el sentido de «irse», el verbo es pronominal: «marcharse».}. Tuvimos que {picar|llamar|«Picar a la puerta» es un catalanismo; se dice «llamar a la puerta».} a la puerta del museo. {Contra más|Cuanto más|La forma culta es «cuanto más».} esperábamos, más nos enfadábamos. Al final, el director nos dejó entrar y nos explicó la exposición {en base a|según|«En base a» es una locución desaconsejada; mejor «según» o «a partir de».} su experiencia. {Detrás mío|Detrás de mí|Con adverbios como «detrás» se recomienda «de + pronombre».} iba mi compañera, que no paraba de reír. Si {habríamos|hubiéramos|En la oración condicional se usa el pluscuamperfecto de subjuntivo, no el condicional.} salido antes, lo habríamos visto todo."
  },
  {
    id: "ese4", lang: "es", title: "Carta desde la residencia",
    text: "Querida Laura: te escribo desde la residencia de estudiantes. Aquí {habemos|somos|«Habemos» no es correcto en este contexto; se dice «somos» o «estamos».} veinte chicas y todas estudiamos Magisterio. Ayer {andé|anduve|El pretérito de «andar» es irregular: «anduve».} por la ciudad y {ví|vi|«Vi» es monosílabo y no lleva tilde.} un parque precioso. Mañana tenemos el primer examen y estoy nerviosa; si {sabría|supiera|En la condicional con «si» se usa el imperfecto de subjuntivo: «si supiera».} lo que van a preguntar, estaría más tranquila. Mi compañera me {aconsejó de que|aconsejó que|Dequeísmo: «aconsejar» no rige la preposición «de».} durmiera bien. {A parte|Aparte|«Aparte» (además, excepto) se escribe junto.} de eso, todo va genial. Te echo de menos; {ojala|ojalá|«Ojalá» es aguda terminada en vocal: lleva tilde.} nos veamos pronto."
  },
];

export const ES_THEORY = [
  {
    id: "t_es_tilde", topic: "es_orto", lang: "es", icon: "✍️",
    title: { ca: "Accentuació en castellà", es: "Acentuación en castellano" },
    html: `<p><b>Agudas</b>: tilde si terminan en <b>vocal, -n o -s</b>: café, camión, después. (reloj, pared → sin tilde).</p>
<p><b>Llanas</b>: tilde si <b>NO</b> terminan en vocal, -n o -s: difícil, árbol, lápiz. (examen, joven → sin tilde).</p>
<p><b>Esdrújulas y sobresdrújulas</b>: siempre: exámenes, música, dígaselo.</p>
<p><b>Hiato con vocal cerrada tónica</b>: siempre tilde: día, país, reúne, oír.</p>
<p><b>Monosílabos</b>: sin tilde (fue, dio, vio, fe, guion, truhan), salvo la <b>diacrítica</b>: tú/tu, él/el, mí/mi, sí/si, té/te, dé/de, sé/se, más/mas.</p>
<p><b>Interrogativos y exclamativos</b>: qué, cómo, cuándo, dónde, quién, cuál, por qué (también en indirectas).</p>
<p><b>Solo y demostrativos</b>: sin tilde según la Ortografía de 2010.</p>`
  },
  {
    id: "t_es_homo", topic: "es_orto", lang: "es", icon: "👂",
    title: { ca: "Homòfons en castellà", es: "Homófonos en castellano" },
    html: `<ul>
<li><b>hecho</b> (hacer) / <b>echo</b> (echar)</li>
<li><b>haber</b> (verbo) / <b>a ver</b> (preposición + ver)</li>
<li><b>haya</b> (haber) / <b>halla</b> (hallar) / <b>allá</b> (lugar) / <b>aya</b> (niñera)</li>
<li><b>tuvo</b> (tener) / <b>tubo</b> (cilindro)</li>
<li><b>valla</b> (cerca) / <b>vaya</b> (ir) / <b>baya</b> (fruto)</li>
<li><b>sino</b> (adversativo) / <b>si no</b> (condición negativa)</li>
<li><b>porque</b> (causa) / <b>por qué</b> (pregunta) / <b>porqué</b> (sustantivo) / <b>por que</b> (prep. + relativo)</li>
<li><b>aparte</b> (además) / <b>a parte</b> (a ningún lugar)</li>
<li><b>asimismo</b> (también) / <b>a sí mismo</b> (reflexivo)</li>
</ul>`
  },
  {
    id: "t_es_gram", topic: "es_gram", lang: "es", icon: "⚖️",
    title: { ca: "Leisme, laisme, dequeisme...", es: "Leísmo, laísmo, dequeísmo..." },
    html: `<p><b>Leísmo:</b> usar «le» como CD. <i>A Juan le vi</i> (admitido solo para persona masculina singular), pero <i>A María le vi</i> ❌ → <b>la vi</b>.</p>
<p><b>Laísmo:</b> usar «la» como CI. <i>La dije la verdad</i> ❌ → <b>le dije</b>.</p>
<p><b>Dequeísmo:</b> poner «de» cuando no toca. <i>Pienso de que</i> ❌ → pienso que. <b>Truco:</b> sustituye por «eso»: «pienso eso» (sin de).</p>
<p><b>Queísmo:</b> quitar «de» cuando sí toca. <i>Me alegro que</i> ❌ → me alegro de que (me alegro de eso).</p>
<p><b>Haber impersonal:</b> siempre en singular: <i>había, hubo, habrá</i> muchas personas.</p>
<p><b>Condicionales:</b> <i>Si tuviera</i> (no «si tendría»), <i>si hubiera sabido</i> (no «si habría sabido»).</p>
<p><b>Gerundio de posterioridad:</b> incorrecto. <i>Estudió en Madrid, trasladándose después</i> ❌.</p>`
  },
  {
    id: "t_es_catal", topic: "es_lex", lang: "es", icon: "🔁",
    title: { ca: "Catalanismes en castellà", es: "Catalanismos en castellano" },
    html: `<table class="tbl"><tr><th>❌ Catalanismo</th><th>✅ Castellano</th></tr>
<tr><td>hacer tarde</td><td>llegar tarde</td></tr>
<tr><td>picar a la puerta</td><td>llamar a la puerta</td></tr>
<tr><td>tengo de ir</td><td>tengo que ir</td></tr>
<tr><td>marchar (irse)</td><td>marcharse</td></tr>
<tr><td>plegar (del trabajo)</td><td>salir, terminar la jornada</td></tr>
<tr><td>hacer un examen (el profesor)</td><td>poner un examen</td></tr>
<tr><td>me se ha caído</td><td>se me ha caído</td></tr>
<tr><td>estar por alguien</td><td>prestar atención a alguien</td></tr>
<tr><td>en (con verbos de movimiento) «voy en casa»</td><td>voy a casa</td></tr>
</table>`
  },
];
