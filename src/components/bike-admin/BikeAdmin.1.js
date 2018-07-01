import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase'

const Todos = ({ todos, firebase }) => {
  // Build Todos list if todos exist and are loaded  
  const todosList = !isLoaded(todos)
    ? 'Loading'
    : isEmpty(todos)
      ? 'Todo list is empty'
      : Object.keys(todos).map(
        (key, id) => (
          <li key={key}  >            
            {key} {todos[key].model}
          </li>
        )
      )
  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todosList}
      </ul>
      <input type="text"  />
      <button onClick={this.handleAdd}>
        Add
      </button>
    </div>
  )
}

export default compose(
  firebaseConnect([
    'bikes' // { path: '/todos' } // object notation
  ]),
  connect((state) => ({
    todos: state.firebase.data.bikes,
    // profile: state.firebase.profile // load profile
  }))
)(Todos)