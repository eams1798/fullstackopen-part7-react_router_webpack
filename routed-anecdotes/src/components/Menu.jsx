import { Routes, Route, Link, useMatch } from 'react-router-dom'
import About from './About'
import Anecdote from './Anecdote'
import AnecdoteList from './AnecdoteList'
import CreateNew from './CreateNew'
import NotFound from './NotFound'

import { useContext } from 'react'
import { Context } from './Context'

const Menu = () => {
  const [anecdotes, setAnecdotes] = useContext(Context)
  const match = useMatch('/anecdotes/:id')
  const anecdote = match ? anecdotes.find(a => a.id === Number(match.params.id)) : null
  
  const padding = {
    paddingRight: 5
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  return (
    <div>
      <div>
        <Link style={padding} to="/">Anecdotes</Link>
        <Link style={padding} to="/create">Create new</Link>
        <Link style={padding} to="/about">About</Link>
      </div>
      <Routes>
        <Route path="/anecdotes/:id"
          element={anecdote?
            <Anecdote anecdote={anecdote} /> :
            <NotFound />} />
        <Route path="/"
          element={<AnecdoteList anecdotes={anecdotes}/>} />
        <Route path="/create"
          element={<CreateNew addNew={addNew}/>} />
        <Route path="/about"
          element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default Menu