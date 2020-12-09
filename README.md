# Introduction To React and Redux

## Objectives

- Setup Redux with a react app
- Start initial set up for Redux Todo List

## Getting Started

- Create a new React App `npx create-react-app react-redux`

## React and State Management

React by default comes with it's own way to handle `state`. We've seen `class` based components with `this.state` and we've seen `functional` components with `useState`.

Typical state management follows the top down pattern, where our state is unidirectional in a downward direction. This is referred to as passing props.

Here's an example of React's out of the box data flow:

![State Flow](images/state-flow.png)

**State must be passed in a downward manner as props to other components.**

What if I told you there was an easier way?

Enter Redux!

## Redux

What is `Redux`?

> Redux itself is a standalone library that can be used with any UI layer or framework, including React, Angular, Vue, Ember, and vanilla JS. Although Redux and React are commonly used together, they are independent of each other.

For React integration we'll be using one of Redux's binding libraries specifically made for react called `React Redux`.

### React Redux

Although you don't always need Redux for every application you build, it's important to understand why you would use `React Redux`.

From the `Redux Docs`:

> ## It is the Official Redux UI Bindings for React
>
> While Redux can be used with any UI layer, it was originally designed and intended for use with React. There are UI binding layers for many other frameworks, but React Redux is maintained directly by the Redux team.
>
> As the offical Redux binding for React, React Redux is kept up-to-date with any API changes from either library, to ensure that your React components behave as expected. Its intended usage adopts the design principles of React - writing declarative components.

> ## It Encourages Good React Architecture
>
> React components are a lot like functions. While it's possible to write all your code in a single function, it's usually better to split that logic into smaller functions that each handle a specific task, making them easier to understand.
>
> Similarly, while you can write large React components that handle many different tasks, it's usually better to split up components based on responsibilities. In particular, it is common to have "container" components that are responsible for collecting and managing some kind of data, and "presentational" components that simply display UI based on whatever data they've received as props.
>
> The React Redux connect function generates "container" wrapper components that handle the process of interacting with the store for you. That way, your own components can focus on other tasks, whether it be collecting other data, or just displaying a piece of the UI. In addition, connect abstracts away the question of which store is being used, making your own components more reusable.
>
> As a general architectural principle, we want to keep our own components "unaware" of Redux. They should simply receive data and functions as props, just like any other React component. This ultimately makes it easier to test and reuse your own components.
>
> It Implements Performance Optimizations For You#
> React is generally fast, but by default any updates to a component will cause React to re-render all of the components inside that part of the component tree. This does require work, and if the data for a given component hasn't changed, then re-rendering is likely some wasted effort because the requested UI output would be the same.
>
> If performance is a concern, the best way to improve performance is to skip unnecessary re-renders, so that components only re-render when their data has actually changed. React Redux implements many performance optimizations internally, so that your own component only re-renders when it actually needs to.
>
> In addition, by connecting multiple components in your React component tree, you can ensure that each connected component only extracts the specific pieces of data from the store state that are needed by that component. This means that your own component will need to re-render less often, because most of the time those specific pieces of data haven't changed.

> ## Community Support
>
> As the official binding library for React and Redux, React Redux has a large community of users. This makes it easier to ask for help, learn about best practices, use libraries that build on top of React Redux, and reuse your knowledge across different applications.

## Redux Flow and Setup

Let's start by installing the [Redux devtools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

This tool will allow us to monitor state and any changes in our apps.

### Flow

Because `Redux` operates using a single `Store` to handle our state, it makes deciding which components should store state a lot easier to decide on. Essentially, none of our components store state, `Redux` handles it all for us and allows us to accept that information as `props`.

Here's an example:

![Redux Store](images/redux-store.png)

Redux is built on the concept of `Reducers`, `Actions` and `Types`.

- Reducers are used so we can break up our state into little modules.
- Actions are things that we perform to update the state.
- Types are a definition of the actions we are performing.

We'll put some of this into practice in just a bit.

### Setup

In order to use `Redux` with our react app we'll need to install a couple of new dependencies called `react-redux` and `redux`.

Run `npm install react-redux redux`

Once your install has finished let's create a new folder called `store` inside of your `src` folder.
This folder is going to hold our `Actions`, `Types` and `Reducers`.

Start by creating an `index.js` file in the `store` folder.

Once you've created the `index.js` file, open it in your code editor.

Let's add the following:

```js
import { createStore } from 'redux'

const store = createStore(() => ({})) // Create store accepts a function as an argument, this setup is just temporary until we setu up reducers.

export default store
```

Now head over to the react app `index.js` where we call `ReactDom.render()`. We need to connect our new Redux store to our react app make your `index.js` look like the following.

```js
import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
```

Let's break this down:

- We import the `Provider` component from `react-redux`, this component accepts a `store` prop that is our `store` we created in the previous step.
- We wrap our `App` component inside of the provider to give any component that lives within `App.js` access to our redux store.

## Exit Notes

We've successfully implemented a redux store with our react app. We'll be using this same repo for the next few lessons.

## Resources

[Redux Docs](https://react-redux.js.org/)

[Why Redux?](https://almerosteyn.com/2016/08/redux-explained-again)

# Part 2: Redux Reducers

## Requirements

- Have `intro to redux` working.

## Objectives

- Learn how redux reducers work
- Implement reducers

## What Are Reducers?

Reducers are functions that return some type of state. You can think of them as little modules that we can break up our state into instead of having one large object containing every piece of state for our application. Here's an example:

```js
const initialState = {
  myName: ''
}

const SomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SOME_TYPE':
      return { ...state, myName: action.payload }
    default:
      return { ...state }
  }
}

export default SomeReducer
```

As you can see theres quite a bit going on here so let's break it down:

- We set up some type of initial state, you can either pass this as an argument to our reducer or store it in it's own variable.

- We also recieve an action as the second argument for our reducer, this is coming from redux when we wire this reducer to our store.

- The action variable contains two things, a `Type` and an `Action`.

- We use a switch statement to check what the action type is, dependant on that type we'll perform some kind of state update utilizing the payload from the action. ( We'll set these up later on )

- Our reducer should always return a new object with our state by default.

- We export this reducer for use later on.

## Adding A Reducer For Our Todo List

Open your Todo List application from earlier. We'll be adding a reducer to handle some state and linking it to our store.

Create a new folder in the `store` directory called `reducers`

In the reducers folder create a new file called `TodoReducer.js`.

Let's go ahead and build this reducer, add the following to your `TodoReducer`:

```js
const initialState = {
  todos: [],
  newTodo: ''
}

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return { ...state, todos: [...state.todos, action.payload] }
    case 'NEW_TODO':
      return { ...state, newTodo: action.payload }
    default:
      return { ...state }
  }
}

export default TodoReducer
```

Let's install a dependency to allow our redux devtools to read our state:

```sh
npm install redux-devtools-extension
```

Let's wire this reducer to our store. In the `store/index.js` add the following:

```js
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import TodoReducer from './reducers/TodoReducer'

const store = createStore(TodoReducer, composeWithDevTools())

export default store
```

Open your redux devtools and click on the `state` tab, you should see our todos array and the newTodo string.

## Multiple Reducers

We've successfully set up a single reducer to handle our todos, but what if we wanted to use multiple reducers? Let's start by creating a new reducer in our `reducers` folder called `AppReducer.js`. Add the following:

```js
const initialState = {
  appLoading: false
}

const AppReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_APP_LOADING':
      return { ...state, appLoading: action.payload }
    default:
      return { ...state }
  }
}

export default AppReducer
```

Let's utilize this reducer with our store. In the `store/index.js` file, pull `combineReducers` from the redux import. Let's make our store file look like the following:

```js
import { createStore, combineReducers } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import TodoReducer from './reducers/TodoReducer'
import AppReducer from './reducers/AppReducer'

const store = createStore(
  combineReducers({ todoState: TodoReducer, appState: AppReducer }),
  composeWithDevTools()
)

export default store
```

Let's break this down:

- We import the `combineReducers` function from redux.
- We put the `combineReducers` function inside of our `createStore` function and pass in an object with how we want our state to be formatted.
- We tell redux that we want a `todoState` set to our `TodoReducer` and an `appState` set to our `AppReducer`.

This is what's known as middleware in Redux.

In your redux devtools you should now see two new things:

- a `todoState` object
- an `appState` object

With our state from each reducer inside of them.

## Resources

[Understanding Reducers](https://css-tricks.com/understanding-how-reducers-are-used-in-redux/)

[What Is A Reducer](https://daveceddia.com/what-is-a-reducer/)

# Part 3: Redux Actions and Types

### Requirements

- Have Part 2 of the Todo List working.

## Objectives

- Learn about actions and types
- Build out actions and types

## What Are Actions

In redux actions are functions that provide a type and a payload, these functions are used to update our state. Redux uses the types to track which and any change was performed at any given time.

We `dispatch` actions from our components by importing our actions into the components we want to use them in.

Heres an example of an action:

```js
const AddTodo = (todo) => ({
  type: 'ADD_TODO',
  payload: todo
})
```

Our action returns an object with the type of action we are performing and a payload being the item we want to add or use to update our state.

## Building Actions For Our Todo List

Let's start by creating a `types.js` file in our `store` directory.

Next create an `actions` folder inside of the `store` directory.
In the `actions` folder create a new file called `TodoActions.js`.
This file will hold all of the actions to handle our `todoState`.

Add the following function to `TodoActions.js`:

```js
export const AddTodo = (todo) => ({
  type: 'ADD_TODO',
  payload: todo
})
```

Let's break this down:

- We're exporting a function called `AddTodo`.
- Accepts a todo as an argument.
- It implicity returns an object with a type of `ADD_TODO` and a payload being the todo we want to add.

Now one thing you may notice is we're setting the type here as a string that we typed in. This is fine and good, but what if we make a mistake while typing it? In that case Redux has no idea what this function is supposed to be doing. This is where our `types` file comes in. We can store our action types here as variables and re-use them without having to worry about typos as our application grows.

## Declaring Action Types

Open your `types.js` file. Let's add our first type:

```js
export const ADD_TODO = 'ADD_TODO'
```

Now in your `TodoActions` import this type, remember since we're using the `export const` syntax we'll have to use the destructuring import syntax.

Your `TodoActions.js` file should look like the following:

```js
import { ADD_TODO } from '../types'

export const AddTodo = (todo) => ({
  type: 'ADD_TODO',
  payload: todo
})
```

Now swap out the type in the `AddTodo` function to our new `ADD_TODO` variable.

```js
import { ADD_TODO } from '../types'

export const AddTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo
})
```

Now in your `TodoReducer.js` do the same.

```js
import { ADD_TODO } from '../types'

const initialState = {
  todos: [],
  newTodo: ''
}

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload] }
    case 'NEW_TODO':
      return { ...state, newTodo: action.payload }
    default:
      return { ...state }
  }
}

export default TodoReducer
```

## You Do 10 Min

Create two new types:

- NEW_TODO
- REMOVE_TODO

Create two new actions:

- CreateNewTodo
- RemoveTodo

The `CreateNewTodo` should accept a form value as an argument.

The `RemoveTodo` should accept an index as an argument.

Change the `NEW_TODO` case in the `TodoReducer` to your new NEW_TODO variable.

Add a new case to the `TodoReducer` for REMOVE_TODO. It should return a new object with everything in state for now. **Hint**: Look at the default case.

## Resources

[Redux Actions For Beginners](https://www.tutorialspoint.com/redux/redux_actions.htm)

# Part 4: Mapping State and Actions To Props

### Requirements

- Have Part 3 of the todo list working

## Objectives

- Attach our actions and reducers to components.

- Perform state updates with our actions.

- Connect our components to our redux store.

## Recap

At this point we've successfully created `reducers`, `types`, `actions`, linked our `store` to our react app via the react-redux `Provider` component. Let's add the final piece to our puzzle, utilizing our store and actions.

## Creating A Todo List

### Linking Components To The Redux Store

Start by creating a `components` folder in your `src` directory.

In that folder create two files, `TodoList.js` and `TodoForm.js`.

Open your `TodoList.js`, let's make a functional react component:

```jsx
import React from 'react'

const TodoList = () => {
  return <div></div>
}

export default TodoList
```

Now in order to use our Redux `store`, we need to accept the information as props. Unfortunately it's not as easy as just adding props to the function argument. We'll need to do a couple of things first:

- Map Our State to Props
- Map Our Actions to Props
- `Connect` our component to Redux

Notice the wording in the above list, it's done purposely. These are exactly what we're going to create and import in our `TodoList` component.

Start by creating a `mapStateToProps` function. It should accept state as an argument and return an empty object for the time being, add it above the export statement:

```js
const mapStateToProps = (state) => {
  return {}
}
```

Add a `console.log` inside of that function above the `return`. And log `state`.

Now create a `mapActionsToProps` function, it should accept `dispatch` as an argument, have it return an empty object for the time being:

```js
const mapActionsToProps = (dispatch) => {
  return {}
}
```

You may see this function called `mapDispatchToProps` in certain posts and tutorials online, the names of these functions don't matter, what does matter is what they return.

Now we need to add one final thing to finish our setup. We need to `connect` our `TodoList` component to Redux.

Import the `connect` function from `react-redux`, use destructuring syntax for this:

```js
import { connect } from 'react-redux'
```

Let's connect our component now, where we export our `TodoList` invoke the `connect` function, and wrap the `TodoList` in parentheses:

```js
export default connect()(TodoList)
```

Connect accepts two arguments, the order matters here! The first argument the function we're using to read the state from redux, in this case, `mapStateToProps`.
The second argument being any actions that we want to connect to redux, in this case `mapActionsToProps`.

We do not invoke the functions, simply passing them in will work.

Add them to your `connect` function:

```js
export default connect(mapStateToProps, mapActionsToProps)(TodoList)
```

Now accept `props` as an argument in the `TodoList` component, your final component should look like this:

```jsx
import React from 'react'
import { connect } from 'react-redux'

const TodoList = (props) => {
  return <div></div>
}

const mapStateToProps = (state) => {
  console.log(state)
  return {}
}

const mapActionsToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapActionsToProps)(TodoList)
```

Let's add this component to our `App.js`:

```jsx
import TodoList from './components/TodoList'
import './styles/App.css'

function App() {
  return (
    <div className="App">
      <h3>Redux Intro</h3>
      <TodoList />
    </div>
  )
}

export default App
```

Now open your browser dev tools and take a look at the console, you should the our redux store being printed!

That's all fine and good, however it's of no use to use just sitting in the console, we want to actually use this information. In the `mapStateToProps` function, return an object with `todoState` as a key and `state.todoState` as a value:

```js
const mapStateToProps = (state) => {
  console.log(state)
  return {
    todoState: state.todoState
  }
}
```

Remove the console log from the `mapStateToProps` function and console log props in the `TodoList` component. Refresh the page and you should now only see the `todoState` being logged to the console.

Let's display some todos on our page, in the `TodoList` component `map` through `props.todos` and return an `li` with each todo:

```jsx
const TodoList = (props) => {
  console.log(props)
  return (
    <div>
      {props.todoState.todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </div>
  )
}
```

One small problem, we don't have any todos in state right now, our array is empty, let's add some!

In your `TodoReducer` add a todo to the `todos` state:

```js
const initialState = {
  todos: ['Make Memes'],
  newTodo: ''
}
```

Now if you refresh your page you should see a list appear. Much better!

We've successfully read information from our Redux store!

### Linking Actions To Our Component

In the last part we created some actions to use later on. That time has come!

Add the following to your `TodoForm` file we created earlier:

```jsx
import React from 'react'

const TodoForm = (props) => {
  return (
    <form>
      <input
        type="text"
        name="newTodo"
        value={props.newTodo}
        onChange={props.handleChange}
      />
      <button type="submit" onClick={props.handleSubmit}>
        Add Todo
      </button>
    </form>
  )
}

export default TodoForm
```

Import this component into the `TodoList` component:

```js
import TodoForm from './TodoForm'
```

Use it right above where we are mapping through the todos:

```jsx
<div>
  <TodoForm />
  {props.todoState.todos.map((todo, index) => (
    <li key={index}>{todo}</li>
  ))}
</div>
```

Let's set up a couple of functions in our `TodoList` component:

```js
const handleChange = (event) => {}

const handleSubmit = (event) => {
  event.preventDefault()
}
```

We'll use them as helper methods to handle our form.

Pass them in as props to our `TodoForm`, also pass in `newTodo` which we'll get from our `todoState`:

```jsx
const TodoList = (props) => {
  console.log(props)

  const handleChange = (event) => {}

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <div>
      <TodoForm
        newTodo={props.todoState.newTodo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {props.todoState.todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </div>
  )
}
```

Now we're ready to start using our redux actions!

Import the actions from `TodoActions.js`, remember to use destructuring syntax!

```js
import {
  AddTodo,
  RemoveTodo,
  CreateNewTodo
} from '../store/actions/TodoActions'
```

Now the fun part, mapping these actions to props.
In the `mapActionsToProps` function, modify your return statement to the following:

```js
const mapActionsToProps = (dispatch) => {
  return {
    addTodo: (newTodo) => dispatch(AddTodo(newTodo)),
    removeTodo: (index) => dispatch(RemoveTodo(index)),
    createTodo: (formValue) => dispatch(CreateNewTodo(formValue))
  }
}
```

Break down:

- We set up object keys with what we want these functions to be called
- We set the values to a callback function, if we don't react has no idea that these are functions
- We return a `dispatch` function that accepts the action we want to perform. Dispatch is important here!

The `dispatch` function is telling redux to perform this action to update our state. This is how redux can keep track of what function performed what and allows us to build modularity into our applications.

We can now use these functions as props. In our helper methods we defined earlier, utilize the `addTodo` and `createTodo` function:

```js
const handleChange = (event) => {
  props.createTodo(event.target.value)
}

const handleSubmit = (event) => {
  event.preventDefault()
  props.addTodo(props.todoState.newTodo)
}
```

Now try typing in the form and submitting it.
Your new todo should be added to the todos state!
You can observe these changes through the redux devtools. Here you can see which action type is being utilized and if state get's updated, which state updated.

Only one small problem here, our form field is never being cleared out, let's fix this in our `TodoReducer`:

```js
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload], newTodo: '' }
```

The field should now be cleared every time we add a new todo!

Here's the final `TodoList` component:

```js
import React from 'react'
import { connect } from 'react-redux'
import TodoForm from './TodoForm'
import {
  AddTodo,
  RemoveTodo,
  CreateNewTodo
} from '../store/actions/TodoActions'

const TodoList = (props) => {
  console.log(props)

  const handleChange = (event) => {
    props.createTodo(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    props.addTodo(props.todoState.newTodo)
  }

  return (
    <div>
      <TodoForm
        newTodo={props.todoState.newTodo}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {props.todoState.todos.map((todo, index) => (
        <li key={index}>{todo}</li>
      ))}
    </div>
  )
}

const mapStateToProps = (state) => {
  //   console.log(state)
  return {
    todoState: state.todoState
  }
}

const mapActionsToProps = (dispatch) => {
  return {
    addTodo: (newTodo) => dispatch(AddTodo(newTodo)),
    removeTodo: (index) => dispatch(RemoveTodo(index)),
    createTodo: (formValue) => dispatch(CreateNewTodo(formValue))
  }
}

export default connect(mapStateToProps, mapActionsToProps)(TodoList)
```

Heres the final `TodoReducer`:

```js
import { ADD_TODO, NEW_TODO, REMOVE_TODO } from '../types'

const initialState = {
  todos: ['Make Memes'],
  newTodo: ''
}

const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return { ...state, todos: [...state.todos, action.payload], newTodo: '' }
    case NEW_TODO:
      return { ...state, newTodo: action.payload }
    case REMOVE_TODO:
      return { ...state }
    default:
      return { ...state }
  }
}

export default TodoReducer
```

## You Do

- Implement the removeTodo action, **Hint**: you can perform logic in the reducers!
- Create your own `markComplete` action. You should be able to mark a todo as complete, you may need to change the data type of `newTodo` in order to get this to work.
- Implement a way to sort todos by completion.

## Bonus

Create a favoriting feature for your todos, create a separate component and connect it to your store. You'll need a new type and action. You should be able to remove this favorite as well.
