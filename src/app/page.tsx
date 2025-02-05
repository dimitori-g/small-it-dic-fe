'use client';

import styles from  './page.module.css';

import { useEffect, useState } from 'react';
import { createWord, deleteWord, searchWords, getAllWords, updateWord, getRandomWords } from '../app/services/api';
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

  const [searchTerm, setSearchTerm] = useState('');
  const [words, setWords] = useState<Word[]>([]);
  const [updWord, setUpdWord] = useState<Word>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    handleSearchRandom();
  }, []);

  const handleSearch = async () => {
    setWords([]);
    setError('');
    setLoading(true);
    const response = await searchWords(searchTerm);
    if (response.data.error) {
      setError(response.data.error.message);
      setLoading(false);
    } else {
      setWords(response.data.data);
      setLoading(false);
    }
  };

  const handleSearchRandom = async () => {
    setWords([]);
    setError('');
    setLoading(true);
    const response = await getRandomWords(4);
    if (response.data.error) {
      setError(response.data.error.message);
      setLoading(false);
    } else {
      setWords(response.data.data);
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing || e.key !== 'Enter') return;
    handleSearch();
  }

  const handleDelete = async (id: number) => {
    await deleteWord(id);
    handleSearch();
  };

  const handleCreate = async (word: Word) => {
    await createWord(word);
    setUpdWord(undefined);
    handleSearch();
  };

  const handleClear = () => {
    setSearchTerm('');
    setUpdWord(undefined);
    setWords([]);
  };

  const handleUpdate =async (word: Word) => {
    await updateWord(word);
    setWords([word]);
    setUpdWord(undefined);
  }

  if (updWord) {
    return (
      <div className={styles.dictionary}>
        <input
          className={styles.input}
          value={updWord.chinese}
          onChange={(e) => setUpdWord({...updWord, chinese: e.target.value})}
          placeholder='Chinese...'
        />
        <input
          className={styles.input}
          value={updWord.reading}
          onChange={(e) => setUpdWord({...updWord, reading: e.target.value})}
          placeholder='Reading...'
        />
        <input
          className={styles.input}
          value={updWord.english}
          onChange={(e) => setUpdWord({...updWord, english: e.target.value})}
          placeholder='English...'
        />
        <div className={styles.word_buttons}>
          {updWord.id !== 0 ?
            <button className={styles.button} onClick={() => handleUpdate(updWord)}>update</button>:
            <button className={styles.button} onClick={() => handleCreate(updWord)}>create</button>
          }
          <button className={styles.button} onClick={() => setUpdWord(undefined)}>cancel</button>
        </div>
      </div>
    )
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
        <button className={styles.button} onClick={() => setUpdWord({id:0, chinese:'', reading:'', english:''})}>create</button>
        <button className={styles.button} onClick={handleClear}>clear</button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {loading && <div className={styles.loading}>Loading...</div>}
      <div className={styles.words}>
      {words.map((word: Word) => (
        <div key={word.id} className={styles.word}>
          <div>{word.chinese}</div>
          <div>{word.reading}</div>
          <div>{word.english}</div>
          <div className={styles.word_buttons}>
            <button className={styles.button} onClick={() => setUpdWord(word)}>update</button>
            <button className={styles.button} onClick={() => handleDelete(word.id)}>delete</button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}
