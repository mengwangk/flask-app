import React from 'react'

export const StateContext = React.createContext()
export const DispatchContext = React.createContext()

const useCombinedReducers = combinedReducers => {
  // Global State
  const state = Object.keys(combinedReducers).reduce(
    (acc, key) => ({ ...acc, [key]: combinedReducers[key][0] }),
    {}
  )

  // Global Dispatch Function
  const dispatch = action =>
    Object.keys(combinedReducers)
      .map(key => combinedReducers[key][1])
      .forEach(fn => fn(action))

  return [state, dispatch]
}

export default useCombinedReducers
