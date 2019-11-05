
import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import rootReducer from './reducers/rsk'

const preloadedState = {
  users: [
    {
      name: 'dummy user',
      email: 'abc@gmail.com',
      password: 'Test123$',
      confirmPassword: 'Test123$'
    }
  ]
}

const middleware = [...getDefaultMiddleware()]

export const store = configureStore({
  rootReducer,
  middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
})
