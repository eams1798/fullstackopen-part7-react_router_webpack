import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks'

const CreateNew = (props) => {
  const content = useField('text', 'content')
  const author = useField('text', 'author')
  const info = useField('text', 'info')
  

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()

    props.addNew({
      content: content.props.value,
      author: author.props.value,
      info: info.props.value,
      votes: 0
    })

    navigate('/')
  }

  const resetFields = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  return (
    <div>
      <h2>Create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Content
          <input {...content.props} />
        </div>
        <div>
          Author
          <input {...author.props} />
        </div>
        <div>
          Url for more info
          <input {...info.props} />
        </div>
        <button>Create</button>
        <button type="button" onClick={resetFields}>Reset</button>
      </form>
    </div>
  )
}

CreateNew.propTypes = {
  addNew: PropTypes.func
}

export default CreateNew;