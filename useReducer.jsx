
//useReducer é uma forma de simplificar a lógica do Redux

import React, { useReducer } from 'react';


// a funcao reducer recebe dois parâmetros, o primeiro é o estado e o segundo a action, assim como
//no redux. E da mesma forma faço o switch case para cada action

function reducer(state, action) {
  switch (action.type) {
    case 'increment': return { count: state.count + action.payload }
    case 'decrement': return { count: state.count - action.payload }
    default: return state;
  }
}

export default function App() {
  // o hook recebe dois parâmetros, a função reducer e o estado inicial e retorna em forma de array
  // o novo estado e as actions.

  const [state, dispatch] = useReducer(reducer, { count: 0 })


  function increment() {
    //para dar o trigger na action a função dispatch recebe um objeto com a action específica como parâmetro
    dispatch({ type: 'increment', payload })
  }

  function decrement() {
    dispatch({ type: 'decrement', })
  }


  return (
    <div>
      <button onClick={increment}>+</button>
      {/* Para ler o estado atual, basta chamar state com a propriedade requerida */}
      <span>{state.count}</span>
      <button onClick={decrement}>-</button>
    </div>
  )
}

// https://www.youtube.com/watch?v=_AyFP5s69N4&t=7s&ab_channel=WebDevSimplified