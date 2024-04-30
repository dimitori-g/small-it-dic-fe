export type WordResponse = {
    data: Word[],
    meta:{
        timestamp: string
    },
    error: {
        status: number,
        message: string,
        path: string
    }
};

export type Word = {
    id: number,
    chinese: string,
    reading: string,
    english: string
};