/**
 * Detector de mentiras y cierre de la experiencia.
 * Todas las afirmaciones se revelan como verdaderas.
 */

export const detectorCopy = {
  title: 'Ha llegado el momento de descubrir la verdad...',
  description:
    'Después de comprobar cuánto sabes de nosotros, quiero hacerte unas preguntas. Pero cuidado... este detector no perdona las mentiras.',
  start: 'Iniciar detector',
  trueLabel: 'Verdadero',
  falseLabel: 'Falso',
  scanning: 'Analizando...',
  lie: '¡Mentira detectada! Aquí no puedes engañar al detector.',
  truth: 'Verdadero',
  next: 'Seguir',
  finaleKicker: 'RESULTADO FINAL',
  finaleTitle: '100% ENAMORADO',
  finaleMessage: 'Creo que el detector ha dejado bastante claro lo que siento por ti...',
  continue: 'Continuar',
}

export type Statement = {
  id: string
  text: string
  reaction: string
}

export const statements: Statement[] = [
  {
    id: 'piensa',
    text: 'Luke piensa en ti incluso cuando está ocupado.',
    reaction: 'El detector no ha tardado ni un segundo en confirmar esto.',
  },
  {
    id: 'besos',
    text: 'Luke tiene debilidad por tus besos.',
    reaction: 'Se ha detectado una debilidad bastante evidente...',
  },
  {
    id: 'abrazos',
    text: 'Luke podría pasar horas abrazándote sin aburrirse.',
    reaction: 'Resultado confirmado. No parece que quiera soltarte nunca.',
  },
  {
    id: 'momentos',
    text: 'Luke se imagina muchísimos momentos a tu lado.',
    reaction: 'El detector está empezando a sospechar que esto va muy en serio.',
  },
  {
    id: 'amor',
    text: 'Luke está completamente enamorado de ti.',
    reaction: '¡ALERTA! Se ha detectado un nivel de enamoramiento extremadamente alto.',
  },
]

export const proposalCopy = {
  lines: [
    'Bueno... parece que hemos llegado al final de esta pequeña aventura.',
    'Pero todavía hay una pregunta muy importante que tengo por hacerte...',
    '¿Recuerdas que ayer te dije que tenía algo que decirte, pero que todavía no podía hacerlo?',
    'Pues... ha llegado el momento.',
    'No quiero seguir dejando esta pregunta para después. Hay algo que tengo muy claro: quiero seguir construyendo esta historia contigo.',
  ],
}

export function detectorProgressLabel(current: number, total: number) {
  return `Pregunta ${current} de ${total}`
}
