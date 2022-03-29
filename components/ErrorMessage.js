/* eslint-disable @next/next/no-img-element */
import ShortcutError from './ShortcutError'
import { Box } from './Box'

export default function ErrorMessage({ code }) {
  let title = 'erro: 500'
  let description = "Algo não saiu como o esperado."

  if (code === 404) {
    title = 'erro: 404'
    description = "Parece que essa página não existe."
  }

  return (
    <Box css={{
      textAlign: 'center', margin: '0 auto', maxWidth: '400px',
    }}>
      <h1>{title}</h1>
      <p>{description}</p>
      <img
        style={{ filter: "grayscale(100%)" }}
        src="/static/images/astronaut.png" alt="Ilustração de um astronauta com macbook na mão tentando encontrar o erro" />
      <ShortcutError />
    </Box >
  )
}
