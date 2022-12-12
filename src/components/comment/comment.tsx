import React, { useState, useEffect } from 'react';
import { CommentModel } from '../../models/comment-model';
import styles from './comment.module.css';

interface Props {
  comment: CommentModel;
  replies: CommentModel[];
  selectedComment: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

const Comment: React.FC<Props> = props => {
  const [comment, setComment] = useState<CommentModel>();

  useEffect(() => {
    if (props.comment !== undefined) {
      setComment(props.comment);
    }
  }, []);

  return (
    <>
      {
        comment ?
          <>
            {
              props.replies && props.replies.length > 0 ?
                <h2 className={styles.date}>{new Date(comment.timestamp).toString().slice(0, 10)}</h2>
                :
                null
            }
            <div className={`${styles.wrap} ${comment.parent_id && comment.parent_id.length > 0 ? styles.subComment : ''}`}>
              <div className={styles.authorPhoto}>
                <img src={comment.author.picture} alt="comment-creator" />
              </div>
              <div className={styles.comment}>
                <div className={styles.commentContent}>
                  <h2>{comment.author.name}</h2>
                  <p>{comment.text}</p>
                </div>
                <div className={styles.commentOptions}>
                  <span className={styles.timestamp}>{new Date(comment.timestamp).toLocaleTimeString('hr').slice(0, 5)}</span>
                  {!comment.parent_id ?
                    <span onClick={props.onClick} className={`${styles.replyButton} ${props.selectedComment ? styles.selectedReply : ''}`}>Reply {props.replies.length > 0 ? `(${props.replies.length})` : ''}</span>
                    :
                    null
                  }
                </div>
              </div>
            </div>
            {
              props.replies && props.replies.length > 0 ?
                props.replies.map(item => <Comment key={item.id} comment={item} replies={[]} selectedComment={false} />)
                :
                null
            }
          </>
          :
          null
      }
    </>
  );
};

export default Comment;