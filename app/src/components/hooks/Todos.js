import React, { useState, useReducer } from 'react'
import uuid from 'uuid/v4'

const initialTodos = [
  {
    id: uuid(),
    task: 'React',
    complete: true
  },
  {
    id: uuid(),
    task: 'Angular',
    complete: true
  },
  {
    id: uuid(),
    task: 'Vue.js',
    complete: false
  }
]

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return 'ALL'
    case 'SHOW_COMPLETE':
      return 'COMPLETE'
    case 'SHOW_INCOMPLETE':
      return 'INCOMPLETE'
    default:
      throw new Error()
  }
}

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: true }
        } else {
          return todo
        }
      })
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return { ...todo, complete: false }
        } else {
          return todo
        }
      })
    case 'ADD_TODO':
      return state.concat({
        task: action.task,
        id: action.id,
        complete: false
      })
    default:
      throw new Error()
  }
}

const Todos = () => {
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos)
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')
  // const [todos, setTodos] = useState(initialTodos)
  const [task, setTask] = useState('')

  // -- useState
  const handleChangeInput = event => {
    setTask(event.target.value)
  }

  const handleSubmit = event => {
    if (task) {
      // setTodos(todos.concat({ id: uuid(), task, complete: false }))
      dispatchTodos({ type: 'ADD_TODO', task, id: uuid() })
    }
    setTask('')
    event.preventDefault()
  }

  /*
  const handleChangeCheckbox = (event, id) => {
    console.log(event.target.value)
    console.log(id)
    setTodos(
      todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete }
        } else {
          return todo
        }
      })
    )
  }
  */

  const handleChangeCheckbox = todo => {
    dispatchTodos({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id
    })
  }

  // ---- useReducer
  const handleShowAll = (event) => {
    console.log(event)
    dispatchFilter({ type: 'SHOW_ALL' })
  }

  const handleShowComplete = () => {
    dispatchFilter({ type: 'SHOW_COMPLETE' })
  }

  const handleShowIncomplete = () => {
    dispatchFilter({ type: 'SHOW_INCOMPLETE' })
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'ALL') {
      return true
    }

    if (filter === 'COMPLETE' && todo.complete) {
      return true
    }

    if (filter === 'INCOMPLETE' && !todo.complete) {
      return true
    }

    return false
  })

  return (
    <div>
      <div>
        <button type='button' onClick={handleShowAll}>
          Show All
        </button>
        <button type='button' onClick={handleShowComplete}>
          Show Complete
        </button>
        <button type='button' onClick={handleShowIncomplete}>
          Show Incomplete
        </button>
      </div>
      <ul>
        {filteredTodos.map(todo => (
          <li key={todo.id}>
            <label>
              <input
                type='checkbox'
                checked={todo.complete}
                // onChange={(event) => handleChangeCheckbox(event, todo.id)}
                onChange={() => handleChangeCheckbox(todo)}
              />
              {todo.task}
            </label>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input type='text' value={task} onChange={handleChangeInput} />
        <button type='submit'>Add Todo</button>
      </form>
    </div>
  )
}

export default Todos
