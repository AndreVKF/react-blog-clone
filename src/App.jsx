import { Header } from "./components/Header"
import { Sidebar } from "./components/Sidebar"
import { Post } from "./components/Post"

import styles from './App.module.css'

import posts from './database/posts.json'

function App() {

  return (
    <div>
      <Header />
      <div className={styles.wrapper}>
        <Sidebar />
        <div>
          {posts.map((post) => (
            <Post
              key={post.id}
              post_id={post.id}
              user_id={post.user_id}
              content={post.content}
              published_at={post.published_at}
            />
          ))}

        </div>
      </div>
    </div>
  )
}

export default App
