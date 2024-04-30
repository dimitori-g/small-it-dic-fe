import React from 'react'
import { Word } from './types/dictionary'


export function WordCard({id, chinese, reading, english}: Word) {
    return (
    <div key={id}>
    {chinese} ({reading}): {english}
    {/* <button onClick={() => handleDelete(id)}>delete</button> */}
    </div>
    )
}