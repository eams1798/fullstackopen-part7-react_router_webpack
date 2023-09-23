import PropTypes from 'prop-types'
import { AnecdotePT } from '../PropTypes'
import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => (
        <Link key={anecdote.id} to={`/anecdotes/${anecdote.id}`}>
          <li>{anecdote.content}</li>
        </Link>
        ))}
      </ul>
    </div>
  )
}

AnecdoteList.propTypes = {
  anecdotes: PropTypes.arrayOf(AnecdotePT).isRequired
}

export default AnecdoteList