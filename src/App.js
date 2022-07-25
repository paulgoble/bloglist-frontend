import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const userIsLoggedIn = window.localStorage.getItem('userObject')
    if (userIsLoggedIn) {
      const user = JSON.parse(userIsLoggedIn)
      blogService.setToken(user.token)
      setUser(user)
      
    }
  }, [])
  
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'userObject', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(err) {
      alert(err)
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.postNewBlog({
        title, author, url
      })
      console.log(newBlog)
      setTitle('')
      setAuthor('')
      setUrl('')
      setBlogs([...blogs, newBlog])
    } catch(err) {
      alert(err)
    }
  }

  const loginPage = () => (
    <div>
      <h2>log in to continue...</h2>
      <form onSubmit={handleLogin}>
        <div>username:
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>password:
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogsPage = () => (
    <div>
      <h4>logged in as: {user.name} <button onClick={handleLogout}>log out</button></h4>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <h2>add a new blog</h2>
      <form onSubmit={handleSubmit}>
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
      </form>
    </div>
  )

  return (
    <div>
      {user === null ?
        loginPage() :     
        blogsPage()
      }
    </div>
  )
}

export default App
