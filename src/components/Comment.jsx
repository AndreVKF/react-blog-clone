import { format, formatDistanceToNow } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'

import styles from './Comment.module.css'

import { ThumbsUp, Trash } from 'phosphor-react'
import { Avatar } from './Avatar'
import { useState } from 'react'

export const Comment = ({ user, commentId, userId, comment, likes, publishedAt, setPostComments }) => {
  const [countLikes, setCountLikes] = useState(likes)

  const publishedDate = new Date(publishedAt)
  const publishedDateFormated = format(publishedDate, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBr
  })
  const pusblishedDateRelativeToNow = formatDistanceToNow(publishedDate, {
    locale: ptBr,
    addSuffix: true
  })

  const handleDeleteComment = () => {
    const deleteCommentConfirm = confirm('Tem certeza que deseja deletar o comentário ?')

    if (deleteCommentConfirm) {
      setPostComments((prevComments) => {
        const removeCommentIndex = prevComments.findIndex(comment => comment.id === commentId)
        console.log(removeCommentIndex)
        if (removeCommentIndex > -1) {
          const newCommentList = prevComments.splice(removeCommentIndex, 1)
    
          return newCommentList
        }

        return prevComments
      })
    }
  }

  const handleAddCounts = () => {
    setCountLikes((prevLikeCount) => {
      let newLikeCount = prevLikeCount + 1
      return newLikeCount
    })
  }

  return (
    <div className={styles.comment}>
      <Avatar hasBorder={false} src={user.avatar_url} />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{user.name}</strong>
              <time title={publishedDateFormated} dateTime={publishedDate.toISOString()}>{pusblishedDateRelativeToNow}</time>
            </div>

            {
              userId === user.id && <button title='Deletar comentário' onClick={handleDeleteComment}>
              <Trash size={20} />
            </button>
            }
            

          </header>
          <p>{comment}</p>
        </div>

        <footer>
          <button onClick={handleAddCounts}>
            <ThumbsUp />
            Aplaudir <span>{countLikes}</span>
          </button>
        </footer>

      </div>
    </div>
  )
}
