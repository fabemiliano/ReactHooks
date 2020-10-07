// O mais importante no uso de useRef é que é um hook persistente, isto é, ele não causa sideEffect,
//isso pode ser útil em alguns casos

import React, { useState, useEffect, useRef } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [counter, setCounter] = useState(0);
  const renderCount = useRef(0);
  const inputRef = useRef()

  // usar useState para atualizar o counter irá atualizar o estado o que irá dar o gatilho para 
  // chamar o set state novamente que atualizará a página e assim procederá um loop infinito

/*   useEffect(() => {
    setCounter((counter) => counter + 1);
  }) */

  // o hook useRef por outro lado é atualizado somente quando a página é atualiza e o hook não dispara
  //o efeito colateral que atualiza a página. Esse hook é um objeto que contem a propriedade current


  useEffect(() => {
    renderCount.current = renderCount.current + 1;
  })

  function focus() {
    inputRef.current.focus();
  }

  //Outra utilidade do useRef é que você pode modificar um elemento de acordo com o ref passado para ele.
  // como abaixo: o input tem o inputRef como ref que é o hook setado no início. O botão de click irá
  // chamar uma função que atribui focus para o inputRef, ou seja, aplicará focus para o elemento que
  // que tem o ref = inputRef

  return (
    <div>
      <input ref={inputRef} value={name} onChange={e => e.target.value} />
      <div> My name is {name}</div>
      <div>I rendered {renderCount.current}</div>
      <button onClick={focus}>Focus</button>
    </div>
  )
}

// https://www.youtube.com/watch?v=t2ypzz6gJm0&ab_channel=WebDevSimplified