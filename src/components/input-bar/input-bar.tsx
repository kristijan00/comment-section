import React, { useState } from 'react';
import styles from './input-bar.module.css';
import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';

interface Props {
  replyingTo: string;
  createComment: (text: string) => void;
}

const InputBar: React.FC<Props> = props => {
  const [searchText, setSearchText] = useState<string>('');

  const createAndClear = () => {
    props.createComment(searchText);
    setSearchText('');
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.icon}>
        <AddIcon fontSize="large" />
      </div>
      <input placeholder={props.replyingTo ? `Replying to: ${props.replyingTo}` : 'Write a new message'} value={searchText} onChange={e => setSearchText(e.target.value)} type="text" />
      <button onClick={createAndClear}><SendIcon fontSize="small" /> Send message</button>
    </div>
  );
};

export default InputBar;