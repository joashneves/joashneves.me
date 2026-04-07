import React, { useState, useEffect } from 'react';
import styles from './DigitalStyle.module.css';

/**
 * Componente que simula um efeito de digitação (typewriter) de terminal.
 * @param {string} children - O texto a ser digitado.
 * @param {number} speed - Velocidade em ms entre cada caractere (default: 100).
 */
export default function EstiloDigital({ children, speed = 100 }) {
  const [displayedText, setDisplayedText] = useState('');
  const textToType = typeof children === 'string' ? children : '';

  useEffect(() => {
    let currentText = '';
    let index = 0;
    
    // Resetar o texto ao iniciar
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < textToType.length) {
        currentText += textToType[index];
        setDisplayedText(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [textToType, speed]);

  return (
    <h1 className={styles.container}>
      {displayedText}
      <h1 className={styles.cursor}>_</h1>
    </h1>
  );
}
