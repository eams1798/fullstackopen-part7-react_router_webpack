import { AnecdotePT } from '../PropTypes'
import { useContext } from 'react'
import { Context } from './Context'

const Anecdote = ({ anecdote }) => {
  const [, setAnecdotes] = useContext(Context)
  const vote = () => {
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes( anecdotes => anecdotes.map(a => a.id === anecdote.id ? voted : a))
  }
  const title = `${anecdote.content} by ` + (anecdote.author ? `${anecdote.author}` : 'unknown author')
  const moreInfo = anecdote.info ? `For more info see ${anecdote.info}`: ''

  return (
    <div>
      <h2>{title}</h2>
      <p>Has {anecdote.votes} votes</p><button onClick={vote}>Vote</button>
      <p>{moreInfo}</p>
    </div>
  )
}

Anecdote.propTypes = {
  anecdote: AnecdotePT
}

export default Anecdote