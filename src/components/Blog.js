import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, removeBlog, username, updateBlogLikes }) => {
  const [blogHidden, setBlogHidden] = useState(true)

  const toggleBlog = () => {
    setBlogHidden(!blogHidden)
  }

  const blogStyles = {
    listStyleType: 'none',
    borderBottomRightRadius: 16,
    border: '1px solid gray',
    marginTop: '0.2em',
    marginBottom: 0,
    marginLeft: '0.5em',
    width: 200,
    padding: 5
  }

  const buttonStyle = {
    backgroundColor:'white',
    borderRadius: 3,
    border: '1px solid gray',
    margin: 2,
    marginLeft: 0,
    padding: 3
  }

  const showRemoveButton = () => (
    <li><button data-cy="remove-button" style={buttonStyle} onClick={() => removeBlog(blog)}>remove</button></li>
  )

  const blogDetails = () => (
    <ul className='blog-details' style={blogStyles}>
      <li><b>{blog.url}</b></li>
      <li>likes: {blog.likes}<button data-cy="like-button" onClick={() => updateBlogLikes(blog)}>like</button></li>
      <li>uploaded by user: {JSON.stringify(blog.user.name)}</li>
      {username !== blog.user.name ? null : showRemoveButton()}
    </ul>
  )

  return (
    <div className='blog' style={{ margin: 3 }}>
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