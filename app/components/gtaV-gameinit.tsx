"use client";

import { IoCloseSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import { listaDeCodigosGtaV, sortearCodigo } from "@/lib/gerador_codigo";

import {
   AlertDialog,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import AnimateText from "./animate";

const GtaVGameInit = () => {
   const [openInitial, setOpenInitial] = useState<string>("");
   const [openGame, setOpenGame] = useState<string>("hidden");
   const [openKeyError, setOpenKeyError] = useState<string>("hidden");
   const [final, setFinal] = useState<string>("hidden");
   const [erroTempo, setErroTempo] = useState<string>("hidden");

   // configuração do tempo
   const tempoLimite = 7;

   const [letrasSequencia, setLetrasSequencia] = useState<string[]>([]);
   const [indiceAtual, setIndiceAtual] = useState<number>(0);
   const [erros, setErros] = useState<string>("");
   const [tempoRestante, setTempoRestante] = useState<number>(tempoLimite);
   const [text, setText] = useState<string>("");

   // funções de audio
   const audioComplete = () => {
      const audio = new Audio("/completeV.mp3");
      audio.volume = 0.4;
      audio.play();
   };

   const audioKey = () => {
      const audio = new Audio("/keyV.mp3");
      audio.volume = 0.5;
      audio.play();
   };

   // funções de inicialização do jogo
   const handleClickInit = () => {
      setOpenInitial("hidden");
      setOpenGame("");
   };

   function iniciarJogo() {
      const novaSequencia = sortearCodigo(listaDeCodigosGtaV).split("");
      setLetrasSequencia(novaSequencia);
      setIndiceAtual(0);
      setTempoRestante(tempoLimite);
   }

   // funções de finalização do jogo
   function finalizarJogo() {
      setIndiceAtual(0);
      setTempoRestante(2 ^ 999999);
   }

   useEffect(() => {
      iniciarJogo();
   }, []);

   useEffect(() => {
      function handleKeyDown(event: KeyboardEvent) {
         const letraDigitada = event.key.toUpperCase();
         const letraAtual = letrasSequencia[indiceAtual];

         // verificando se a letra pressionada e a correta ou incorreta
         if (letraDigitada === letraAtual) {
            setIndiceAtual(indiceAtual + 1);
            audioKey();
         } else {
            setErros("hidden");
            setOpenKeyError("");
            finalizarJogo();
         }
      }
      // adicionando evento de teclado
      document.addEventListener("keypress", handleKeyDown);
      return () => {
         document.removeEventListener("keypress", handleKeyDown);
      };
   }, [letrasSequencia, indiceAtual, erros]);

   // verificando se todas as teclas foram digitadas corretamente
   useEffect(() => {
      if (
         indiceAtual === letrasSequencia.length &&
         letrasSequencia.length > 0
      ) {
         setOpenGame("hidden");
         setFinal("");
         setText("Missão concluída!");
         audioComplete();
         finalizarJogo();
      }
   }, [indiceAtual, letrasSequencia]);

   // verificando se o tempo do jogo acabou
   useEffect(() => {
      const timer = setInterval(() => {
         if (tempoRestante > 0) {
            setTempoRestante(tempoRestante - 1);
         } else {
            clearInterval(timer);
            setOpenGame("hidden");
            setErroTempo("");
         }
      }, 1000);

      return () => clearInterval(timer);
   }, [tempoRestante]);

   // estilos de barra de progresso
   const barraProgressoEstilo = {
      width: `${(tempoRestante / tempoLimite) * 100}%`,
      transition: "width 1s linear",
   };

   return (
      <AlertDialog>
         <AlertDialogTrigger
            onClick={() => {
               iniciarJogo();
               setOpenKeyError("hidden");
               setErroTempo("hidden");
            }}
            className="w-[90px] h-[36px] text-white bg-yellow-500 bg-background hover:bg-foreground hover:text-white inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
         >
            Começar
         </AlertDialogTrigger>

         <AlertDialogContent className="text-center bg-foreground border-yellow-500">
            <div className={`flex flex-col gap-5 relative ${openInitial}`}>
               <h1 className="text-2xl text-yellow-500 font-semibold ">
                  Mini-Game
               </h1>
               <Button
                  onClick={() => {
                     setOpenGame("");
                     setErros("");
                     handleClickInit();
                     iniciarJogo();
                  }}
                  variant="default"
                  className="w-[180px] h-[60px] border-none text-white text-lg bg-yellow-500 mx-auto"
               >
                  Iniciar jogo
               </Button>

               <AlertDialogCancel className="bg-transparent w-[25px] h-[25px] p-0 rounded-full hover:bg-transparent hover:border-yellow-200 border-yellow-500 absolute -right-2 -top-2">
                  <IoCloseSharp
                     className="text-yellow-500 bg-transparent hover:text-yellow-200 pr-[1px] pt-[1px]"
                     size={16}
                  />
               </AlertDialogCancel>
            </div>

            <div
               className={`${openGame} ${erros} relative text-white flex items-center flex-col gap-4`}
            >
               <h1 className="text-2xl text-yellow-500 font-semibold ">
                  Mini-Game
               </h1>

               <p className="text-sm -mb-2">
                  Pressione as teclas na ordem correta.
               </p>

               <div className="flex items-center justify-center gap-1 pb-8">
                  {letrasSequencia.map((letra, index) => (
                     <div
                        key={index}
                        style={{
                           backgroundColor:
                              index < indiceAtual
                                 ? "green"
                                 : index === indiceAtual
                                 ? "#09121d"
                                 : "transparent",
                        }}
                        className={`border flex justify-center items-center
                                      border-[#aaaaaa] w-[50px] h-[50px] rounded-md`}
                     >
                        <p className="text-3xl">{letra}</p>
                     </div>
                  ))}
               </div>

               <div
                  className="absolute left-0 bottom-0 bg-yellow-500 w-[440px] h-[10px]"
                  style={barraProgressoEstilo}
               ></div>
            </div>

            <div
               className={`${openKeyError} text-white flex items-center flex-col gap-4`}
            >
               <h1 className="text-2xl text-yellow-500 font-semibold ">
                  Mini-Game
               </h1>

               <p className="text-sm ">Você errou!</p>

               <div className="flex items-center gap-2">
                  <AlertDialogCancel
                     onClick={() => {
                        setOpenKeyError("hidden");
                        setOpenInitial("");
                        iniciarJogo();
                     }}
                     className="inline-flex items-center justify-center whitespace-nowrap rounded-md  mx-auto font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg- text-primary-foreground hover:bg-primary/90 w-[180px] h-[50px] text-white text-lg border-[#4b4b4b] hover:text-white"
                  >
                     Sair
                  </AlertDialogCancel>

                  <Button
                     onClick={() => {
                        setOpenKeyError("hidden");
                        setErros("");
                        iniciarJogo();
                     }}
                     variant="default"
                     className="w-[180px] h-[50px] border-none text-white text-lg bg-yellow-500 mx-auto"
                  >
                     Tente novamente
                  </Button>
               </div>
            </div>

            <div
               className={`${final} text-white flex items-start flex-col gap-4`}
            >
               <h1 className="text-2xl text-yellow-500 font-semibold mx-auto">
                  Mini-Game
               </h1>

               <div className="ml-[155px]">
                  <AnimateText text={text} />
               </div>

               <div className="flex items-center gap-2 mx-auto">
                  <AlertDialogCancel
                     onClick={() => {
                        setFinal("hidden");
                        setOpenInitial("");
                        iniciarJogo();
                        setText("");
                     }}
                     className="inline-flex items-center justify-center whitespace-nowrap rounded-md  mx-auto font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg- text-primary-foreground hover:bg-primary/90 w-[180px] h-[50px] text-white text-lg border-[#4b4b4b] hover:text-white"
                  >
                     Sair
                  </AlertDialogCancel>
                  <Button
                     onClick={() => {
                        setFinal("hidden");
                        setOpenGame("");
                        iniciarJogo();
                        setText("");
                     }}
                     variant="default"
                     className="w-[180px] h-[50px] border-none text-white text-lg bg-yellow-500 mx-auto"
                  >
                     Jogar novamente
                  </Button>
               </div>
            </div>

            <div
               className={`${erroTempo} text-white flex items-center flex-col relative gap-4`}
            >
               <h1 className="text-2xl text-yellow-500 font-semibold ">
                  Mini-Game
               </h1>

               <p className="text-sm ">Você perdeu!</p>

               <div className="flex items-center gap-2">
                  <AlertDialogCancel
                     onClick={() => {
                        setErroTempo("hidden");
                        setOpenInitial("");
                        iniciarJogo();
                     }}
                     className="inline-flex items-center justify-center whitespace-nowrap rounded-md  mx-auto font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg- text-primary-foreground hover:bg-primary/90 w-[180px] h-[50px] text-white text-lg border-[#4b4b4b] hover:text-white"
                  >
                     Sair
                  </AlertDialogCancel>

                  <Button
                     onClick={() => {
                        setErroTempo("hidden");
                        setOpenGame("");
                        iniciarJogo();
                     }}
                     variant="default"
                     className="w-[180px] h-[50px] border-none text-white text-lg bg-yellow-500 mx-auto"
                  >
                     Tente novamente
                  </Button>
               </div>
            </div>
         </AlertDialogContent>
      </AlertDialog>
   );
};

export default GtaVGameInit;
