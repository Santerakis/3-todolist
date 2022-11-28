import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    callBack: (title: string) => void
}


export function Todolist(props: PropsType) {
    let [title, setTitle] = useState('')

    const onClickAddHandler = () => {
        props.callBack(title)
        setTitle('')
    }
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onClickAddHandler()
        }
    }
    const onClickAllHandler = () => {
        props.changeFilter("all")
    }
    const onClickActiveHandler = () => {
        props.changeFilter("active")
    }
    const onClickCompletedClickHandler = () => {
        props.changeFilter("completed")
    }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyDownHandler}/>
            <button onClick={onClickAddHandler}>+</button>
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id)
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={onClickHandler}>x</button>
                        </li>)
                })
            }
        </ul>
        <div>
            <button onClick={onClickAllHandler}>
                All
            </button>
            <button onClick={onClickActiveHandler}>
                Active
            </button>
            <button onClick={onClickCompletedClickHandler}>
                Completed
            </button>
        </div>
    </div>
}
