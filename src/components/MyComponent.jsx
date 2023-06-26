import React, { useState, useRef } from 'react';
const MyComponent = () => {
  const initialStyle = {
    backgroundColor: 'RGB(0,0,0)',
    width: '255px',
    height: '255px',
    margin: '0 auto',
  };
  const [squareStyle, setStyle] = useState(initialStyle);

  const intervalRef = useRef(null);
  const messageDivRef = useRef(null);
  function changeBgColor(message) {
    if (intervalRef.current) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setStyle((previousValue) => {
        return {
          ...previousValue,
          backgroundColor: `rgb(${gerateRGBNumber()},${gerateRGBNumber()},${gerateRGBNumber()})`,
        };
      });
    }, 500);
    messageDivRef.current.innerHTML = `Se <b>inicio</b> el intervalo gracias a el evento: <b>${message}</b>`;
  }

  function stopColorChange(message) {
    if (!intervalRef.current) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    messageDivRef.current.innerHTML = `Se <b>detuvo</b> el intervalo gracias a el evento: <b>${message}</b>`;
  }
  return (
    <div>
      <div
        onMouseOver={() => changeBgColor('onMouseOver')}
        onMouseLeave={() => stopColorChange('onMouseOver')}
        onDoubleClick={() => {
          intervalRef.current
            ? stopColorChange('onDoubleClick')
            : changeBgColor('onDoubleClick');
        }}
        style={squareStyle}
      ></div>

      <div>
        <h3>Logs:</h3> <p ref={messageDivRef}></p>
      </div>
    </div>
  );
};

export default MyComponent;

// Generar un número aleatorio entre 0 y 255 (incluyéndolos)

function gerateRGBNumber() {
  var x = 0;
  var y = 255;
  var numeroAleatorio = Math.floor(Math.random() * (y - x + 1)) + x;
  return numeroAleatorio;
}
