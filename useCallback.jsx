// use callback é muito parecido com useMemo. Só que ao invés de cachear o retorno da função, useCallback.
// faz o cacheamento da função inteira. Isto é, com o useMemo é controlado se o valor retornado da função é alterado
// enquanto no usecallback se a função não mutar, não causa side effect

import React, { useState, useCallback, useEffect } from 'react';

function List({ getItems }) {
  const [items, setItems] = useState([]);


  //como o parâmetro do useEffect é getItems (uma função que quando chamada cria um array),
  // sempre que o componente que tem getItem renderiza, o useEffect é chamado, pois ao renderizar novamente 
  // a função é recriada para atualizar o componente, e ao clicar no toggle theme é exatamente 
  //isso o que acontece e assim a função é chamada novamente sem precisar 

  useEffect(() => {
    setItems(getItems(5));
    console.log('updating Items')
  }, [getItems]);

  return items.map((item) => <div key={key}>{item}</div>)
}

export default function App() {
  const [number, setNumber] = useState(1);
  const [dark, setDark] = useState(false);

  // a assinatura do usecalback é a mesma do useMemo, mas é importante reparar que ao contrário do useMemo
  // que o retorno era um valor, no usecallback o retorno é uma função!

  // const getItems = () => [number, number + 1, number + 2]

  const getItems = useCallback((incrementer) => {
    return [number + incrementer, number + 1 + incrementer, number + 2 + incrementer];
  }, [number]);

  const theme = {
    backgroundColor: dark ? '#333' : '#fff',
    color: dark ? '#fff' : '#333'
  }

  return (
    <div style={theme}>
      <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))} />
      <button onClick={() => setDark(prevDark => !prevDark)}>Toggle Theme</button>
      <List getItems={getItems} />
    </div>
  )
}

// https://www.youtube.com/watch?v=_AyFP5s69N4&t=7s&ab_channel=WebDevSimplified