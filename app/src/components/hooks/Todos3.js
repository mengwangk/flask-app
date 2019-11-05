import React, { useState, useReducer, useContext } from 'react'
import uuid from 'uuid/v4'
import useCombinedReducers, { StateContext, DispatchContext } from './utils'

// const DispatchContext = createContext(null)

const initialTodos = [
  {
    id: uuid(),
    task: 'React',
    complete: true
  }, {
    id: uuid(),
    task: 'Angular',
    complete: true
  }, {
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
      return state
  }
}

const todoReducer = (state, action) => {
  switch (action.type) {
    case 'DO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return {
            ...todo,
            complete: true
          }
        } else {
          return todo
        }
      })
    case 'UNDO_TODO':
      return state.map(todo => {
        if (todo.id === action.id) {
          return {
            ...todo,
            complete: false
          }
        } else {
          return todo
        }
      })
    case 'ADD_TODO':
      return state.concat({ task: action.task, id: action.id, complete: false })
    default:
      return state
  }
}

const Filter = () => {
  const dispatch = useContext(DispatchContext)

  const handleShowAll = () => {
    dispatch({ type: 'SHOW_ALL' })
  }
  const handleShowComplete = () => {
    dispatch({ type: 'SHOW_COMPLETE' })
  }
  const handleShowIncomplete = () => {
    dispatch({ type: 'SHOW_INCOMPLETE' })
  }
  return (
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
  )
}

const TodoList = ({ todos }) => (
  <ul>
    {todos.map(todo => (<TodoItem key={todo.id} todo={todo} />))}
  </ul>
)

const TodoItem = ({ todo }) => {
  const dispatch = useContext(DispatchContext)
  const handleChange = () => dispatch({
    type: todo.complete
      ? 'UNDO_TODO'
      : 'DO_TODO',
    id: todo.id
  })
  return (
    <li>
      <label>
        <input type='checkbox' checked={todo.complete} onChange={handleChange} /> {todo.task}
      </label>
    </li>
  )
}

const AddTodo = () => {
  const dispatch = useContext(DispatchContext)
  const [task, setTask] = useState('')

  const handleSubmit = event => {
    if (task) {
      dispatch({ type: 'ADD_TODO', task, id: uuid() })
    }
    setTask('')
    event.preventDefault()
  }

  const handleChange = event => setTask(event.target.value)
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' value={task} onChange={handleChange} />
      <button type='submit'>Add Todo</button>
    </form>
  )
}

const Todos3 = () => {
  /*
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos)
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')

  // Global Dispatch Function
  const dispatch = action => [dispatchTodos, dispatchFilter].forEach(fn => fn(action))

  // Global State
  const state = {
    filter,
    todos
  }
  */
  const [state, dispatch] = useCombinedReducers({
    filter: useReducer(filterReducer, 'ALL'),
    todos: useReducer(todoReducer, initialTodos)
  })

  const { filter, todos } = state
  console.log(state)
  console.log(filter)
  console.log(todos)

  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'ALL') {
      return true
    }

    if (state.filter === 'COMPLETE' && todo.complete) {
      return true
    }

    if (state.filter === 'INCOMPLETE' && !todo.complete) {
      return true
    }

    return false
  })

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <Filter />
        <TodoList todos={filteredTodos} />
        <AddTodo />
      </StateContext.Provider>
    </DispatchContext.Provider>
  )
}

export default Todos3
