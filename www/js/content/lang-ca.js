// Contingut de llengua catalana (secció 3 CCIRC: domini del sistema lingüístic)
// Format MCQ: { id, topic, lang, q, o:[opcions], a:índex correcte, e:explicació }

export const CA_MCQ = [
  // ---------- Ortografia i accentuació ----------
  { id: "ca1", topic: "ca_orto", q: "Quina forma és correcta?", o: ["La humitat", "L'humitat", "Lhumitat"], a: 0, e: "No s'apostrofa l'article femení davant de mots que comencen per i/u àtones (o hi-, hu- àtones): la humitat, la universitat, la idea." },
  { id: "ca2", topic: "ca_orto", q: "Quina paraula està ben escrita?", o: ["cafè", "café", "cafe"], a: 0, e: "És aguda acabada en vocal: porta accent. La «e» és oberta, per tant accent greu: cafè." },
  { id: "ca3", topic: "ca_orto", q: "Quina d'aquestes paraules NO porta accent?", o: ["examen", "també", "camió", "conté"], a: 0, e: "«Examen» és plana acabada en -en: les planes s'accentuen quan NO acaben en vocal, vocal+s, -en, -in. Per tant, no porta accent." },
  { id: "ca4", topic: "ca_orto", q: "Completa: «La Maria ___ va a casa.»", o: ["se'n", "s'en", "sen"], a: 0, e: "L'apòstrof va sempre després de la vocal, el més a la dreta possible: se'n." },
  { id: "ca5", topic: "ca_orto", q: "Quina forma és correcta?", o: ["amoïnat", "amoinat", "amoínat"], a: 0, e: "La dièresi trenca el diftong «oi»: a-mo-ï-nat. Sense dièresi es llegiria «moi» en una sola síl·laba." },
  { id: "ca6", topic: "ca_orto", q: "Quina d'aquestes formes NO ha de portar dièresi?", o: ["traduir", "traduït", "traduïa", "veïna"], a: 0, e: "No es posa dièresi en els infinitius, gerundis, futurs i condicionals dels verbs en -uir/-air: traduir, traduint, traduiré." },
  { id: "ca7", topic: "ca_orto", q: "Com s'escriu el nombre 48?", o: ["quaranta-vuit", "quaranta vuit", "quarantavuit"], a: 0, e: "Entre desenes i unitats s'escriu guionet: quaranta-vuit." },
  { id: "ca8", topic: "ca_orto", q: "Com s'escriu el nombre 22?", o: ["vint-i-dos", "vintidós", "vint i dos"], a: 0, e: "Les desenes i unitats unides per «i» porten dos guionets: vint-i-dos, trenta-u... (cada element manté la seva accentuació: «dos» és monosíl·lab i no porta accent)." },
  { id: "ca9", topic: "ca_orto", q: "Segons la normativa vigent (IEC, 2017), quina frase és correcta?", o: ["Ell em dona un llibre.", "Ell em dóna un llibre.", "Ell em donà un llibre ara."], a: 0, e: "Des del 2017, «dona» (verb donar) ja no porta accent diacrític. En queden 15: bé, déu, és, mà, més, món, pèl, què, sé, sí, sòl, són, té, ús, vós." },
  { id: "ca10", topic: "ca_orto", q: "Completa: «Encara no sé ___ no ha vingut.»", o: ["per què", "perquè", "per que"], a: 0, e: "És una interrogativa indirecta (per quin motiu): «per què», separat i amb accent. «Perquè» introdueix una causa o una finalitat." },
  { id: "ca11", topic: "ca_orto", q: "Quina paraula està ben escrita?", o: ["pel·lícula", "pe-lícula", "película"], a: 0, e: "La ela geminada s'escriu amb punt volat: l·l." },
  { id: "ca12", topic: "ca_orto", q: "Quina forma és correcta?", o: ["avorrit", "aburrit", "abvorrit"], a: 0, e: "En català és «avorrit», amb v. «Aburrido» és la forma castellana." },
  { id: "ca13", topic: "ca_orto", q: "Quina forma és correcta?", o: ["església", "esglèsia", "esglesia"], a: 0, e: "En català, «-ia» final es compta com a dues síl·labes (es-glé-si-a): és esdrúixola i s'accentua sempre. La «e» és tancada: accent agut." },
  { id: "ca14", topic: "ca_orto", q: "Quina forma és correcta?", o: ["algun", "algún", "algúns"], a: 0, e: "«Algun» és aguda acabada en -un: les agudes només s'accentuen si acaben en vocal, vocal+s, -en, -in." },
  { id: "ca15", topic: "ca_orto", q: "Quina forma és correcta?", o: ["hauran", "hauràn", "hàuran"], a: 0, e: "«Hauran» és aguda acabada en -an: les agudes només s'accentuen si acaben en vocal, vocal+s, -en, -in." },
  { id: "ca16", topic: "ca_orto", q: "Quina forma és correcta?", o: ["viatge", "viatje", "biatge"], a: 0, e: "Davant de e, i escrivim -tge-, -tja- davant de a, o, u: viatge, viatjar." },
  { id: "ca17", topic: "ca_orto", q: "Quina forma és correcta?", o: ["pressió", "presió", "preció"], a: 0, e: "S sorda entre vocals s'escriu amb ss: pressió." },
  { id: "ca18", topic: "ca_orto", q: "Quina frase té l'apostrofació correcta?", o: ["Me n'he oblidat.", "M'en he oblidat.", "Me'n he oblidat."], a: 0, e: "Davant de verb començat per vocal, «me'n» passa a «me n'»: me n'he oblidat." },
  { id: "ca19", topic: "ca_orto", q: "Quina contracció és correcta?", o: ["Vaig al mercat.", "Vaig a el mercat.", "Vaig a l' mercat."], a: 0, e: "La preposició «a» + l'article «el» es contrauen: al. També de + el = del, per + el = pel." },

  // ---------- Morfologia i sintaxi ----------
  { id: "ca20", topic: "ca_morf", q: "Substitueix: «Dono el llibre al Joan» → «___ dono»", o: ["L'hi", "Li'l", "Li"], a: 0, e: "CD masculí (el) + CI (li) es combinen com «l'hi»: l'hi dono." },
  { id: "ca21", topic: "ca_morf", q: "Substitueix: «Vaig a la platja» → «___ vaig»", o: ["Hi", "En", "La"], a: 0, e: "Un complement de lloc introduït per «a» se substitueix per «hi»." },
  { id: "ca22", topic: "ca_morf", q: "Substitueix: «Vinc de Girona» → «___ vinc»", o: ["En", "Hi", "La"], a: 0, e: "Un complement de lloc introduït per «de» (procedència) se substitueix per «en»." },
  { id: "ca23", topic: "ca_morf", q: "Substitueix: «Hem de comprar pomes» → «___»", o: ["N'hem de comprar", "Les hem de comprar", "Hi hem de comprar"], a: 0, e: "Un CD indeterminat (nom sense article) se substitueix per «en»: n'hem de comprar." },
  { id: "ca24", topic: "ca_morf", q: "Completa: «A la Marta ___ agrada la música.»", o: ["li", "la", "l'"], a: 0, e: "Amb «agradar», la persona és complement indirecte: li agrada." },
  { id: "ca25", topic: "ca_morf", q: "Quin és el participi del verb «imprimir»?", o: ["imprès", "imprimit", "impreso"], a: 0, e: "El participi d'imprimir és «imprès» (impresa, impresos, impreses)." },
  { id: "ca26", topic: "ca_morf", q: "Completa: «Si ___, vindria a la festa.»", o: ["pogués", "pugués", "podés"], a: 0, e: "L'imperfet de subjuntiu de «poder» es fa amb o: pogués, poguessis..." },
  { id: "ca27", topic: "ca_morf", q: "Quina frase expressa correctament l'obligació?", o: ["He d'estudiar més.", "Tinc que estudiar més.", "Tinc d'estudiar més."], a: 0, e: "L'obligació s'expressa amb «haver de» (o «caldre»). «Tenir que» és un calc del castellà." },
  { id: "ca28", topic: "ca_morf", q: "En registre formal, quina frase és correcta?", o: ["Hi ha moltes persones.", "Hi han moltes persones.", "Hi hem moltes persones."], a: 0, e: "«Haver-hi» és impersonal: en registre formal es manté en singular encara que el complement sigui plural." },
  { id: "ca29", topic: "ca_morf", q: "Completa: «___ deu minuts per a les nou.»", o: ["Faltaven", "Faltava", "Faltà"], a: 0, e: "El subjecte és «deu minuts» (plural): el verb concorda en plural." },
  { id: "ca30", topic: "ca_morf", q: "Quina forma és correcta?", o: ["la pobra dona", "la pobre dona", "la pobres dona"], a: 0, e: "«Pobre» és un adjectiu variable: pobre, pobra, pobres." },
  { id: "ca31", topic: "ca_morf", q: "Completa: «Confio ___ tu.»", o: ["en", "amb", "de"], a: 0, e: "«Confiar» regeix la preposició «en»." },
  { id: "ca32", topic: "ca_morf", q: "Quina frase és correcta?", o: ["Vaig visitar el metge.", "Vaig visitar al metge.", "Vaig visitar-li el metge."], a: 0, e: "En català, el complement directe de persona no porta preposició «a» (excepte casos molt concrets)." },
  { id: "ca33", topic: "ca_morf", q: "Quina frase és correcta?", o: ["Em vaig adonar que plovia.", "Em vaig adonar de que plovia.", "Em vaig donar compte que plovia."], a: 0, e: "Davant de la conjunció «que», les preposicions àtones (a, de, en, amb) cauen: adonar-se que." },
  { id: "ca34", topic: "ca_morf", q: "Completa: «La noia ___ et vaig parlar és mestra.»", o: ["de la qual", "que", "la que"], a: 0, e: "Parlar DE la noia → relatiu amb preposició: de la qual (o de qui)." },
  { id: "ca35", topic: "ca_morf", q: "Present de subjuntiu del verb «anar»: «Vull que (jo) ___»", o: ["vagi", "vaigui", "vagui"], a: 0, e: "Present de subjuntiu d'anar: vagi, vagis, vagi, anem, aneu, vagin." },
  { id: "ca36", topic: "ca_morf", q: "Completa: «Als alumnes, la mestra ___ va explicar la lliçó.»", o: ["els", "lis", "les"], a: 0, e: "El pronom de complement indirecte plural és «els». «Lis» no és normatiu." },
  { id: "ca37", topic: "ca_morf", q: "Quin és el participi del verb «obrir»?", o: ["obert", "obrit", "abert"], a: 0, e: "El participi d'obrir és irregular: obert, oberta." },
  { id: "ca38", topic: "ca_morf", q: "Quina és la forma correcta?", o: ["sabéssim", "sapiguéssim", "sabíssim"], a: 0, e: "L'imperfet de subjuntiu de saber és sabés, sabessis, sabés, sabéssim..." },

  // ---------- Lèxic ----------
  { id: "ca39", topic: "ca_lex", q: "Quina és la forma catalana correcta?", o: ["penedir-se", "arrepentir-se", "repentir-se"], a: 0, e: "«Arrepentir-se» és un castellanisme. En català: penedir-se." },
  { id: "ca40", topic: "ca_lex", q: "Per parlar de la circulació de vehicles, quina paraula és adequada?", o: ["trànsit", "tràfic", "tràfec"], a: 0, e: "«Trànsit» és la circulació de vehicles; «tràfic» és comerç, sovint il·legal (tràfic de drogues)." },
  { id: "ca41", topic: "ca_lex", q: "Quina paraula NO és un barbarisme?", o: ["llavors", "bueno", "vale", "pues"], a: 0, e: "«Llavors» és correcte. Bueno → bé/bo; vale → d'acord; pues → doncs." },
  { id: "ca42", topic: "ca_lex", q: "Quina expressió és INCORRECTA?", o: ["en quant a", "pel que fa a", "quant a"], a: 0, e: "«En quant a» no és normativa; cal dir «quant a» o «pel que fa a»." },
  { id: "ca43", topic: "ca_lex", q: "Quina és la forma correcta?", o: ["gaudir", "disfrutar", "difrutar"], a: 0, e: "«Disfrutar» és un castellanisme. En català: gaudir, passar-ho bé." },
  { id: "ca44", topic: "ca_lex", q: "Quina és la forma correcta?", o: ["per descomptat", "per suposat", "per supost"], a: 0, e: "«Per suposat» és un calc del castellà; la forma correcta és «per descomptat»." },
  { id: "ca45", topic: "ca_lex", q: "Quina és la forma correcta?", o: ["estalviar", "ahorrar", "aforrar"], a: 0, e: "«Ahorrar» és un castellanisme: en català es diu estalviar." },
  { id: "ca46", topic: "ca_lex", q: "Quina és la forma correcta?", o: ["des de", "desde", "dés de"], a: 0, e: "«Desde» és castellà. En català s'escriu en dues paraules: des de." },
  { id: "ca47", topic: "ca_lex", q: "Quina expressió és correcta per introduir una causa?", o: ["a causa de la pluja", "degut a la pluja", "deguda la pluja"], a: 0, e: "«Degut a» per expressar causa és incorrecte; cal dir «a causa de», «per culpa de», «per»." },
  { id: "ca48", topic: "ca_lex", q: "Quina és la forma correcta?", o: ["escombraries", "basura", "bassura"], a: 0, e: "«Basura» és castellà: en català, escombraries." },
  { id: "ca49", topic: "ca_lex", q: "Quina frase és correcta?", o: ["Allò que importa és aprendre.", "Lo que importa és aprendre.", "Lo important és aprendre."], a: 0, e: "L'article neutre «lo» no és normatiu en català: el que, allò que, l'important." },
  { id: "ca50", topic: "ca_lex", q: "Quina és la forma correcta?", o: ["aterrit", "aterroritzat", "aterrorat"], a: 0, e: "«Aterroritzat» és un castellanisme: aterrit, espantat, atemorit." },

  // ---------- Cohesió i connectors (català) ----------
  { id: "ca51", topic: "cohesio", q: "Quin connector expressa CONSEQÜÈNCIA?", o: ["per tant", "tanmateix", "a més", "per exemple"], a: 0, e: "Per tant, així doncs, en conseqüència → conseqüència. Tanmateix → oposició; a més → addició." },
  { id: "ca52", topic: "cohesio", q: "Quin connector expressa OPOSICIÓ?", o: ["tanmateix", "així mateix", "és a dir", "en primer lloc"], a: 0, e: "Tanmateix, no obstant això, en canvi, però → oposició o contrast." },
  { id: "ca53", topic: "cohesio", q: "Quin connector serveix per REFORMULAR o aclarir?", o: ["és a dir", "per contra", "finalment", "atès que"], a: 0, e: "És a dir, o sigui, dit d'una altra manera → reformulació." },
  { id: "ca54", topic: "cohesio", q: "«No va estudiar; ___, va aprovar.» Quin connector hi encaixa?", o: ["tot i això", "per tant", "a més", "per exemple"], a: 0, e: "Hi ha un contrast entre no estudiar i aprovar: cal un connector concessiu/oposició: tot i això." },
  { id: "ca55", topic: "cohesio", q: "Quina propietat textual té a veure amb el registre i la intenció comunicativa?", o: ["adequació", "cohesió", "coherència"], a: 0, e: "L'adequació: el text s'ajusta a la situació, al receptor, al registre i al gènere. Coherència = sentit global i organització de les idees; cohesió = mecanismes lingüístics que connecten (connectors, referents, puntuació)." },
];

// Textos per detectar errors. Sintaxi: {error|correcció|justificació}
export const CA_ERRORS = [
  {
    id: "cae1", lang: "ca", title: "L'arribada de la Laia",
    text: "Ahir al matí {passava|passaven|El verb ha de concordar amb el subjecte plural «deu minuts».} deu minuts de les nou quan la Laia va arribar a l'escola. Estava molt {amoinada|amoïnada|Cal dièresi per trencar el diftong «oi»: a-mo-ï-na-da.} perquè {tenia que|havia de|«Tenir que» és un calc del castellà; l'obligació s'expressa amb «haver de».} presentar el treball de ciències i encara no l'havia {imprimit|imprès|El participi d'«imprimir» és «imprès».}. Quan va entrar a classe, la mestra {l'hi va dir|li va dir|Només hi ha un complement indirecte (a ella): «li». «L'hi» combina CD + CI.} que no passava res. La Laia es va adonar {de que|que|Davant de la conjunció «que», la preposició «de» del complement de règim cau.} la mestra era molt comprensiva, i {s'en|se'n|L'apòstrof es col·loca després de la vocal: «se'n».} va alegrar molt. A la tarda va decidir que {disfrutaria|gaudiria|«Disfrutar» és un castellanisme; la forma catalana és «gaudir».} del parc amb les seves amigues."
  },
  {
    id: "cae2", lang: "ca", title: "La visita a l'avi",
    text: "{L'humitat|La humitat|No s'apostrofa l'article femení davant de mot que comença per «hu» àtona.} d'aquella tardor era insuportable. Al barri hi {havien|havia|«Haver-hi» és impersonal i es manté en singular en el registre formal.} molts cotxes i el {tràfic|trànsit|Per a la circulació de vehicles, la forma adequada és «trànsit»; «tràfic» vol dir comerç.} era caòtic. En Marc va decidir anar a {visitar al|visitar el|«Visitar» és transitiu: el complement directe no porta la preposició «a».} seu avi, que vivia a l'altra punta de la ciutat. L'avi, que tenia {noranta dos|noranta-dos|Entre desenes i unitats s'escriu guionet.} anys, li va dir: «Si {pugués|pogués|L'imperfet de subjuntiu de «poder» es forma amb «o»: pogués.}, tornaria a ser mestre.» En Marc es va {arrepentir|penedir|«Arrepentir-se» és un castellanisme; en català es diu «penedir-se».} de no haver-lo visitat més sovint i li va prometre que l'aniria a veure cada setmana {desde ara|des d'ara|«Desde» és un castellanisme; la forma catalana és «des de» (apostrofada davant de vocal).}."
  },
  {
    id: "cae3", lang: "ca", title: "Circular a les famílies",
    text: "Benvolgudes famílies: us escrivim per informar-vos que la sortida al museu es farà el proper dimecres. Els alumnes {hauràn|hauran|«Hauran» és aguda acabada en «-an»: no porta accent (les agudes només s'accentuen en vocal, vocal+s, -en, -in).} de portar l'esmorzar i una gorra. {Degut a|A causa de|«Degut a» per introduir una causa és incorrecte; cal dir «a causa de» o «per culpa de».} les obres, l'autocar sortirà de la plaça de l'{Esglèsia|Església|«Església» porta accent agut: la «e» és tancada.}. {En quant a|Pel que fa a|«En quant a» és incorrecte; cal dir «pel que fa a» o «quant a».} el dinar, els alumnes del menjador tindran un pícnic que {lis|els|El pronom feble de complement indirecte plural és «els»; «lis» no és normatiu.} prepararà la cuina. Si teniu {algún|algun|«Algun» és aguda acabada en «-un»: no s'accentua.} dubte, podeu parlar amb la tutora. Us agrairem que ens retorneu l'autorització signada {lo abans possible|com més aviat millor|L'article neutre «lo» no és normatiu; cal dir «com més aviat millor» o «al més aviat possible».}. Ben cordialment, l'equip de mestres."
  },
  {
    id: "cae4", lang: "ca", title: "Aprendre a escriure",
    text: "Quan vaig començar a estudiar per ser mestra, em vaig adonar que {tenia que|havia de|«Tenir que» és un calc del castellà: l'obligació s'expressa amb «haver de».} millorar la meva expressió escrita. La professora volia que {sapiguéssim|sabéssim|L'imperfet de subjuntiu de «saber» és «sabés, sabéssim...».} que escriure bé és una eina clau. Al principi, cada {exàmen|examen|«Examen» és una paraula plana acabada en «-en»: no porta accent.} era un patiment i {m'aburria|m'avorria|«Aburrir» és un castellanisme; en català es diu «avorrir».} amb els dictats. Però a poc a poc vaig anar millorant, i ara {em agrada|m'agrada|El pronom «em» s'apostrofa davant de verb que comença per vocal.} molt llegir. L'any passat vaig llegir {vintitres|vint-i-tres|Els numerals de desenes i unitats unides per «i» s'escriuen amb guionets: vint-i-tres.} novel·les i vaig descobrir que la lectura és {lo que|el que|L'article neutre «lo» no és normatiu en català: cal dir «el que» o «allò que».} més m'ajuda. Ara, quan corregeixo textos, {em fixo amb|em fixo en|El verb «fixar-se» regeix la preposició «en».} tots els detalls."
  },
];

export const CA_THEORY = [
  {
    id: "t_ca_accent", topic: "ca_orto", lang: "ca", icon: "✍️",
    title: { ca: "Accentuació en català", es: "Acentuación en catalán" },
    html: `<p><b>Agudes</b> (síl·laba tònica l'última): s'accentuen si acaben en <b>vocal, vocal+s, -en, -in</b>: cafè, camió, també, entén... Ex: <i>algun, hauran</i> → sense accent.</p>
<p><b>Planes</b> (penúltima tònica): s'accentuen si <b>NO</b> acaben en aquestes terminacions: <i>fàcil, àlbum, mòbil</i>. Ex: <i>examen, havia, mestre</i> → sense accent.</p>
<p><b>Esdrúixoles</b>: s'accentuen sempre: <i>música, pàgina, església</i>.</p>
<p><b>Accent obert o tancat:</b> à sempre greu; í, ú sempre agut; è/é i ò/ó segons el so (obert = greu, tancat = agut): <i>cafè, també, cançó, mòbil</i>.</p>
<p><b>Diacrítics (IEC 2017)</b>, només 15: bé, déu, és, mà, més, món, pèl, què, sé, sí, sòl, són, té, ús, vós (i els seus compostos). <i>Dona, vens, os, net...</i> ja no en porten.</p>
<p><b>Dièresi:</b> per trencar un diftong (<i>raïm, veïna, amoïnat</i>) o per pronunciar la u de gü/qü (<i>pingüí, aigüera</i>). No en porten infinitius, gerundis, futurs i condicionals: <i>traduir, traduint</i>.</p>`
  },
  {
    id: "t_ca_apos", topic: "ca_orto", lang: "ca", icon: "🔗",
    title: { ca: "Apostrofació i contraccions", es: "Apostrofación y contracciones" },
    html: `<p><b>El / la</b> s'apostrofen davant de vocal o h: <i>l'home, l'àvia</i>.</p>
<p><b>Excepció:</b> <i>la</i> NO s'apostrofa davant de i/u àtones (o hi/hu): <i>la humitat, la universitat, la idea</i>. Tampoc davant de: <i>la una, la ira, la essa</i>.</p>
<p><b>De</b> s'apostrofa davant de vocal o h: <i>d'aigua, d'home</i>.</p>
<p><b>Contraccions:</b> a+el = al, de+el = del, per+el = pel, a+els = als, de+els = dels, per+els = pels. Davant de vocal no hi ha contracció: <i>a l'home, de l'alumne</i>.</p>
<p><b>Pronoms febles:</b> l'apòstrof va el més a la dreta possible: <i>se'n, me'n, te n'has anat, l'hi</i>. <i>Li</i> no s'apostrofa mai.</p>`
  },
  {
    id: "t_ca_pron", topic: "ca_morf", lang: "ca", icon: "🧩",
    title: { ca: "Pronoms febles", es: "Pronombres débiles" },
    html: `<ul>
<li><b>CD determinat:</b> el, la, els, les → <i>Compro el pa → El compro.</i></li>
<li><b>CD indeterminat / partitiu:</b> en → <i>Compro pa → En compro.</i></li>
<li><b>CD neutre:</b> ho → <i>Sé això → Ho sé.</i></li>
<li><b>CI:</b> li (singular), els (plural) → <i>Escric a la Marta → Li escric. Escric als pares → Els escric.</i></li>
<li><b>Lloc amb «a/en»:</b> hi → <i>Vaig a Vic → Hi vaig.</i></li>
<li><b>Lloc amb «de» / complement amb «de»:</b> en → <i>Vinc de Vic → En vinc. Parlo de política → En parlo.</i></li>
<li><b>Atribut:</b> ho (o en/hi segons el cas) → <i>És simpàtic → Ho és.</i></li>
<li><b>Combinacions freqüents:</b> el + li = <b>l'hi</b>; la + li = <b>la hi</b>; els + li = <b>els hi</b>; ho + li = <b>li ho</b>.</li>
</ul>`
  },
  {
    id: "t_ca_barb", topic: "ca_lex", lang: "ca", icon: "🚫",
    title: { ca: "Barbarismes freqüents", es: "Barbarismos frecuentes (catalán)" },
    html: `<table class="tbl"><tr><th>❌ Incorrecte</th><th>✅ Correcte</th></tr>
<tr><td>tenir que</td><td>haver de, caldre</td></tr>
<tr><td>arrepentir-se</td><td>penedir-se</td></tr>
<tr><td>disfrutar</td><td>gaudir</td></tr>
<tr><td>desde / hasta</td><td>des de / fins a</td></tr>
<tr><td>en quant a</td><td>quant a, pel que fa a</td></tr>
<tr><td>degut a (causa)</td><td>a causa de</td></tr>
<tr><td>per suposat</td><td>per descomptat</td></tr>
<tr><td>lo que / lo bo</td><td>el que, allò que / el que és bo</td></tr>
<tr><td>donar-se compte</td><td>adonar-se</td></tr>
<tr><td>tràfic (cotxes)</td><td>trànsit</td></tr>
<tr><td>ahorrar, basura, aburrir</td><td>estalviar, escombraries, avorrir</td></tr>
<tr><td>bueno, vale, pues</td><td>bé/bo, d'acord, doncs</td></tr>
<tr><td>a nivell de</td><td>pel que fa a, en l'àmbit de</td></tr>
</table>`
  },
  {
    id: "t_ca_verbs", topic: "ca_morf", lang: "ca", icon: "🔤",
    title: { ca: "Verbs irregulars clau", es: "Verbos irregulares clave (catalán)" },
    html: `<p><b>Participis irregulars:</b> imprimir → <i>imprès</i>; obrir → <i>obert</i>; cobrir → <i>cobert</i>; morir → <i>mort</i>; prendre → <i>pres</i>; treure → <i>tret</i>; viure → <i>viscut</i>; néixer → <i>nascut</i>; escriure → <i>escrit</i>.</p>
<p><b>Subjuntiu:</b> poder → <i>pugui</i> (present) però <i>pogués</i> (imperfet); saber → <i>sàpiga</i> però <i>sabés</i>; anar → <i>vagi</i>; fer → <i>faci, fes</i>; ser → <i>sigui, fos</i>.</p>
<p><b>Concordança:</b> el verb concorda amb el subjecte: <i>Faltaven deu minuts. Em fan mal els peus.</i> «Haver-hi» es manté en singular en registre formal: <i>Hi ha molts nens.</i></p>
<p><b>Règim verbal:</b> les preposicions àtones cauen davant de «que»: <i>m'adono que, estic segur que</i>. Confiar <i>en</i>, pensar <i>en</i>, fixar-se <i>en</i>, casar-se <i>amb</i>.</p>`
  },
];
