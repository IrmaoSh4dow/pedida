/**
 * Textos de la página.
 *
 * Para personalizar el minijuego, edita cada oración:
 * - `text` es la frase completa, tal como debe leerse al acertar.
 * - `hidden` es el fragmento que se oculta. Tiene que aparecer tal cual dentro de `text`.
 * - `answers` son las respuestas válidas. Puedes añadir variantes.
 *   No importan mayúsculas, acentos ni signos de puntuación.
 * - `success` es la reacción cuando acierta.
 */

export type Sentence = {
  id: string
  text: string
  hidden: string
  answers: string[]
  success: string
}

export const welcome = {
  whisper: 'abierto con cariño',
  title: 'Bienvenida al inicio\nde nuestra aventura',
  subtitle:
    'Un pequeño espacio creado especialmente para ti. Entra despacito: aquí empieza lo nuestro.',
  button: 'Comenzar nuestra historia',
}

export const gameCopy = {
  kicker: 'un jueguito entre nosotros',
  lead: 'Completa lo que falta. Sin prisa y sin nota: solo tú, yo y las frases que ya son nuestras.',
  fieldLabel: 'Tu respuesta',
  placeholder: 'escribe aquí',
  check: 'A ver',
  next: 'Seguir',
  finale: 'Quiero mi celebración',
}

export const wrongReplies = [
  'Casi, mi amor. Otra vez, sin ninguna prisa.',
  'Mmm, no era esa... pero me encanta cómo lo intentas.',
  'Jajaja, esa no. Te dejo intentarlo de nuevo, con beso incluido.',
  'Uy, cerquita. El corazón dice que pruebes otra vez.',
  'Aquí no se reprueba, se quiere. Vuelve a intentarlo.',
  'No era esa, y aun así te quedó bonita.',
  'Casi la rozaste. Una más, despacito.',
  'Esa se fue de largo. Inténtalo otra vez, que yo te espero.',
  'Jiji, no. Pero me derrite que lo intentes.',
  'Por ahí no era. Dale, otra oportunidad.',
  'Uy, esa no estaba en el recuerdo. Prueba de nuevo.',
  'Cerca, cerca. El corazón ya te está aplaudiendo.',
  'No, mi vida. Pero te queda precioso equivocarte.',
  'Esa no... y está bien. Aquí no hay prisa.',
  'Mmm, se parece, pero no es. Otra vez.',
  'Te faltó un poquito. Yo sigo aquí.',
  'Jajaja, esa fue creativa. La de siempre, anda.',
  'No era, pero me hiciste sonreír igual.',
  'Casi, casi. Respira y vuelve a escribirla.',
  'Esa no cuadra, mi amor. Tienes otro intento, obvio.',
]

export const comfortReplies = [
  'Tranquila, mi vida. Está en la punta de la lengua, y yo no me voy a ningún lado.',
  'No pasa nada. Esta es de las nuestras: la tienes guardada en algún rinconcito.',
  'Tómate tu tiempo. Yo no me muevo de aquí.',
  'Si se esconde, que se esconda. Tú y yo la encontramos.',
  'Tranquila. No es un examen, es un secreto entre los dos.',
  'Está bien no dar con ella a la primera. Quédate un ratito más conmigo.',
  'Respira, mi amor. La palabra sigue ahí, esperándote.',
  'No te apures. Prefiero mil intentos contigo que uno solo.',
]

export const celebration = {
  kicker: 'nuestra aventura',
  title: 'Sabía que te acordarías',
  message:
    'Cinco frases nuestras, cinco sonrisas, y esto apenas empieza. Gracias por jugar conmigo.',
  closing: 'Te quiero.',
  continue: 'Sigamos',
}

export const sentences: Sentence[] = [
  {
    id: 'gusto',
    text: 'Me gustas, ¿te gusto?',
    hidden: 'gusto',
    answers: ['gusto'],
    success:
      'Sí. Te gusto. Y si hace falta, lo repito bajito todas las veces que quieras.',
  },
  {
    id: 'chim',
    text: 'No se dice sí, se dice chim',
    hidden: 'chim',
    answers: ['chim'],
    success: 'Chim. Lo sabía. Contigo hasta un sí se dice más bonito.',
  },
  {
    id: 'neno',
    text: '¿Me entiendes o no me entiendes neno?',
    hidden: 'neno',
    answers: ['neno'],
    success: 'Neno. Claro que te entiendo. A veces hasta antes de que hables.',
  },
  {
    id: 'pituka',
    text: 'Eres una pituka',
    hidden: 'pituka',
    answers: ['pituka'],
    success: 'Pituka, confirmadísimo. La más pituka de todas.',
  },
  {
    id: 'palizas',
    text: '1, 2, 3... las 3 palizas',
    hidden: 'palizas',
    answers: ['palizas'],
    success: 'Las tres palizas, anotadas. Y aún así aquí sigo, feliz.',
  },
]

export function progressLabel(current: number, total: number) {
  return `Recuerdo ${current} de ${total}`
}

export function splitSentence(sentence: Sentence) {
  const index = sentence.text.indexOf(sentence.hidden)

  if (index === -1) {
    throw new Error(
      `No encuentro «${sentence.hidden}» dentro de: ${sentence.text}`,
    )
  }

  return {
    before: sentence.text.slice(0, index),
    after: sentence.text.slice(index + sentence.hidden.length),
  }
}
