//O useMemo é uma forma de cachear um valor na memoría pelo React. No exemplo abaixo ocorre que sempre
// que o número é alterado o react atualiza e calcula o doubleNumber como é desejado. Porém quando
// muda o tema, o valor é calculado também, visto que ao renderizar a função é chamada novamente.
//Mas não há essa necessidade. Daí que surge o useMemo. Esse hook seta uma variável que será cacheada
// A variável que é atualizada recebe o useMemo de forma que a função só passar a ser invocada quando
//a variável passada dentro do [] do useMemo é alterada.

import React, { useState, useMemo, useEffect } from 'react';

function slowFunction(number) {
  for (let i = 0; i < 100000000000; i += 1) {}
  return number * 2;
}

export default function App() {
  const [number, setNumber] = useState(0);
  const [dark, setDark] = useState(false);

  //Da forma abaixo sempre que o componente atualiza a função é chamada para atualizar a variável doubleNumber
  // const doubleNumber = slowFunction(number);


  // com useMemo essa variável só é alterada (com a chamada da função se number for alterado)
  const doubleNumber = useMemmo(() => {
    return slowFunction(number)
  }, [number]);



  // const themeStyles = {
  //   backgroundColor: dark ? 'black' : 'white',
  //   color: dark ? 'white' : 'black'
  // }

  const themeStyles = useMemo(() => {
    return {
      backgroundColor: dark ? 'black' : 'white',
      color: dark ? 'white' : 'black'
    }
  }, [themeStyles])

// Aqui é um outro exemplo de como usar o Memo. o useEffect consola sempre que o themStyles muda,
//POrém nesse caso mesmo se o tema não mudar, mas o input for alterado irá consolar, pois para o JS
// um objeto nunca é igual ao outro e assim é entendido que o theStyles mudou. Fazendo o uso do useMemo
// é uma estratégia, pois é cacheado o objeto e quando comparado para o React é o mesmo objeto.

  useEffect(() => {
    console.log('Theme Changed')
  }, [themeStyles]);

  return (
    <div>
      <input type="number" value={number} onChange={(e) => setNumber(parseInt(e.target.value))} />
      <button onClick={() => setDark(prevDark => !prevDark)}>Change Theme</button>
      <div style={themeStyles}>{doubleNumber}</div>
    </div>
  )
}



// https://www.youtube.com/watch?v=THL1OPn72vo&ab_channel=WebDevSimplified