// Comprensió lectora (secció 1 CCIRC). Textos originals.
// mcq: 3 punts si és correcta, -1,5 si és incorrecta, 0 en blanc (com a la PAP)
// open: preguntes obertes amb resposta model i autoavaluació

export const READINGS = [
  {
    id: "r1", lang: "ca", title: "Elogi de l'avorriment",
    text: `Fa uns anys, una mare em va confessar, gairebé avergonyida, que el seu fill de vuit anys s'havia avorrit tot un diumenge. Ho deia com qui reconeix una negligència greu. Vivim en una època en què l'avorriment infantil s'ha convertit en un problema que cal resoldre de seguida: amb una pantalla, amb una extraescolar més, amb un pla per a cada hora.

Tanmateix, molts psicòlegs coincideixen que avorrir-se és una experiència valuosa. Quan un infant no té res a fer, s'enfronta a un buit que l'obliga a mirar cap endins: a inventar un joc, a construir una cabana amb coixins, a observar com les formigues transporten molles. L'avorriment és, en aquest sentit, la sala d'espera de la creativitat.

Això no vol dir que haguem d'abandonar els nens a la seva sort ni que tota activitat organitzada sigui perjudicial. El problema apareix quan omplim cada minut i no deixem cap escletxa perquè sorgeixi el desig propi. Un infant que mai no s'avorreix difícilment aprendrà a gestionar l'espera, la frustració o la calma, competències que la vida adulta li exigirà sovint.

Potser, doncs, la pregunta no és com evitar que els nostres fills s'avorreixin, sinó com acompanyar-los perquè aquell temps buit es converteixi en temps seu. De vegades, la millor ajuda que podem oferir és, simplement, no fer res.`,
    mcq: [
      { q: "Quina és la tesi principal del text?", o: ["L'avorriment pot afavorir la creativitat i l'autonomia dels infants.", "Les activitats extraescolars són perjudicials.", "Els psicòlegs recomanen no deixar mai els infants sols.", "Les pantalles són la causa de l'avorriment infantil."], a: 0, e: "L'autor defensa que avorrir-se és valuós («la sala d'espera de la creativitat») i que cal deixar-hi espai." },
      { q: "Per què la mare se sentia «gairebé avergonyida»?", o: ["Perquè considerava que deixar avorrir el fill era una negligència.", "Perquè el fill havia fet una entremaliadura.", "Perquè no havia pogut portar el fill a una extraescolar.", "Perquè el fill havia estat tot el dia davant d'una pantalla."], a: 0, e: "Ho deia «com qui reconeix una negligència greu»: interpreta l'avorriment com un fracàs propi." },
      { q: "Què vol dir l'expressió «la sala d'espera de la creativitat»?", o: ["Que l'avorriment és el moment previ en què pot sorgir la creativitat.", "Que la creativitat és avorrida.", "Que cal esperar molt per ser creatiu.", "Que les sales d'espera fomenten la imaginació."], a: 0, e: "És una metàfora: l'avorriment és l'espai d'espera d'on pot néixer la creativitat." },
      { q: "Quina funció té el connector «Tanmateix» al començament del segon paràgraf?", o: ["Introduir una idea que s'oposa a la visió del primer paràgraf.", "Afegir un exemple.", "Expressar una conseqüència.", "Resumir el text."], a: 0, e: "«Tanmateix» és un connector d'oposició: contrasta la visió negativa de l'avorriment amb la dels psicòlegs." },
      { q: "Segons el text, quina competència pot desenvolupar l'avorriment?", o: ["La gestió de l'espera i la frustració.", "La competència digital.", "La memorització.", "El treball en equip."], a: 0, e: "El tercer paràgraf esmenta l'espera, la frustració i la calma." },
    ],
    open: [
      { q: "Explica amb les teves paraules per què l'autor diu que «la millor ajuda que podem oferir és, simplement, no fer res».", model: "L'autor vol dir que, si els adults no omplen tot el temps dels infants amb activitats o pantalles, els donen l'oportunitat d'inventar i decidir què fer. No intervenir permet que el temps buit es converteixi en temps propi, on desenvolupen creativitat i autonomia. És una afirmació paradoxal: no fer res és, en realitat, una manera d'ajudar." },
    ],
  },
  {
    id: "r2", lang: "ca", title: "Mòbils a l'aula: prohibir o educar?",
    text: `El debat sobre la presència dels telèfons mòbils a les escoles torna cada setembre. Diversos països europeus n'han restringit l'ús als centres educatius, i a Catalunya les escoles i els instituts han hagut d'aplicar limitacions estrictes. Els defensors de la prohibició argumenten que els dispositius distreuen, empitjoren la concentració i afavoreixen situacions d'assetjament fora del control dels adults.

Els detractors, en canvi, consideren que prohibir és una solució fàcil que no resol el problema de fons. Els joves conviuran tota la vida amb les pantalles, diuen, i l'escola hauria de ser precisament el lloc on aprenguin a fer-ne un ús crític i responsable. Segons aquesta visió, apartar el mòbil de l'aula equival a renunciar a educar.

Entre totes dues posicions hi ha matisos. Moltes escoles opten per prohibir el mòbil personal però treballen la competència digital amb dispositius del centre, en activitats planificades i amb objectius clars. D'aquesta manera, separen l'oci de l'aprenentatge.

El que sembla evident és que cap norma no substituirà l'exemple dels adults. Difícilment convencerem un adolescent que deixi el mòbil si, a casa, el sopar familiar transcorre amb cada membre mirant la seva pantalla.`,
    mcq: [
      { q: "Quin tipus de text és, principalment?", o: ["Argumentatiu", "Narratiu", "Instructiu", "Descriptiu"], a: 0, e: "Presenta un debat amb arguments a favor i en contra i acaba amb una conclusió de l'autor." },
      { q: "Quin argument fan servir els defensors de la prohibició?", o: ["Els mòbils distreuen i poden afavorir l'assetjament.", "Els joves han d'aprendre a fer un ús crític de les pantalles.", "Les escoles no tenen prou dispositius.", "Els adults han de donar exemple."], a: 0, e: "Primer paràgraf: distracció, concentració i assetjament." },
      { q: "Què proposen moltes escoles com a posició intermèdia?", o: ["Prohibir el mòbil personal i treballar la competència digital amb dispositius del centre.", "Permetre el mòbil només a l'hora del pati.", "Prohibir totes les pantalles a l'escola.", "Deixar que cada alumne decideixi."], a: 0, e: "Tercer paràgraf: separen l'oci de l'aprenentatge." },
      { q: "En la frase «apartar el mòbil de l'aula equival a renunciar a educar», el verb «equival» es podria substituir per:", o: ["és el mateix que", "és el contrari de", "és més important que", "és conseqüència de"], a: 0, e: "Equivaldre = tenir el mateix valor o significat." },
      { q: "Quina és la conclusió de l'autor?", o: ["L'exemple dels adults és més determinant que qualsevol norma.", "Cal prohibir els mòbils a casa.", "Els detractors tenen tota la raó.", "La prohibició és l'única solució."], a: 0, e: "Últim paràgraf: «cap norma no substituirà l'exemple dels adults»." },
    ],
    open: [
      { q: "Resumeix en dues o tres frases les dues posicions principals del debat.", model: "Els partidaris de prohibir el mòbil a l'escola creuen que distreu, perjudica la concentració i afavoreix l'assetjament. Els contraris pensen que prohibir no soluciona res i que l'escola ha d'ensenyar a fer-ne un ús crític i responsable, perquè els joves conviuran sempre amb les pantalles." },
    ],
  },
  {
    id: "r3", lang: "es", title: "Leer en voz alta",
    text: `Durante siglos, leer fue un acto colectivo. En las plazas, en los talleres o junto al fuego, alguien leía y los demás escuchaban. La lectura silenciosa, que hoy nos parece la forma natural de leer, es una costumbre relativamente reciente. Quizá por eso hemos olvidado el valor de la lectura en voz alta, que muchos asocian únicamente con la primera infancia.

Sin embargo, las investigaciones en educación muestran que escuchar leer a un adulto sigue siendo beneficioso mucho después de que el niño aprenda a descifrar las letras. Al oír un texto leído con buena entonación, los alumnos acceden a vocabulario y estructuras más complejas que las que podrían leer por sí mismos. Además, la voz del lector modela el ritmo, las pausas y la emoción, es decir, enseña a comprender.

Hay también un efecto menos medible pero igual de importante: el vínculo. Un maestro que lee en voz alta a su grupo crea un espacio compartido, un paréntesis en el que todos atienden a la misma historia. Para muchos niños que no tienen libros en casa, ese momento puede ser la única puerta de entrada a la literatura.

Por todo ello, conviene reivindicar la lectura en voz alta en todas las etapas educativas, no como un premio ni como un relleno, sino como una práctica didáctica de pleno derecho.`,
    mcq: [
      { q: "¿Cuál es la idea principal del texto?", o: ["La lectura en voz alta es una práctica didáctica valiosa en todas las etapas.", "La lectura silenciosa es perjudicial.", "Solo los niños pequeños necesitan que les lean.", "Los maestros leen demasiado en clase."], a: 0, e: "La conclusión lo dice explícitamente: «conviene reivindicar la lectura en voz alta en todas las etapas»." },
      { q: "Según el texto, la lectura silenciosa...", o: ["es una costumbre relativamente reciente.", "es la forma más antigua de leer.", "se practicaba en las plazas.", "es más útil que la lectura en voz alta."], a: 0, e: "Primer párrafo." },
      { q: "¿Qué función tiene «es decir» en el segundo párrafo?", o: ["Reformular o aclarar lo anterior.", "Introducir una oposición.", "Expresar una causa.", "Añadir un ejemplo contrario."], a: 0, e: "«Es decir» es un conector de reformulación." },
      { q: "¿Por qué el autor dice que la lectura en voz alta puede ser «la única puerta de entrada a la literatura»?", o: ["Porque algunos niños no tienen libros en casa.", "Porque los libros son caros.", "Porque la literatura solo se entiende escuchada.", "Porque los niños no saben leer."], a: 0, e: "Tercer párrafo: «para muchos niños que no tienen libros en casa...»." },
      { q: "¿Qué expresión resume mejor la postura del autor sobre la lectura en voz alta?", o: ["Una práctica didáctica de pleno derecho", "Un premio para los alumnos", "Un relleno entre actividades", "Una costumbre del pasado"], a: 0, e: "El autor rechaza explícitamente verla como premio o relleno." },
    ],
    open: [
      { q: "Explica dos beneficios de la lectura en voz alta que menciona el texto.", model: "Primero, permite que los alumnos accedan a un vocabulario y a estructuras más complejas de las que podrían leer solos, y la voz del lector les enseña el ritmo, las pausas y la emoción, es decir, a comprender. Segundo, crea un vínculo entre el maestro y el grupo, un espacio compartido que, para niños sin libros en casa, puede ser su único contacto con la literatura." },
    ],
  },
  {
    id: "r4", lang: "es", title: "El mito del nativo digital",
    text: `En 2001, el ensayista Marc Prensky popularizó la expresión «nativos digitales» para referirse a los jóvenes que habían crecido rodeados de ordenadores, videojuegos e internet. La idea era seductora: estos chicos y chicas pensarían y aprenderían de otra manera, y la escuela, anclada en el pasado, debería adaptarse a ellos.

Dos décadas después, muchos investigadores consideran que el concepto es, en gran parte, un mito. Que un adolescente maneje con soltura una red social no significa que sepa buscar información fiable, contrastar fuentes o proteger su privacidad. Usar la tecnología con frecuencia no equivale a dominarla, del mismo modo que viajar en coche cada día no nos convierte en mecánicos.

Además, la etiqueta oculta desigualdades. No todos los jóvenes tienen el mismo acceso a dispositivos ni el mismo acompañamiento familiar. Hablar de una generación homogénea de expertos digitales puede llevar a la escuela a renunciar a enseñar aquello que se da por supuesto.

Lejos de quedar obsoleta, la figura del docente resulta más necesaria que nunca. Enseñar a leer críticamente en pantalla, a distinguir una noticia de un bulo o a gestionar el tiempo de conexión son tareas educativas de primer orden.`,
    mcq: [
      { q: "¿Qué crítica principal se hace al concepto de «nativo digital»?", o: ["Usar mucho la tecnología no implica dominarla de forma crítica.", "Los jóvenes no usan la tecnología.", "Prensky era un mal escritor.", "La escuela ya se ha adaptado completamente."], a: 0, e: "Segundo párrafo: «Usar la tecnología con frecuencia no equivale a dominarla»." },
      { q: "¿Qué recurso utiliza el autor con el ejemplo del coche y los mecánicos?", o: ["Una analogía", "Una cita de autoridad", "Un dato estadístico", "Una pregunta retórica"], a: 0, e: "Compara dos situaciones parecidas para reforzar el argumento: es una analogía." },
      { q: "¿Por qué la etiqueta «oculta desigualdades»?", o: ["Porque no todos los jóvenes tienen el mismo acceso ni acompañamiento.", "Porque los adultos usan más la tecnología.", "Porque solo los ricos usan redes sociales.", "Porque las escuelas no tienen ordenadores."], a: 0, e: "Tercer párrafo." },
      { q: "La palabra «bulo» significa:", o: ["noticia falsa", "noticia urgente", "rumor verdadero", "artículo de opinión"], a: 0, e: "Un bulo es una noticia falsa propalada con algún fin." },
      { q: "¿Cuál es la conclusión del texto?", o: ["El docente es más necesario que nunca para enseñar competencia digital crítica.", "La escuela debe adaptarse a los nativos digitales.", "Hay que prohibir las redes sociales.", "Los jóvenes saben más que los profesores."], a: 0, e: "Último párrafo." },
    ],
    open: [
      { q: "¿Estás de acuerdo con la tesis del autor? Justifica tu respuesta con un argumento propio.", model: "Respuesta abierta. Una buena respuesta: (1) identifica la tesis (el «nativo digital» es un mito y la escuela debe enseñar competencia digital crítica); (2) toma posición clara; (3) aporta un argumento propio con un ejemplo (p. ej., compañeros que comparten bulos sin comprobarlos); (4) está bien redactada y sin errores." },
    ],
  },
];
