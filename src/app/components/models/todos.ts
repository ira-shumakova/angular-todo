export interface ITodo {
    title: string,
    isCompleted: boolean,
}

export interface ITodoWithId extends ITodo {
    id: number;
}