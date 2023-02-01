# About

A question game "Would You Rather?" built with Redux Toolkit.

## Notes / Resources / TODO

- Redux User Registration Tutorial: https://cloudnweb.dev/2021/02/modern-react-redux-tutotials-redux-toolkit-login-user-registration/

- React Hook Form for form validation: https://react-hook-form.com/

- createAsyncThunk()
- https://redux-toolkit.js.org/api/createAsyncThunk#payloadcreator:
  - A "payload creator" callback function that returns a Promise containing some data,or a rejected Promise with an error
  - https://redux-toolkit.js.org/api/createAsyncThunk#return-value
  - thunkAPI argument gives acccess to requestId, rejectWithValue(value, [meta]), etc ...
  - returns pending, fulfilled, rejected
  - if the promise resolved successfully, dispatch the fulfilled action with the promise value as action.payload
