import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs, setNotification }) => {
  const [formHidden, setFormHidden] = useState(true)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService
        .postNewBlog({
          title, author, url
        })
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs([...blogs, newBlog])
      toggleForm()
      setNotification(`a new blog: ${newBlog.title} was added to the list`)
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    } catch(error) {
      setNotification('error: new blogs must have a title and a valid url')
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const formStyles = {

  }

  const toggleForm = () => {
    setFormHidden(!formHidden)
  }

  if (formHidden) {
    return (
      <button onClick={toggleForm}>Add a New Blog</button>
    )
  }

  return (
    <div>
      <h2>add a new blog</h2>
      <form style={formStyles} onSubmit={handleSubmit}>
        <div>title:
          <input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>author:
          <input
            type="text"
            value={author}
            name="title"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>url:
          <input
            type="text"
            value={url}

            name="title"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">add blog</button>
        <button onClick={toggleForm}>cancel</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  blogs: PropTypes.array.isRequired,
  setBlogs: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired
}

export default BlogForm