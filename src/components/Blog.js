import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, username, updateBlogLikes, removeBlog }) => {
  const [blogHidden, setBlogHidden] = useState(true)

  const toggleBlog = () => {
    setBlogHidden(!blogHidden)
  }

  const blogStyles = {
    listStyleType: 'none',
    borderRadius: 4,
    border: '1px solid gray',
    marginTop: 2,
    marginLeft: 3,
    width: 200,
    padding: 4
  }

  const buttonStyle = {
    backgroundColor:'lightgray',
    borderRadius: 3,
    border: '1px solid gray',
    margin: 2,
    marginLeft: 3,
    padding: 3
  }

  const showRemoveButton = () => (
    <li><button style={buttonStyle} onClick={() => removeBlog(blog)}>remove</button></li>
  )

  const blogDetails = () => (
    <ul style={blogStyles}>
      <li><b>{blog.url}</b></li>
      <li>likes: {blog.likes}<button onClick={() => updateBlogLikes(blog)}>like</button></li>
      <li>user: {JSON.stringify(blog.user.name)}</li>
      {username !== blog.user.name ? null : showRemoveButton()}
    </ul>
  )

  return (
    <div style={{ margin: 3 }}>
      <em>{blog.title}</em> by {blog.author}
      <button onClick={toggleBlog}>{blogHidden ? 'view' : 'hide'}</button>
      {blogHidden ? null : blogDetails()}
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  updateBlogLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired
}

export default Blog