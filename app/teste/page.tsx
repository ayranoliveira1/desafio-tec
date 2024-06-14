"use client";

import { useEffect, useState } from "react";

const letrasPossiveis = ["A", "B", "C", "D", "E"];

export default function Jogo() {
   const [letrasSequencia, setLetrasSequencia] = useState<string[]>([]);
   const [indiceAtual, setIndiceAtual] = useState<number>(0);
   const [acertos, setAcertos] = useState<number>(0);
   const [erros, setErros] = useState<number>(0);

   useEffect(() => {
      iniciarJogo();
   }, []);

   function iniciarJogo() {
      const novaSequencia = Array.from({ length: 5 }, () => getNovaLetra());
      setLetrasSequencia(novaSequencia);
      setIndiceAtual(0);
      setAcertos(0);
      setErros(0);
   }

   function getNovaLetra(): string {
      const indice = Math.floor(Math.random() * letrasPossiveis.length);
      return letrasPossiveis[indice];
   }

   useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
         const letraDigitada = event.key.toUpperCase();
         const letraAtual = letrasSequencia[indiceAtual];
         if (letraAtual !== undefined) {
            if (letraDigitada === letraAtual) {
               setAcertos(acertos + 1);
               setIndiceAtual(indiceAtual + 1);
            } else {
               setErros(erros + 1);
            }
         }
      }

      document.addEventListener("keydown", handleKeyDown);
      return () => {
         document.removeEventListener("keydown", handleKeyDown);
      };
   }, [letrasSequencia, indiceAtual, acertos, erros]);

   return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
         <h1>Jogo de Sequência de Letras</h1>
         <p>Pressione as teclas correspondentes à sequência de letras:</p>
         <div>
            {letrasSequencia.map((letra, index) => (
               <span
                  key={index}
                  style={{
                     fontSize: "50px",
                     margin: "10px",
                     backgroundColor:
                        index < indiceAtual
                           ? "green"
                           : index === indiceAtual
                           ? "yellow"
                           : "white",
                  }}
               >
                  {letra}
               </span>
            ))}
         </div>
         <div>
            <p>Acertos: {acertos}</p>
            <p>Erros: {erros}</p>
            {indiceAtual === letrasSequencia.length && (
               <button onClick={iniciarJogo}>Recomeçar</button>
            )}
         </div>
      </div>
   );
}
