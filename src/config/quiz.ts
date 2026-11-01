/**
 * Quiz de parejas.
 * Cambia preguntas, opciones y mensajes aquí.
 * En una pregunta normal, `correctId` debe coincidir con el `id` de una opción.
 * La pregunta especial no tiene respuesta correcta: el mensaje aparece solo cuando ya eligió todas.
 */

export type QuizOption = {
  id: string
  label: string
}

type QuizQuestionBase = {
  id: string
  prompt: string
  options: QuizOption[]
}

export type StandardQuizQuestion = QuizQuestionBase & {
  special?: false
  correctId: string
  success: string
  wrong: string
}

export type SpecialQuizQuestion = QuizQuestionBase & {
  special: true
  pending: string
  revealLead: string
  revealWord: string
}

export type QuizQuestion = StandardQuizQuestion | SpecialQuizQuestion

export const quizCopy = {
  title: '¿Qué tanto sabes de nosotros?',
  description:
    'Ahora vamos a poner a prueba cuánto conoces de nuestra pequeña historia. No te preocupes, aquí no hay presión... aunque espero que prestes atención, mi amor.',
  start: '¡Vamos a jugar!',
  next: 'Seguir',
  finale:
    'Parece que conoces bastante bien nuestra historia... pero todavía hay algo que quiero preguntarte.',
  finaleButton: 'Tengo una última pregunta para ti...',
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 'equipo',
    prompt: '¿De qué equipo somos?',
    correctId: 'barcelona',
    success: '¡Así me gusta, mi amor!',
    wrong: 'Jajaja, esa camiseta no es la nuestra. El corazón ya lo sabía.',
    options: [
      { id: 'barcelona', label: 'F.C. Barcelona' },
      { id: 'madrid', label: 'Real Madrid' },
      { id: 'atletico', label: 'Atlético de Madrid' },
      { id: 'city', label: 'Manchester City' },
    ],
  },
  {
    id: 'clima',
    prompt: '¿Team frío o team calor?',
    correctId: 'frio',
    success: 'Frío, siempre. Pásame la manta y quédate cerquita.',
    wrong: 'Casi... pero tú y yo somos de manta, no de solazo.',
    options: [
      { id: 'frio', label: 'Team frío' },
      { id: 'calor', label: 'Team calor' },
      { id: 'depende', label: 'Depende del día' },
      { id: 'ninguno', label: 'Ninguno de los dos' },
    ],
  },
  {
    id: 'hija',
    prompt: '¿Cómo se llamará nuestra futura hija?',
    correctId: 'alana',
    success: 'Alana. Ya me la imagino con tu sonrisa.',
    wrong: 'Lindo nombre... pero el nuestro ya lo elegimos hace tiempo.',
    options: [
      { id: 'alana', label: 'Alana' },
      { id: 'valentina', label: 'Valentina' },
      { id: 'isabella', label: 'Isabella' },
      { id: 'luciana', label: 'Luciana' },
    ],
  },
  {
    id: 'luke',
    prompt: 'Luke es...',
    correctId: 'spiderman',
    success: 'Spider-Man. Ese soy yo.',
    wrong: 'Buen héroe, mi vida. Yo me balanceo por otro lado.',
    options: [
      { id: 'batman', label: 'Batman' },
      { id: 'ironman', label: 'Iron Man' },
      { id: 'spiderman', label: 'Spider-Man' },
      { id: 'superman', label: 'Superman' },
    ],
  },
  {
    id: 'collar',
    prompt: '¿Cómo se llama el collar que te regalé?',
    correctId: 'eterno',
    success: 'Corazón Eterno. Me encanta que te acuerdes.',
    wrong: 'Se parece, pero ese collar tiene otro nombre. Igual me derrite que lo intentes.',
    options: [
      { id: 'eterno', label: 'Corazón Eterno' },
      { id: 'infinito', label: 'Amor Infinito' },
      { id: 'favorita', label: 'Mi persona favorita' },
      { id: 'siempre', label: 'Siempre juntos' },
    ],
  },
  {
    id: 'amor',
    prompt: 'Para mí tú eres...',
    special: true,
    pending: 'Ninguna de esas. Sigue eligiendo.',
    revealLead: '¡Te equivocaste! Para mí tú eres...',
    revealWord: 'TODO MI AMOR',
    options: [
      { id: 'debilidad', label: 'Mi debilidad.' },
      { id: 'casualidad', label: 'Mi casualidad favorita.' },
      { id: 'persona', label: 'Mi persona favorita.' },
      { id: 'companera', label: 'Mi compañera de aventuras.' },
    ],
  },
]

export function quizProgressLabel(current: number, total: number) {
  return `Pregunta ${current} de ${total}`
}
