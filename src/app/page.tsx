'use client';

import styles from  './page.module.css';

import { useState } from 'react';
import { createWord, deleteWord, searchWords, getAllWords, updateWord } from '../app/services/api';
import { Word } from './types/dictionary';

export default function Page() {
  return (
    <div className={styles.main}>
      <h2>comp_dic</h2>
      <SearchComponent />
    </div>
  );
}

function SearchComponent() {

  const [searchTerm, setSearchTerm] = useState('filter');
  const [words, setWords] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    const response = await searchWords(searchTerm);
    if (response.data.error) {
      setError(response.data.error.message)
    } else {
      setWords(response.data.data);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
    handleSearch();
  }

  const handleDelete = async (id: number) => {
    await deleteWord(id);
    handleSearch(); // Refresh the list after deletion
  };

  const handleCreate = async () => {
    const newWord = { id: 0, chinese: '新', reading: 'xīn', english: 'new' };
    await createWord(newWord);
    handleSearch(); // Refresh the list after adding new word
  };

  const handleClear = () => {
    setSearchTerm('');
    setWords([]);
  };

  const handleUpdate =async (word: Word) => {
    await updateWord(word);
    handleSearch(); // Refresh the list after adding new word
  }

  return (
    <div className={styles.dictionary}>
      <input
        className={styles.input}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search words...'
        onKeyDown={handleKeyDown}
      />
      <div className={styles.buttons}>
        <button className={styles.button} onClick={handleSearch}>search</button>
        <button disabled className={styles.button} onClick={handleCreate}>add</button>
        <button className={styles.button} onClick={handleClear}>clear</button>
      </div>
      <div className={styles.words}>
      {words.map((word: Word) => (
        <div key={word.id} className={styles.word}>
          <div>{word.chinese}</div>
          <div>{word.reading}</div>
          <div>{word.english}</div>
          <div className={styles.word_buttons}>
            <button className={styles.button} onClick={() => handleUpdate(word)}>update</button>
            <button className={styles.button} disabled onClick={() => handleDelete(word.id)}>delete</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
