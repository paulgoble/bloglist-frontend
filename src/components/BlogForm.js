import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ submitBlog }) => {
  const [formHidden, setFormHidden] = useState(true)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const cancelForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
    toggleForm()
  }

  const handleSubmit = (blog) => {
    submitBlog(blog)
    setTitle('')
    setAuthor('')
    setUrl('')
    toggleForm()
  }

  const toggleForm = () => {
    setFormHidden(!formHidden)
  }

  if (formHidden) {
    return (
      <button id="add-blog-button" onClick={toggleForm}>Add a New Blog</button>
    )
  }

  return (
    <div>
      <h2>add a new blog</h2>
      <form id="blog-form" onSubmit={() => handleSubmit({ title, author, url })} >
        <div>title:
          <input
            type="text"
            value={title}
            name="title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>author:
          <input
            type="text"
            value={author}
            name="author"
            id="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>url:
          <input
            type="text"
            value={url}
            name="url"
            id="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submit-blog-button" type="submit">add blog</button>
        <button onClick={cancelForm}>cancel</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  submitBlog: PropTypes.func.isRequired
}

export default BlogForm