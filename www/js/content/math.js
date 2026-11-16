// Competència logicomatemàtica (CLOM): generadors de problemes infinits + problemes de lògica
// Cada generador retorna: { topic, type:'num'|'mcq', q:{ca,es}, answer, tol, unit, steps:{ca:[],es:[]}, o?, a? }

const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
const pick = (arr) => arr[R(0, arr.length - 1)];
const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
export const fmt = (n, d = 2) => {
  const r = Math.round(n * 10 ** d) / 10 ** d;
  let [i, f] = String(Math.abs(r)).split(".");
  if (i.length > 4) i = i.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (r < 0 ? "−" : "") + i + (f ? "," + f : "");
};
const fr = (n, d) => {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1; n /= g; d /= g;
  return d === 1 ? String(n) : `${n}/${d}`;
};
const both = (ca, es) => ({ ca, es });
const shuffleMcq = (correct, distractors) => {
  const set = [correct];
  for (const x of distractors) if (!set.includes(x) && set.length < 4) set.push(x);
  let guard = 0;
  while (set.length < 4 && guard++ < 50) {
    const x = fr(R(1, 9), R(2, 12));
    if (!set.includes(x)) set.push(x);
  }
  return { o: set, a: 0 };
};

const GEN = {
  // ---------------- NOMBRES ----------------
  num_ops() {
    const a = R(2, 9), b = R(2, 6), c = R(5, 10), d = R(1, c - 2), f = R(1, 20);
    const p = c - d, sq = p * p, prod = b * sq, ans = a + prod - f;
    const expr = `${a} + ${b} · (${c} − ${d})² − ${f}`;
    return {
      topic: "num", type: "num", answer: ans, tol: 0,
      q: both(`Calcula respectant la jerarquia de les operacions: <b class="nowrap">${expr}</b>`, `Calcula respetando la jerarquía de las operaciones: <b class="nowrap">${expr}</b>`),
      steps: both(
        [`1r parèntesis: ${c} − ${d} = ${p}`, `2n potència: ${p}² = ${sq}`, `3r producte: ${b} · ${sq} = ${prod}`, `4t sumes i restes d'esquerra a dreta: ${a} + ${prod} − ${f} = ${ans}`],
        [`1.º paréntesis: ${c} − ${d} = ${p}`, `2.º potencia: ${p}² = ${sq}`, `3.º producto: ${b} · ${sq} = ${prod}`, `4.º sumas y restas de izquierda a derecha: ${a} + ${prod} − ${f} = ${ans}`]),
    };
  },
  num_frac_of() {
    const d = pick([3, 4, 5, 6, 8]);
    let n = R(1, d - 1); while (gcd(n, d) !== 1) n = R(1, d - 1);
    const N = d * 2 * R(3, 10);
    const part = (N * n) / d, rest = N - part, ans = rest / 2;
    return {
      topic: "num", type: "num", answer: ans, tol: 0, unit: both("alumnes", "alumnos"),
      q: both(`En una escola hi ha ${N} alumnes. ${n}/${d} fan anglès extraescolar i, dels que queden, la meitat fan música. Quants alumnes no fan cap de les dues activitats?`,
        `En una escuela hay ${N} alumnos. ${n}/${d} hacen inglés extraescolar y, de los que quedan, la mitad hacen música. ¿Cuántos alumnos no hacen ninguna de las dos actividades?`),
      steps: both(
        [`Anglès: ${n}/${d} de ${N} = ${N} : ${d} · ${n} = ${part}`, `Queden: ${N} − ${part} = ${rest}`, `Música: la meitat de ${rest} = ${ans}`, `No fan res: ${rest} − ${ans} = ${ans} alumnes`],
        [`Inglés: ${n}/${d} de ${N} = ${N} : ${d} · ${n} = ${part}`, `Quedan: ${N} − ${part} = ${rest}`, `Música: la mitad de ${rest} = ${ans}`, `No hacen nada: ${rest} − ${ans} = ${ans} alumnos`]),
    };
  },
  num_frac_op() {
    const b = pick([2, 3, 4, 5, 6]), d = pick([2, 3, 4, 5, 6, 8]);
    let a = R(1, b + 2), c = R(1, d + 1);
    if (a === b) a++;
    if (c === d) c++;
    const op = pick(["+", "−", "·"]);
    let num, den, wrong;
    if (op === "+") { num = a * d + c * b; den = b * d; wrong = [fr(a + c, b + d), fr(a * c, b * d), fr(a * d + c * b, b + d)]; }
    else if (op === "−") {
      if (a * d - c * b <= 0) return GEN.num_frac_op();
      num = a * d - c * b; den = b * d; wrong = [fr(Math.abs(a - c) || 1, Math.abs(b - d) || 1), fr(a * d + c * b, b * d), fr(a * c, b * d)];
    } else { num = a * c; den = b * d; wrong = [fr(a * d + c * b, b * d), fr(a * d, b * c), fr(a + c, b + d)]; }
    const correct = fr(num, den);
    const m = shuffleMcq(correct, wrong);
    return {
      topic: "num", type: "mcq", ...m,
      q: both(`Quin és el resultat simplificat de <b class="nowrap">${a}/${b} ${op} ${c}/${d}</b>?`, `¿Cuál es el resultado simplificado de <b class="nowrap">${a}/${b} ${op} ${c}/${d}</b>?`),
      steps: op === "·"
        ? both([`Es multipliquen numeradors i denominadors: (${a}·${c})/(${b}·${d}) = ${a * c}/${b * d}`, `Simplifiquem: ${correct}`], [`Se multiplican numeradores y denominadores: (${a}·${c})/(${b}·${d}) = ${a * c}/${b * d}`, `Simplificamos: ${correct}`])
        : both([`Denominador comú: ${b}·${d} = ${den}`, `${a}/${b} = ${a * d}/${den} i ${c}/${d} = ${c * b}/${den}`, `${a * d} ${op} ${c * b} = ${num} → ${num}/${den}`, `Simplifiquem: ${correct}`],
          [`Denominador común: ${b}·${d} = ${den}`, `${a}/${b} = ${a * d}/${den} y ${c}/${d} = ${c * b}/${den}`, `${a * d} ${op} ${c * b} = ${num} → ${num}/${den}`, `Simplificamos: ${correct}`]),
    };
  },

  // ---------------- PROPORCIONALITAT ----------------
  prop_pct() {
    if (Math.random() < 0.5) {
      const P = R(4, 40) * 5, x = pick([10, 20, 25, 30, 40]), y = pick([5, 10, 15, 20, 25]);
      const after1 = P * (1 - x / 100), ans = after1 * (1 + y / 100);
      return {
        topic: "prop", type: "num", answer: Math.round(ans * 100) / 100, tol: 0.011, unit: both("€", "€"),
        q: both(`Una jaqueta costa ${P} €. A les rebaixes la rebaixen un ${x} % i, un mes després, n'apugen el preu rebaixat un ${y} %. Quin és el preu final?`,
          `Una chaqueta cuesta ${P} €. En rebajas la rebajan un ${x} % y, un mes después, suben el precio rebajado un ${y} %. ¿Cuál es el precio final?`),
        steps: both(
          [`Descompte: ${P} · (1 − ${fmt(x / 100)}) = ${P} · ${fmt(1 - x / 100)} = ${fmt(after1)} €`, `Augment: ${fmt(after1)} · ${fmt(1 + y / 100)} = ${fmt(ans)} €`, `⚠️ No és el mateix que aplicar un ${x - y} % de descompte: els percentatges s'apliquen sobre quantitats diferents.`],
          [`Descuento: ${P} · (1 − ${fmt(x / 100)}) = ${P} · ${fmt(1 - x / 100)} = ${fmt(after1)} €`, `Aumento: ${fmt(after1)} · ${fmt(1 + y / 100)} = ${fmt(ans)} €`, `⚠️ No es lo mismo que aplicar un ${x - y} % de descuento: los porcentajes se aplican sobre cantidades distintas.`]),
      };
    }
    const x = pick([10, 20, 25, 40, 50]); const P = R(2, 30) * 20; const Q = P * (1 - x / 100);
    return {
      topic: "prop", type: "num", answer: P, tol: 0.01, unit: both("€", "€"),
      q: both(`Després d'aplicar un descompte del ${x} %, he pagat ${fmt(Q)} € per una bicicleta. Quin era el preu inicial?`, `Después de aplicar un descuento del ${x} %, he pagado ${fmt(Q)} € por una bicicleta. ¿Cuál era el precio inicial?`),
      steps: both(
        [`Si descompten un ${x} %, pago el ${100 - x} % del preu: preu · ${fmt((100 - x) / 100)} = ${fmt(Q)}`, `Preu = ${fmt(Q)} : ${fmt((100 - x) / 100)} = ${P} €`, `⚠️ Error típic: sumar el ${x} % a ${fmt(Q)} (no dona el preu inicial).`],
        [`Si descuentan un ${x} %, pago el ${100 - x} % del precio: precio · ${fmt((100 - x) / 100)} = ${fmt(Q)}`, `Precio = ${fmt(Q)} : ${fmt((100 - x) / 100)} = ${P} €`, `⚠️ Error típico: sumar el ${x} % a ${fmt(Q)} (no da el precio inicial).`]),
    };
  },
  prop_direct() {
    const fruits = [["pomes", "manzanas"], ["taronges", "naranjas"], ["peres", "peras"], ["maduixes", "fresas"]];
    const [fca, fes] = pick(fruits);
    const p = R(120, 480) / 100, k1 = R(2, 6); let k2 = R(3, 12); if (k2 === k1) k2++;
    const t1 = Math.round(k1 * p * 100) / 100, ans = Math.round((t1 / k1) * k2 * 100) / 100;
    return {
      topic: "prop", type: "num", answer: ans, tol: 0.011, unit: both("€", "€"),
      q: both(`Si ${k1} kg de ${fca} costen ${fmt(t1)} €, quant costaran ${k2} kg?`, `Si ${k1} kg de ${fes} cuestan ${fmt(t1)} €, ¿cuánto costarán ${k2} kg?`),
      steps: both([`És una proporcionalitat directa (més kg → més preu).`, `Preu d'1 kg: ${fmt(t1)} : ${k1} = ${fmt(t1 / k1)} €`, `${k2} kg: ${fmt(t1 / k1)} · ${k2} = ${fmt(ans)} €`],
        [`Es una proporcionalidad directa (más kg → más precio).`, `Precio de 1 kg: ${fmt(t1)} : ${k1} = ${fmt(t1 / k1)} €`, `${k2} kg: ${fmt(t1 / k1)} · ${k2} = ${fmt(ans)} €`]),
    };
  },
  prop_inverse() {
    const w1 = pick([2, 3, 4, 6, 8]), d1 = R(4, 15), total = w1 * d1;
    const divs = []; for (let i = 2; i <= 16; i++) if (total % i === 0 && i !== w1) divs.push(i);
    if (!divs.length) return GEN.prop_inverse();
    const w2 = pick(divs), ans = total / w2;
    return {
      topic: "prop", type: "num", answer: ans, tol: 0, unit: both("dies", "días"),
      q: both(`${w1} pintors triguen ${d1} dies a pintar una escola. Quants dies trigarien ${w2} pintors treballant al mateix ritme?`, `${w1} pintores tardan ${d1} días en pintar una escuela. ¿Cuántos días tardarían ${w2} pintores trabajando al mismo ritmo?`),
      steps: both([`Proporcionalitat inversa: més pintors → menys dies.`, `Feina total: ${w1} · ${d1} = ${total} jornades`, `${total} : ${w2} = ${ans} dies`], [`Proporcionalidad inversa: más pintores → menos días.`, `Trabajo total: ${w1} · ${d1} = ${total} jornadas`, `${total} : ${w2} = ${ans} días`]),
    };
  },
  prop_scale() {
    const scale = pick([25000, 50000, 100000, 200000]), cm = R(3, 30) / 2;
    const ans = (cm * scale) / 100000;
    return {
      topic: "prop", type: "num", answer: ans, tol: 0.01, unit: both("km", "km"),
      q: both(`En un mapa a escala 1:${fmt(scale, 0)}, dos pobles estan separats ${fmt(cm)} cm. Quina és la distància real en km?`, `En un mapa a escala 1:${fmt(scale, 0)}, dos pueblos están separados ${fmt(cm)} cm. ¿Cuál es la distancia real en km?`),
      steps: both([`1 cm al mapa = ${fmt(scale, 0)} cm reals`, `${fmt(cm)} · ${fmt(scale, 0)} = ${fmt(cm * scale, 0)} cm`, `1 km = 100.000 cm → ${fmt(cm * scale, 0)} : 100.000 = ${fmt(ans)} km`],
        [`1 cm en el mapa = ${fmt(scale, 0)} cm reales`, `${fmt(cm)} · ${fmt(scale, 0)} = ${fmt(cm * scale, 0)} cm`, `1 km = 100.000 cm → ${fmt(cm * scale, 0)} : 100.000 = ${fmt(ans)} km`]),
    };
  },
  prop_speed() {
    let v, t;
    do { v = pick([60, 72, 80, 90, 100, 120]); t = pick([15, 20, 30, 40, 45, 50, 75, 90]); } while ((v * t) % 60 !== 0);
    const d = (v * t) / 60;
    return {
      topic: "prop", type: "num", answer: t, tol: 0, unit: both("minuts", "minutos"),
      q: both(`Un tren circula a una velocitat constant de ${v} km/h. Quants minuts trigarà a recórrer ${fmt(d)} km?`, `Un tren circula a una velocidad constante de ${v} km/h. ¿Cuántos minutos tardará en recorrer ${fmt(d)} km?`),
      steps: both([`temps = distància : velocitat = ${fmt(d)} : ${v} = ${fmt(d / v, 3)} h`, `${fmt(d / v, 3)} h · 60 = ${t} minuts`], [`tiempo = distancia : velocidad = ${fmt(d)} : ${v} = ${fmt(d / v, 3)} h`, `${fmt(d / v, 3)} h · 60 = ${t} minutos`]),
    };
  },

  // ---------------- MESURA ----------------
  mes_units() {
    const C = [
      [() => R(2, 95) / 10, "km", "m", 1000], [() => R(2, 60) / 10, "m", "cm", 100], [() => R(1, 30) / 4, "l", "ml", 1000],
      [() => R(5, 95) * 10, "cl", "l", 0.01], [() => R(2, 9), "m²", "cm²", 10000], [() => R(2, 30) / 2, "ha", "m²", 10000],
      [() => R(1, 12) / 2, "m³", "l", 1000], [() => R(250, 4000), "g", "kg", 0.001], [() => R(3, 15) / 2, "h", "min", 60],
      [() => R(2, 20) * 50, "cm³", "l", 0.001], [() => R(12, 600) * 10, "m", "km", 0.001],
    ];
    const [gv, from, to, f] = pick(C); const v = gv(); const ans = Math.round(v * f * 10000) / 10000;
    return {
      topic: "mesura", type: "num", answer: ans, tol: 0.0001, unit: both(to, to),
      q: both(`Expressa ${fmt(v)} ${from} en ${to}.`, `Expresa ${fmt(v)} ${from} en ${to}.`),
      steps: both([`1 ${from} = ${fmt(f, 4)} ${to}`, `${fmt(v)} · ${fmt(f, 4)} = ${fmt(ans, 4)} ${to}`, from.includes("²") || to.includes("²") ? "Recorda: en unitats de superfície, cada salt és ×100." : from.includes("³") || to.includes("³") ? "Recorda: 1 dm³ = 1 l i cada salt de volum és ×1000." : ""].filter(Boolean),
        [`1 ${from} = ${fmt(f, 4)} ${to}`, `${fmt(v)} · ${fmt(f, 4)} = ${fmt(ans, 4)} ${to}`, from.includes("²") || to.includes("²") ? "Recuerda: en unidades de superficie, cada salto es ×100." : from.includes("³") || to.includes("³") ? "Recuerda: 1 dm³ = 1 l y cada salto de volumen es ×1000." : ""].filter(Boolean)),
    };
  },

  // ---------------- GEOMETRIA ----------------
  geo_area() {
    const t = pick(["trap", "tri", "circ", "garden"]);
    if (t === "trap") {
      const B = R(8, 20), b = R(3, B - 2), h = R(3, 12), ans = ((B + b) * h) / 2;
      return { topic: "geo", type: "num", answer: ans, tol: 0.01, unit: both("m²", "m²"),
        q: both(`Un pati té forma de trapezi amb bases de ${B} m i ${b} m, i una altura de ${h} m. Quina és la seva àrea?`, `Un patio tiene forma de trapecio con bases de ${B} m y ${b} m, y una altura de ${h} m. ¿Cuál es su área?`),
        steps: both([`A = (B + b) · h / 2`, `A = (${B} + ${b}) · ${h} / 2 = ${fmt(ans)} m²`], [`A = (B + b) · h / 2`, `A = (${B} + ${b}) · ${h} / 2 = ${fmt(ans)} m²`]) };
    }
    if (t === "tri") {
      const b = R(4, 20), h = R(3, 15), ans = (b * h) / 2;
      return { topic: "geo", type: "num", answer: ans, tol: 0.01, unit: both("cm²", "cm²"),
        q: both(`Calcula l'àrea d'un triangle de ${b} cm de base i ${h} cm d'altura.`, `Calcula el área de un triángulo de ${b} cm de base y ${h} cm de altura.`),
        steps: both([`A = b · h / 2 = ${b} · ${h} / 2 = ${fmt(ans)} cm²`], [`A = b · h / 2 = ${b} · ${h} / 2 = ${fmt(ans)} cm²`]) };
    }
    if (t === "circ") {
      const r = R(2, 12), ans = Math.round(3.14 * r * r * 100) / 100;
      return { topic: "geo", type: "num", answer: ans, tol: 0.011, unit: both("m²", "m²"),
        q: both(`Una catifa circular té un radi de ${r} m. Quina és la seva àrea? (Fes servir π = 3,14)`, `Una alfombra circular tiene un radio de ${r} m. ¿Cuál es su área? (Usa π = 3,14)`),
        steps: both([`A = π · r²`, `A = 3,14 · ${r}² = 3,14 · ${r * r} = ${fmt(ans)} m²`], [`A = π · r²`, `A = 3,14 · ${r}² = 3,14 · ${r * r} = ${fmt(ans)} m²`]) };
    }
    const L = R(10, 30), W = R(8, 20), s = R(2, Math.min(6, W - 2)), ans = L * W - s * s;
    return { topic: "geo", type: "num", answer: ans, tol: 0, unit: both("m²", "m²"),
      q: both(`Un jardí rectangular fa ${L} m × ${W} m. Al mig hi ha una bassa quadrada de ${s} m de costat. Quina superfície de gespa hi ha?`, `Un jardín rectangular mide ${L} m × ${W} m. En medio hay un estanque cuadrado de ${s} m de lado. ¿Qué superficie de césped hay?`),
      steps: both([`Rectangle: ${L} · ${W} = ${L * W} m²`, `Bassa: ${s}² = ${s * s} m²`, `Gespa: ${L * W} − ${s * s} = ${ans} m²`], [`Rectángulo: ${L} · ${W} = ${L * W} m²`, `Estanque: ${s}² = ${s * s} m²`, `Césped: ${L * W} − ${s * s} = ${ans} m²`]) };
  },
  geo_pyth() {
    const [a0, b0, c0] = pick([[3, 4, 5], [5, 12, 13], [8, 15, 17], [6, 8, 10], [7, 24, 25]]);
    const k = pick([1, 1, 2]); const a = a0 * k, b = b0 * k, c = c0 * k;
    if (Math.random() < 0.5) {
      return { topic: "geo", type: "num", answer: c, tol: 0.01, unit: both("m", "m"),
        q: both(`Una escala recolzada en una paret arriba a ${b} m d'altura, i el peu de l'escala és a ${a} m de la paret. Quant fa l'escala?`, `Una escalera apoyada en una pared llega a ${b} m de altura, y el pie de la escalera está a ${a} m de la pared. ¿Cuánto mide la escalera?`),
        steps: both([`Teorema de Pitàgores: h² = a² + b²`, `h² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}`, `h = √${c * c} = ${c} m`], [`Teorema de Pitágoras: h² = a² + b²`, `h² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c}`, `h = √${c * c} = ${c} m`]) };
    }
    return { topic: "geo", type: "num", answer: b, tol: 0.01, unit: both("cm", "cm"),
      q: both(`Un triangle rectangle té una hipotenusa de ${c} cm i un catet de ${a} cm. Quant fa l'altre catet?`, `Un triángulo rectángulo tiene una hipotenusa de ${c} cm y un cateto de ${a} cm. ¿Cuánto mide el otro cateto?`),
      steps: both([`b² = h² − a² = ${c * c} − ${a * a} = ${b * b}`, `b = √${b * b} = ${b} cm`], [`b² = h² − a² = ${c * c} − ${a * a} = ${b * b}`, `b = √${b * b} = ${b} cm`]) };
  },
  geo_vol() {
    if (Math.random() < 0.7) {
      const l = R(4, 12) * 10, w = R(2, 6) * 10, h = R(2, 6) * 10, ans = (l * w * h) / 1000;
      return { topic: "geo", type: "num", answer: ans, tol: 0.01, unit: both("litres", "litros"),
        q: both(`Un aquari amb forma d'ortoedre fa ${l} cm de llarg, ${w} cm d'ample i ${h} cm d'alt. Quants litres d'aigua hi caben?`, `Un acuario con forma de ortoedro mide ${l} cm de largo, ${w} cm de ancho y ${h} cm de alto. ¿Cuántos litros de agua caben?`),
        steps: both([`V = llarg · ample · alt = ${l} · ${w} · ${h} = ${fmt(l * w * h, 0)} cm³`, `1 l = 1 dm³ = 1.000 cm³ → ${fmt(l * w * h, 0)} : 1.000 = ${fmt(ans)} l`], [`V = largo · ancho · alto = ${l} · ${w} · ${h} = ${fmt(l * w * h, 0)} cm³`, `1 l = 1 dm³ = 1.000 cm³ → ${fmt(l * w * h, 0)} : 1.000 = ${fmt(ans)} l`]) };
    }
    const r = R(1, 4), h = R(2, 10), ans = Math.round(3.14 * r * r * h * 100) / 100;
    return { topic: "geo", type: "num", answer: ans, tol: 0.011, unit: both("litres", "litros"),
      q: both(`Un dipòsit cilíndric té ${r} dm de radi i ${h} dm d'altura. Quants litres hi caben? (π = 3,14)`, `Un depósito cilíndrico tiene ${r} dm de radio y ${h} dm de altura. ¿Cuántos litros caben? (π = 3,14)`),
      steps: both([`V = π · r² · h = 3,14 · ${r * r} · ${h} = ${fmt(ans)} dm³`, `1 dm³ = 1 l → ${fmt(ans)} l`], [`V = π · r² · h = 3,14 · ${r * r} · ${h} = ${fmt(ans)} dm³`, `1 dm³ = 1 l → ${fmt(ans)} l`]) };
  },

  // ---------------- ÀLGEBRA ----------------
  alg_eq() {
    const t = pick(["cons", "class", "test"]);
    if (t === "cons") {
      const n = R(5, 60), S = 3 * n + 3;
      return { topic: "alg", type: "num", answer: n, tol: 0,
        q: both(`La suma de tres nombres naturals consecutius és ${S}. Quin és el més petit?`, `La suma de tres números naturales consecutivos es ${S}. ¿Cuál es el menor?`),
        steps: both([`Anomenem x, x+1, x+2`, `x + (x+1) + (x+2) = ${S} → 3x + 3 = ${S}`, `3x = ${S - 3} → x = ${n}`, `Comprovació: ${n} + ${n + 1} + ${n + 2} = ${S} ✓`], [`Llamamos x, x+1, x+2`, `x + (x+1) + (x+2) = ${S} → 3x + 3 = ${S}`, `3x = ${S - 3} → x = ${n}`, `Comprobación: ${n} + ${n + 1} + ${n + 2} = ${S} ✓`]) };
    }
    if (t === "class") {
      const boys = R(8, 14), dif = R(1, 6), N = 2 * boys + dif;
      return { topic: "alg", type: "num", answer: boys, tol: 0, unit: both("nois", "chicos"),
        q: both(`En una classe de ${N} alumnes hi ha ${dif} noies més que nois. Quants nois hi ha?`, `En una clase de ${N} alumnos hay ${dif} chicas más que chicos. ¿Cuántos chicos hay?`),
        steps: both([`Nois = x; noies = x + ${dif}`, `x + x + ${dif} = ${N} → 2x = ${N - dif}`, `x = ${boys} nois (i ${boys + dif} noies)`], [`Chicos = x; chicas = x + ${dif}`, `x + x + ${dif} = ${N} → 2x = ${N - dif}`, `x = ${boys} chicos (y ${boys + dif} chicas)`]) };
    }
    const x = R(8, 19), P = 4 * x - 20;
    return { topic: "alg", type: "num", answer: x, tol: 0, unit: both("encerts", "aciertos"),
      q: both(`En un test de 20 preguntes, cada encert suma 3 punts i cada error resta 1 punt. La Júlia ha contestat totes les preguntes i ha obtingut ${P} punts. Quantes n'ha encertat?`, `En un test de 20 preguntas, cada acierto suma 3 puntos y cada error resta 1 punto. Julia ha contestado todas las preguntas y ha obtenido ${P} puntos. ¿Cuántas ha acertado?`),
      steps: both([`Encerts = x; errors = 20 − x`, `3x − (20 − x) = ${P} → 4x − 20 = ${P}`, `4x = ${P + 20} → x = ${x}`, `Comprovació: 3·${x} − ${20 - x} = ${P} ✓`], [`Aciertos = x; errores = 20 − x`, `3x − (20 − x) = ${P} → 4x − 20 = ${P}`, `4x = ${P + 20} → x = ${x}`, `Comprobación: 3·${x} − ${20 - x} = ${P} ✓`]) };
  },

  // ---------------- ESTADÍSTICA ----------------
  est_stats() {
    if (Math.random() < 0.5) {
      const notes = Array.from({ length: 4 }, () => R(4, 9)); const sum = notes.reduce((a, b) => a + b, 0);
      const need = R(5, 10); const M = (sum + need) / 5;
      return { topic: "estad", type: "num", answer: need, tol: 0.01,
        q: both(`En Pol ha tret ${notes.join(", ")} en quatre exàmens. Quina nota ha de treure en el cinquè per tenir una mitjana de ${fmt(M)}?`, `Pol ha sacado ${notes.join(", ")} en cuatro exámenes. ¿Qué nota tiene que sacar en el quinto para tener una media de ${fmt(M)}?`),
        steps: both([`Suma necessària: ${fmt(M)} · 5 = ${fmt(M * 5)}`, `Suma actual: ${notes.join(" + ")} = ${sum}`, `Nota necessària: ${fmt(M * 5)} − ${sum} = ${need}`], [`Suma necesaria: ${fmt(M)} · 5 = ${fmt(M * 5)}`, `Suma actual: ${notes.join(" + ")} = ${sum}`, `Nota necesaria: ${fmt(M * 5)} − ${sum} = ${need}`]) };
    }
    const n = pick([6, 7]); const data = Array.from({ length: n }, () => R(1, 20)); const s = [...data].sort((a, b) => a - b);
    const med = n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
    return { topic: "estad", type: "num", answer: med, tol: 0.01,
      q: both(`Aquests són els llibres llegits per ${n} alumnes durant l'any: ${data.join(", ")}. Quina és la mediana?`, `Estos son los libros leídos por ${n} alumnos durante el año: ${data.join(", ")}. ¿Cuál es la mediana?`),
      steps: both([`Ordenem: ${s.join(", ")}`, n % 2 ? `Hi ha ${n} dades (senar): la mediana és la del mig → ${med}` : `Hi ha ${n} dades (parell): mitjana de les dues centrals → (${s[n / 2 - 1]} + ${s[n / 2]}) / 2 = ${fmt(med)}`],
        [`Ordenamos: ${s.join(", ")}`, n % 2 ? `Hay ${n} datos (impar): la mediana es el central → ${med}` : `Hay ${n} datos (par): media de los dos centrales → (${s[n / 2 - 1]} + ${s[n / 2]}) / 2 = ${fmt(med)}`]) };
  },

  // ---------------- PROBABILITAT ----------------
  prob_basic() {
    const t = pick(["urn", "dice", "urn"]);
    if (t === "urn") {
      const r = R(2, 8), b = R(2, 8), g = R(2, 6), T = r + b + g;
      const correct = fr(b + g, T);
      const m = shuffleMcq(correct, [fr(r, T), fr(b + g, r), fr(b, T), fr(g, T)]);
      return { topic: "prob", type: "mcq", ...m,
        q: both(`En una bossa hi ha ${r} boles vermelles, ${b} de blaves i ${g} de verdes. Si en traiem una a l'atzar, quina és la probabilitat que NO sigui vermella?`, `En una bolsa hay ${r} bolas rojas, ${b} azules y ${g} verdes. Si sacamos una al azar, ¿cuál es la probabilidad de que NO sea roja?`),
        steps: both([`Regla de Laplace: P = casos favorables / casos possibles`, `Possibles: ${r} + ${b} + ${g} = ${T}`, `Favorables (no vermella): ${b} + ${g} = ${b + g}`, `P = ${b + g}/${T} = ${correct}`], [`Regla de Laplace: P = casos favorables / casos posibles`, `Posibles: ${r} + ${b} + ${g} = ${T}`, `Favorables (no roja): ${b} + ${g} = ${b + g}`, `P = ${b + g}/${T} = ${correct}`]) };
    }
    const s = R(3, 11); const fav = 6 - Math.abs(7 - s); const correct = fr(fav, 36);
    const m = shuffleMcq(correct, [fr(1, 12), fr(fav, 12), fr(1, 6), fr(fav + 1, 36), fr(1, s)]);
    return { topic: "prob", type: "mcq", ...m,
      q: both(`Llancem dos daus i sumem els punts. Quina és la probabilitat que la suma sigui ${s}?`, `Lanzamos dos dados y sumamos los puntos. ¿Cuál es la probabilidad de que la suma sea ${s}?`),
      steps: both([`Casos possibles: 6 · 6 = 36`, `Casos favorables (parelles que sumen ${s}): ${fav}`, `P = ${fav}/36 = ${correct}`], [`Casos posibles: 6 · 6 = 36`, `Casos favorables (parejas que suman ${s}): ${fav}`, `P = ${fav}/36 = ${correct}`]) };
  },

  // ---------------- LÒGICA ----------------
  log_seq() {
    const t = pick(["arit", "geom", "sq", "alt", "fib"]);
    let seq, next, ruleCa, ruleEs;
    if (t === "arit") { const a = R(1, 30), d = R(3, 12); seq = [0, 1, 2, 3, 4].map((i) => a + i * d); next = a + 5 * d; ruleCa = `Se suma ${d} cada vegada.`; ruleEs = `Se suma ${d} cada vez.`; }
    else if (t === "geom") { const a = R(1, 5), r = pick([2, 3]); seq = [0, 1, 2, 3, 4].map((i) => a * r ** i); next = a * r ** 5; ruleCa = `Es multiplica per ${r} cada vegada.`; ruleEs = `Se multiplica por ${r} cada vez.`; }
    else if (t === "sq") { const k = R(0, 5); seq = [1, 2, 3, 4, 5].map((i) => i * i + k); next = 36 + k; ruleCa = `Són els quadrats (1, 4, 9, 16...) més ${k}.`; ruleEs = `Son los cuadrados (1, 4, 9, 16...) más ${k}.`; }
    else if (t === "alt") { const a = R(2, 10), p = R(2, 6); seq = [a]; for (let i = 0; i < 5; i++) seq.push(i % 2 ? seq[i] * 2 : seq[i] + p); next = seq.pop(); ruleCa = `S'alterna: +${p}, ×2, +${p}, ×2...`; ruleEs = `Se alterna: +${p}, ×2, +${p}, ×2...`; }
    else { const a = R(1, 4), b = R(2, 6); seq = [a, b]; for (let i = 0; i < 4; i++) seq.push(seq[seq.length - 1] + seq[seq.length - 2]); next = seq.pop(); ruleCa = `Cada terme és la suma dels dos anteriors.`; ruleEs = `Cada término es la suma de los dos anteriores.`; }
    return { topic: "logica", type: "num", answer: next, tol: 0,
      q: both(`Quin és el nombre següent de la sèrie? <b class="nowrap">${seq.join(", ")}, …</b>`, `¿Cuál es el número siguiente de la serie? <b class="nowrap">${seq.join(", ")}, …</b>`),
      steps: both([ruleCa, `Següent: ${next}`], [ruleEs, `Siguiente: ${next}`]) };
  },
};

export const MATH_GENERATORS = Object.keys(GEN);
export function generate(name) { return { ...GEN[name](), gen: name }; }
export function generateForTopic(topic) {
  const names = MATH_GENERATORS.filter((n) => topicOf(n) === topic);
  return generate(pick(names));
}
export function topicOf(gen) {
  return { num_ops: "num", num_frac_of: "num", num_frac_op: "num", prop_pct: "prop", prop_direct: "prop", prop_inverse: "prop", prop_scale: "prop", prop_speed: "prop", mes_units: "mesura", geo_area: "geo", geo_pyth: "geo", geo_vol: "geo", alg_eq: "alg", est_stats: "estad", prob_basic: "prob", log_seq: "logica" }[gen];
}

// Problemes de raonament lògic fixos (bilingües)
export const LOGIC = [
  { id: "lg1", topic: "logica", q: both("Tots els mestres d'una escola són pacients. Alguns pacients són músics. Què podem assegurar?", "Todos los maestros de una escuela son pacientes. Algunos pacientes son músicos. ¿Qué podemos asegurar?"),
    o: [both("Res sobre si algun mestre és músic.", "Nada sobre si algún maestro es músico."), both("Alguns mestres són músics.", "Algunos maestros son músicos."), both("Cap mestre és músic.", "Ningún maestro es músico."), both("Tots els músics són mestres.", "Todos los músicos son maestros.")], a: 0,
    e: both("Els músics pacients poden ser o no mestres: amb aquestes premisses no es pot deduir cap relació segura entre mestres i músics.", "Los músicos pacientes pueden ser o no maestros: con estas premisas no se puede deducir ninguna relación segura entre maestros y músicos.") },
  { id: "lg2", topic: "logica", q: both("Si avui és dimecres, quin dia de la setmana serà d'aquí a 100 dies?", "Si hoy es miércoles, ¿qué día de la semana será dentro de 100 días?"),
    o: [both("Divendres", "Viernes"), both("Dijous", "Jueves"), both("Dimecres", "Miércoles"), both("Dissabte", "Sábado")], a: 0,
    e: both("100 = 7 · 14 + 2. Cada 7 dies es repeteix el dia, així que comptem 2 dies més: dimecres → divendres.", "100 = 7 · 14 + 2. Cada 7 días se repite el día, así que contamos 2 días más: miércoles → viernes.") },
  { id: "lg3", topic: "logica", q: both("En una reunió, 6 persones se saluden donant-se la mà, totes amb totes, una sola vegada. Quantes encaixades hi ha?", "En una reunión, 6 personas se saludan dándose la mano, todas con todas, una sola vez. ¿Cuántos apretones hay?"),
    o: [both("15", "15"), both("30", "30"), both("36", "36"), both("12", "12")], a: 0,
    e: both("Cada persona en saluda 5: 6 · 5 = 30, però cada encaixada s'ha comptat dues vegades: 30 / 2 = 15.", "Cada persona saluda a 5: 6 · 5 = 30, pero cada apretón se ha contado dos veces: 30 / 2 = 15.") },
  { id: "lg4", topic: "logica", q: both("Quin angle formen les agulles del rellotge a les 3:30?", "¿Qué ángulo forman las agujas del reloj a las 3:30?"),
    o: [both("75°", "75°"), both("90°", "90°"), both("60°", "60°"), both("105°", "105°")], a: 0,
    e: both("La minutera és al 6 (180°). L'horària ha avançat de les 3 (90°) la meitat d'una hora (15°): 105°. Diferència: 180 − 105 = 75°.", "El minutero está en el 6 (180°). La aguja horaria ha avanzado desde las 3 (90°) la mitad de una hora (15°): 105°. Diferencia: 180 − 105 = 75°.") },
  { id: "lg5", topic: "logica", q: both("Quants quadrats (de qualsevol mida) hi ha en una quadrícula de 3 × 3?", "¿Cuántos cuadrados (de cualquier tamaño) hay en una cuadrícula de 3 × 3?"),
    o: [both("14", "14"), both("9", "9"), both("10", "10"), both("13", "13")], a: 0,
    e: both("De 1×1: 9; de 2×2: 4; de 3×3: 1. Total: 9 + 4 + 1 = 14.", "De 1×1: 9; de 2×2: 4; de 3×3: 1. Total: 9 + 4 + 1 = 14.") },
  { id: "lg6", topic: "logica", q: both("En Pau diu: «L'Anna menteix». L'Anna diu: «En Pau i jo diem la veritat». Qui diu la veritat?", "Pau dice: «Anna miente». Anna dice: «Pau y yo decimos la verdad». ¿Quién dice la verdad?"),
    o: [both("Només en Pau", "Solo Pau"), both("Només l'Anna", "Solo Anna"), both("Tots dos", "Los dos"), both("Cap dels dos", "Ninguno")], a: 0,
    e: both("Si l'Anna digués la veritat, en Pau també, però en Pau diu que l'Anna menteix: contradicció. Per tant, l'Anna menteix i en Pau diu la veritat.", "Si Anna dijera la verdad, Pau también, pero Pau dice que Anna miente: contradicción. Por tanto, Anna miente y Pau dice la verdad.") },
  { id: "lg7", topic: "logica", q: both("En un calaix a les fosques hi ha 10 mitjons blancs i 10 de negres. Quants n'has de treure, com a mínim, per assegurar-te un parell del mateix color?", "En un cajón a oscuras hay 10 calcetines blancos y 10 negros. ¿Cuántos tienes que sacar, como mínimo, para asegurarte un par del mismo color?"),
    o: [both("3", "3"), both("2", "2"), both("11", "11"), both("4", "4")], a: 0,
    e: both("Principi del colomar: amb 2 mitjons podrien ser de colors diferents, però el 3r ha de coincidir amb un dels dos.", "Principio del palomar: con 2 calcetines podrían ser de colores distintos, pero el 3.º tiene que coincidir con uno de los dos.") },
  { id: "lg8", topic: "logica", q: both("Per numerar les pàgines d'un llibre de 120 pàgines, quantes xifres s'han d'escriure?", "Para numerar las páginas de un libro de 120 páginas, ¿cuántas cifras hay que escribir?"),
    o: [both("252", "252"), both("240", "240"), both("360", "360"), both("231", "231")], a: 0,
    e: both("1–9: 9 xifres; 10–99: 90 · 2 = 180; 100–120: 21 · 3 = 63. Total: 9 + 180 + 63 = 252.", "1–9: 9 cifras; 10–99: 90 · 2 = 180; 100–120: 21 · 3 = 63. Total: 9 + 180 + 63 = 252.") },
  { id: "lg9", topic: "logica", q: both("Un preu puja un 50 % i després baixa un 50 %. Respecte del preu inicial, el preu final és...", "Un precio sube un 50 % y después baja un 50 %. Respecto al precio inicial, el precio final es..."),
    o: [both("un 25 % més baix", "un 25 % más bajo"), both("igual", "igual"), both("un 25 % més alt", "un 25 % más alto"), both("un 50 % més baix", "un 50 % más bajo")], a: 0,
    e: both("100 → 150 → 75. El preu final és el 75 % de l'inicial: un 25 % més baix.", "100 → 150 → 75. El precio final es el 75 % del inicial: un 25 % más bajo.") },
  { id: "lg10", topic: "logica", q: both("Vas a un poble a 60 km/h i en tornes per la mateixa carretera a 40 km/h. Quina és la velocitat mitjana del viatge?", "Vas a un pueblo a 60 km/h y vuelves por la misma carretera a 40 km/h. ¿Cuál es la velocidad media del viaje?"),
    o: [both("48 km/h", "48 km/h"), both("50 km/h", "50 km/h"), both("45 km/h", "45 km/h"), both("52 km/h", "52 km/h")], a: 0,
    e: both("Suposem 120 km: anada 2 h, tornada 3 h. 240 km / 5 h = 48 km/h. No és la mitjana de les velocitats!", "Supongamos 120 km: ida 2 h, vuelta 3 h. 240 km / 5 h = 48 km/h. ¡No es la media de las velocidades!") },
  { id: "lg11", topic: "logica", q: both("Si 5 màquines fan 5 peces en 5 minuts, quant trigaran 100 màquines a fer 100 peces?", "Si 5 máquinas hacen 5 piezas en 5 minutos, ¿cuánto tardarán 100 máquinas en hacer 100 piezas?"),
    o: [both("5 minuts", "5 minutos"), both("100 minuts", "100 minutos"), both("20 minuts", "20 minutos"), both("1 minut", "1 minuto")], a: 0,
    e: both("Cada màquina fa 1 peça en 5 minuts. 100 màquines fan 100 peces en els mateixos 5 minuts.", "Cada máquina hace 1 pieza en 5 minutos. 100 máquinas hacen 100 piezas en los mismos 5 minutos.") },
  { id: "lg12", topic: "logica", q: both("Un cargol és al fons d'un pou de 10 m. Cada dia puja 3 m i cada nit rellisca 2 m. Quin dia sortirà del pou?", "Un caracol está en el fondo de un pozo de 10 m. Cada día sube 3 m y cada noche resbala 2 m. ¿Qué día saldrá del pozo?"),
    o: [both("El dia 8", "El día 8"), both("El dia 10", "El día 10"), both("El dia 9", "El día 9"), both("El dia 7", "El día 7")], a: 0,
    e: both("Després de 7 dies i 7 nits és a 7 m. El dia 8 puja 3 m i arriba a 10 m: surt abans de relliscar.", "Después de 7 días y 7 noches está a 7 m. El día 8 sube 3 m y llega a 10 m: sale antes de resbalar.") },
];

export const MATH_THEORY = [
  { id: "t_m_strat", topic: "num", icon: "🧭", title: both("Com resoldre (i justificar) un problema", "Cómo resolver (y justificar) un problema"),
    html: both(`<p>A la CLOM no n'hi ha prou amb el resultat: <b>cal justificar</b>. Una resposta correcta però poc justificada pot puntuar només la meitat.</p><ol><li><b>Comprèn</b>: què et donen i què et demanen? Subratlla les dades i les unitats.</li><li><b>Planifica</b>: és proporcionalitat? geometria? cal una equació? fes un esquema o dibuix.</li><li><b>Executa</b> pas a pas, escrivint les operacions.</li><li><b>Revisa</b>: el resultat té sentit? Les unitats són correctes? Comprova'l.</li><li><b>Respon</b> amb una frase completa: «La bicicleta costava 240 €».</li></ol>`,
      `<p>En la CLOM no basta con el resultado: <b>hay que justificar</b>. Una respuesta correcta pero poco justificada puede puntuar solo la mitad.</p><ol><li><b>Comprende</b>: ¿qué te dan y qué te piden? Subraya datos y unidades.</li><li><b>Planifica</b>: ¿es proporcionalidad? ¿geometría? ¿hace falta una ecuación? Haz un esquema o dibujo.</li><li><b>Ejecuta</b> paso a paso, escribiendo las operaciones.</li><li><b>Revisa</b>: ¿tiene sentido el resultado? ¿Las unidades son correctas? Compruébalo.</li><li><b>Responde</b> con una frase completa: «La bicicleta costaba 240 €».</li></ol>`) },
  { id: "t_m_prop", topic: "prop", icon: "⚖️", title: both("Proporcionalitat i percentatges", "Proporcionalidad y porcentajes"),
    html: both(`<p><b>Directa</b>: si una magnitud es duplica, l'altra també (preu i quantitat). Reducció a la unitat o regla de tres.</p><p><b>Inversa</b>: si una es duplica, l'altra es redueix a la meitat (obrers i dies). El producte és constant.</p><p><b>Percentatges</b>: el x % de C = C · x/100.<br>Augment del x %: C · (1 + x/100). Descompte del x %: C · (1 − x/100).<br>Percentatges encadenats: es <b>multipliquen</b> els factors, no se sumen.<br>Preu inicial després d'un descompte: preu final : (1 − x/100).</p><p><b>Escales</b>: 1:50.000 vol dir que 1 cm al mapa són 50.000 cm reals (0,5 km).</p><p><b>Velocitat</b>: v = d / t.</p>`,
      `<p><b>Directa</b>: si una magnitud se duplica, la otra también (precio y cantidad). Reducción a la unidad o regla de tres.</p><p><b>Inversa</b>: si una se duplica, la otra se reduce a la mitad (obreros y días). El producto es constante.</p><p><b>Porcentajes</b>: el x % de C = C · x/100.<br>Aumento del x %: C · (1 + x/100). Descuento del x %: C · (1 − x/100).<br>Porcentajes encadenados: se <b>multiplican</b> los factores, no se suman.<br>Precio inicial tras un descuento: precio final : (1 − x/100).</p><p><b>Escalas</b>: 1:50.000 significa que 1 cm en el mapa son 50.000 cm reales (0,5 km).</p><p><b>Velocidad</b>: v = d / t.</p>`) },
  { id: "t_m_geo", topic: "geo", icon: "📐", title: both("Fórmules de geometria", "Fórmulas de geometría"),
    html: both(`<table class="tbl"><tr><th>Figura</th><th>Àrea / Volum</th></tr><tr><td>Rectangle</td><td>b · h</td></tr><tr><td>Triangle</td><td>b · h / 2</td></tr><tr><td>Trapezi</td><td>(B + b) · h / 2</td></tr><tr><td>Rombe</td><td>D · d / 2</td></tr><tr><td>Cercle</td><td>π · r² (longitud: 2πr)</td></tr><tr><td>Ortoedre</td><td>a · b · c</td></tr><tr><td>Cilindre</td><td>π · r² · h</td></tr><tr><td>Con / piràmide</td><td>àrea base · h / 3</td></tr><tr><td>Esfera</td><td>4/3 · π · r³</td></tr></table><p><b>Pitàgores</b> (triangles rectangles): h² = a² + b².</p><p><b>Angles</b>: la suma dels angles d'un triangle és 180°; d'un quadrilàter, 360°.</p>`,
      `<table class="tbl"><tr><th>Figura</th><th>Área / Volumen</th></tr><tr><td>Rectángulo</td><td>b · h</td></tr><tr><td>Triángulo</td><td>b · h / 2</td></tr><tr><td>Trapecio</td><td>(B + b) · h / 2</td></tr><tr><td>Rombo</td><td>D · d / 2</td></tr><tr><td>Círculo</td><td>π · r² (longitud: 2πr)</td></tr><tr><td>Ortoedro</td><td>a · b · c</td></tr><tr><td>Cilindro</td><td>π · r² · h</td></tr><tr><td>Cono / pirámide</td><td>área base · h / 3</td></tr><tr><td>Esfera</td><td>4/3 · π · r³</td></tr></table><p><b>Pitágoras</b> (triángulos rectángulos): h² = a² + b².</p><p><b>Ángulos</b>: la suma de los ángulos de un triángulo es 180°; de un cuadrilátero, 360°.</p>`) },
  { id: "t_m_units", topic: "mesura", icon: "📏", title: both("Unitats de mesura", "Unidades de medida"),
    html: both(`<p><b>Longitud</b> (×10 cada salt): km, hm, dam, m, dm, cm, mm.</p><p><b>Superfície</b> (×100 cada salt): km², hm² (= ha), dam² (= a), m², dm², cm².</p><p><b>Volum</b> (×1000 cada salt): m³, dm³, cm³. <b>1 dm³ = 1 l</b>, 1 cm³ = 1 ml, 1 m³ = 1000 l.</p><p><b>Capacitat</b> (×10): kl, hl, dal, l, dl, cl, ml.</p><p><b>Massa</b> (×10): kg, hg, dag, g... 1 t = 1000 kg.</p><p><b>Temps</b>: 1 h = 60 min = 3600 s. 0,5 h = 30 min; 1,25 h = 75 min.</p>`,
      `<p><b>Longitud</b> (×10 cada salto): km, hm, dam, m, dm, cm, mm.</p><p><b>Superficie</b> (×100 cada salto): km², hm² (= ha), dam² (= a), m², dm², cm².</p><p><b>Volumen</b> (×1000 cada salto): m³, dm³, cm³. <b>1 dm³ = 1 l</b>, 1 cm³ = 1 ml, 1 m³ = 1000 l.</p><p><b>Capacidad</b> (×10): kl, hl, dal, l, dl, cl, ml.</p><p><b>Masa</b> (×10): kg, hg, dag, g... 1 t = 1000 kg.</p><p><b>Tiempo</b>: 1 h = 60 min = 3600 s. 0,5 h = 30 min; 1,25 h = 75 min.</p>`) },
  { id: "t_m_stat", topic: "estad", icon: "📊", title: both("Estadística i probabilitat", "Estadística y probabilidad"),
    html: both(`<p><b>Mitjana</b>: suma de totes les dades / nombre de dades.</p><p><b>Mediana</b>: valor central de les dades <u>ordenades</u> (si n'hi ha un nombre parell, mitjana dels dos centrals).</p><p><b>Moda</b>: valor més repetit.</p><p><b>Rang</b>: màxim − mínim.</p><p><b>Probabilitat (Laplace)</b>: P = casos favorables / casos possibles. Sempre entre 0 i 1.</p><p>P(no A) = 1 − P(A). Dos daus: 36 casos possibles; la suma més probable és 7 (6/36).</p>`,
      `<p><b>Media</b>: suma de todos los datos / número de datos.</p><p><b>Mediana</b>: valor central de los datos <u>ordenados</u> (si hay un número par, media de los dos centrales).</p><p><b>Moda</b>: valor más repetido.</p><p><b>Rango</b>: máximo − mínimo.</p><p><b>Probabilidad (Laplace)</b>: P = casos favorables / casos posibles. Siempre entre 0 y 1.</p><p>P(no A) = 1 − P(A). Dos dados: 36 casos posibles; la suma más probable es 7 (6/36).</p>`) },
  { id: "t_m_alg", topic: "alg", icon: "🔣", title: both("Equacions i fraccions", "Ecuaciones y fracciones"),
    html: both(`<p><b>Plantejar una equació</b>: 1) anomena la incògnita (x = ...); 2) tradueix l'enunciat; 3) resol; 4) comprova i respon.</p><p>Nombres consecutius: x, x+1, x+2. Parells consecutius: 2x, 2x+2.</p><p><b>Jerarquia</b>: parèntesis → potències i arrels → multiplicacions i divisions → sumes i restes (d'esquerra a dreta).</p><p><b>Fraccions</b>: per sumar/restar, denominador comú. Per multiplicar, numerador × numerador i denominador × denominador. Per dividir, multiplica en creu. Simplifica sempre.</p><p>La fracció d'una quantitat: 3/5 de 40 = 40 : 5 · 3 = 24.</p>`,
      `<p><b>Plantear una ecuación</b>: 1) nombra la incógnita (x = ...); 2) traduce el enunciado; 3) resuelve; 4) comprueba y responde.</p><p>Números consecutivos: x, x+1, x+2. Pares consecutivos: 2x, 2x+2.</p><p><b>Jerarquía</b>: paréntesis → potencias y raíces → multiplicaciones y divisiones → sumas y restas (de izquierda a derecha).</p><p><b>Fracciones</b>: para sumar/restar, denominador común. Para multiplicar, numerador × numerador y denominador × denominador. Para dividir, multiplica en cruz. Simplifica siempre.</p><p>La fracción de una cantidad: 3/5 de 40 = 40 : 5 · 3 = 24.</p>`) },
];
