import React, { useEffect, useState } from 'react';
import styles from './comments.module.css';
import CommentsData from '../data/comments.json';
import { CommentModel } from '../models/comment-model';
import Comment from '../components/comment/comment';
import InputBar from '../components/input-bar/input-bar';

const users = [{ id: '7', author: 'Martin Norac' }, { id: '8', author: 'Josip Farkas' }, { id: '9', author: 'Luka Pivac' }];

const Comments: React.FC = () => {
  const [comments, setComments] = useState<CommentModel[]>([]);
  // parent comments are the root comments
  const parentComments = comments.filter(comment => !comment.parent_id);
  // Selected comment represents the comment user wants to reply to
  const [selectedComment, setSelectedComment] = useState<string>('');

  // Find replies for a specific comment and sort them based on
  // the time they were posted
  const findReplies = (commentId: string) => {
    return comments.filter(comment => comment.parent_id === commentId).sort((a, b) =>
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  };

  const createComment = (text: string) => {
    if (text.length > 0) {
      const comment = { id: String(Math.floor(Math.random() * 10000)), parent_id: `${selectedComment ? selectedComment : ''}`, author: { name: selectedComment ? users[1].author : users[2].author, picture: '/assets/nerd.png' }, text: text, timestamp: new Date().getTime() };
      setComments(curr => [...curr, comment]);
      setSelectedComment('');
    }
  };

  const findParentCommentName = () => {
    return parentComments.find(comment => comment.id === selectedComment)?.author.name;
  };

  useEffect(() => {
    setComments(CommentsData.data.comments || []);
  }, []);

  return (
    <div className={styles.wrap}>
      <div className={styles.commentsContainer}>
        {
          parentComments.length > 0 ?
            parentComments.map((item, index) => <Comment replies={findReplies(item.id)} selectedComment={selectedComment === item.id}
              onClick={() => setSelectedComment(curr => curr === item.id ? '' : item.id)} key={item.id + index} comment={item} />)
            :
            <h2 className={styles.noCommentsTitle}>No comments to display at the moment.</h2>
        }
        <div className={styles.inputBarContainer}>
          <InputBar createComment={createComment} replyingTo={findParentCommentName() || ''} />
        </div>
      </div>
    </div>
  );
};

export default Comments;