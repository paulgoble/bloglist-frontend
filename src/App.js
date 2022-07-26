import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [notification, setNotification] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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
    } catch(error) {
      setNotification('error: missing or invalid credentials')
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
  }

  const loginPage = () => (
    <div>
      <h2>log in to continue...</h2>
      <div className="notification">{notification}</div>
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
      <div className="notification">{notification}</div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
      <BlogForm blogs={blogs} 
        setBlogs={setBlogs}
        setNotification={setNotification} />
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
