import { useReducer, useRef } from 'react'
import reducer, { initState } from './reducer'
import { setJob, addJob, deleteJob } from './actions'
import logger from './logger'

//4) Dispatch

function TodoApp() {

    var [state, dispatch] = useReducer(logger(reducer), initState)

    const { job, jobs } = state

    const handleSubmit = () => {
        dispatch(addJob(job))
        dispatch(setJob(''))
        inputRef.current.focus()
    }

    const inputRef = useRef()

    return (
        <div style={{ padding: '10px 32px' }}>
            <h1>Todo</h1>

            <input
                ref={inputRef}
                value={job}
                placeholder="Enter todo..."
                onChange={e => {
                    dispatch(setJob(e.target.value))
                }}
            />

            <button
                onClick={handleSubmit}
            >
                Add
            </button>

            <ul>
                {jobs.map((job, index) => {
                    return <li key={index}>
                        {job}
                        <span onClick={() => dispatch(deleteJob(index))}>&times;</span>
                    </li>
                })}
            </ul>
        </div>
    )
}

export default TodoApp