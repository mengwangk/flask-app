import { createSlice } from 'redux-starter-kit'
import { VisibilityFilters } from '../../actions'

export const visibilityFilter = createSlice({
  slice: 'visibilityFilter',
  initialState: VisibilityFilters.SHOW_ALL,
  reducers: {
    setVisibilityFilter: (state, action) => action.payload
  }
})
