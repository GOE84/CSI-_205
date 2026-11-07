"use client";
import { useState } from 'react';

export default function CalculatorPage() {
  
  const [states, setStates] = useState('first');
  const [display, setDisplay] = useState('0');
  const [first, setFirst] = useState(0);
  const [operator, setOperator] = useState('+');
  const numberClick = (num: string) => {
    if (states === 'operator') {
      setDisplay(num);
      setStates('second');
    } else if (display.replace('-', '').length < 9) {
      setDisplay(display === '0' ? num : display + num);
    }
  };
  const operatorClick = (op: string) => {
    if (states === 'second') {
      const result = operator === '+' ? first + Number(display) : first - Number(display);
      setFirst(result);
      setDisplay(String(result));
    } else setFirst(Number(display));
    setOperator(op);
    setStates('operator');
  };
  const equalClick = () => {
    if (states !== 'second') return;
    const second = Number(display);
    setDisplay(String(operator === '+' ? first + second : first - second));
    setStates('first');
  };
  const ceClick = () => {
    setStates('first'); setDisplay('0'); setFirst(0); setOperator('+');
  };
  return (
    <section aria-label="Calculator" tabIndex={0} className="mx-auto mt-6 w-64 border border-gray-300 rounded-lg p-2" onKeyDown={(event) => {
      if (/^[0-9]$/.test(event.key)) numberClick(event.key);
      else if (event.key === '+' || event.key === '-') operatorClick(event.key);
      else if (event.key === '=' || event.key === 'Enter') equalClick();
      else if (event.key === 'Escape') ceClick();
      else return;
      event.preventDefault();
    }}>
      <output aria-live="polite" className="block rounded border bg-teal-50 p-3 text-right text-2xl font-bold break-all">{display}</output>
      <div className="grid grid-cols-4 gap-1 mt-2">
        {['7','8','9','CE','4','5','6','+','1','2','3','-','0','='].map((key) => (
          <button key={key} className={`rounded-lg py-3 text-lg font-bold border border-gray-300 ${key === 'CE' ? 'bg-amber-400' : /[+=-]/.test(key) ? 'bg-green-300' : 'bg-cyan-200'} ${key === '0' || key === '=' ? 'col-span-2' : ''}`} onClick={() => {
            if (key === 'CE') ceClick();
            else if (key === '=') equalClick();
            else if (key === '+' || key === '-') operatorClick(key);
            else numberClick(key);
          }}>{key}</button>
        ))}
      </div>
    </section>
  );
}
