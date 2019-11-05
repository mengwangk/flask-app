import React, {
  useState,
  useReducer,
  useContext,
  createContext
} from 'react'
import uuid from 'uuid/v4'

const TodoContext = createContext(null)

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

const Filter = ({ dispatch }) => {
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
    {todos.map(todo => (
      <TodoItem key={todo.id} todo={todo} />
    ))}
  </ul>
)

const TodoItem = ({ todo }) => {
  const dispatch = useContext(TodoContext)
  const handleChange = () =>
    dispatch({
      type: todo.complete ? 'UNDO_TODO' : 'DO_TODO',
      id: todo.id
    })
  return (
    <li>
      <label>
        <input
          type='checkbox'
          checked={todo.complete}
          onChange={handleChange}
        />
        {todo.task}
      </label>
    </li>
  )
}

const AddTodo = () => {
  const dispatch = useContext(TodoContext)
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

const Todos2 = () => {
  const [todos, dispatchTodos] = useReducer(todoReducer, initialTodos)
  const [filter, dispatchFilter] = useReducer(filterReducer, 'ALL')

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
    <TodoContext.Provider value={dispatchTodos}>
      <Filter dispatch={dispatchFilter} />
      <TodoList todos={filteredTodos} />
      <AddTodo />
    </TodoContext.Provider>
  )
}

export default Todos2
