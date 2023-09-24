import { useState } from 'react'
import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import { Avatar } from './Avatar'
import { Comment } from './Comment'

import styles from './Post.module.css'

import users from '../database/users.json'
import comments from '../database/comments.json'
import uuid from 'react-uuid'

export const Post = ({ post_id, user_id, content, published_at }) => {

  const [postComments, setPostComments] = useState(comments.filter(comments => comments.post_id === post_id))
  const [newPostComment, setNewPostComment] = useState('')

  const userDataIndex = users.findIndex(user => user.id === user_id)
  const userData = users[userDataIndex]

  const publishedDate = new Date(published_at)
  const publishedDateFormated = format(publishedDate, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr
  })
  const pusblishedDateRelativeToNow = formatDistanceToNow(publishedDate, {
    locale: ptBr,
    addSuffix: true
  })

  const handleSubmitComment = (event) => {
    event.preventDefault()

    const newComment = {
      id: uuid(),
      post_id: post_id,
      user_id: 2,
      comment: newPostComment,
      likes: 0,
      published_at: new Date().toISOString()
    }

    setPostComments((prev) => {
      const newPostComments = [...prev]
      newPostComments.push(newComment)

      return newPostComments
    })

    setNewPostComment('')

  }

  const handleSetNewComment = (event) => {
    setNewPostComment(event.target.value)
  }

  const isNewCommentEmpty = newPostComment.length === 0

  return (
    <article className={styles.post}>

      <header>
        <div className={styles.author}>
          <Avatar className={styles.avatar} src={userData.avatar_url} />

          <div className={styles.authorInfo}>
            <strong>{userData.name}</strong>
            <span>{userData.role}</span>
          </div>

          <div className={styles.time}>
            <time title={publishedDateFormated} dateTime={publishedDate.toISOString()}>{pusblishedDateRelativeToNow}</time>
          </div>

        </div>
      </header>

      <div className={styles.content}>
        {content.map((item, idx) => {
          if (item.type === 'paragraph') {
            return <p key={idx}>{item.content}</p>
          } else if (item.type === 'link') {
            return <p key={idx}><a href="#">{item.content}</a></p>
          }
        })}
      </div>

      <form className={styles.commentForm} onSubmit={handleSubmitComment}>
        <strong>Deixe seu feedback</strong>
        <textarea
          placeholder='Deixe um comentário'
          value={newPostComment}
          onChange={handleSetNewComment}
        />

        <footer>
          <button type='submit' disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {postComments.map((postComment) => (
          <Comment
            key={postComment.id}
            user={users.find(user => user.id === postComment.user_id)}
            commentId={postComment.id}
            userId={2}
            comment={postComment.comment}
            likes={postComment.likes}
            publishedAt={postComment.published_at}
            setPostComments={setPostComments}
          />
        ))}

      </div>

    </article>
  )
}
