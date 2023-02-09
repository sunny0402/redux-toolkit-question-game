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

- TODO:
- Persist data:
- https://frontend-digest.com/setting-up-a-full-stack-react-application-835c2a37eb7a
- https://github.com/typicode/json-server
- Pass Navigation as prop to Outlet https://stackoverflow.com/questions/70027979/passing-props-to-outlet-when-nestining-routes-in-react-router-v6
- use toast for error popups: react-hot-toast
