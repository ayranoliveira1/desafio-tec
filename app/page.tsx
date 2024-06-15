import Image from "next/image";
import Header from "./components/header";
import GtaSGameInit from "./components/gtaS-gamenit";
import GtaVGameInit from "./components/gtaV-gameinit";

export default function Home() {
   return (
      <>
         <Header />

         <main className="w-full h-[755px] animate-fade-in-4s ">
            <div className="container mx-auto flex items-center gap-10 justify-center">
               <section className="mt-10 h-[75vh] bg-[#0f1329d8] w-[390px] flex flex-col items-center shadow-2xl border-solid border-[#0a0d1f] border-2">
                  <div className="mt-10 flex flex-col items-center gap-5">
                     <Image
                        src={"/image1.png"}
                        alt="logo"
                        width={100}
                        height={100}
                        className="rounded-full border-solid border border-yellow-500"
                     />

                     <h1 className="text-white text-lg">Objetivo do jogo</h1>

                     <p className="text-white text-sm px-10">
                        O objetivo deste jogo é desafiar os usuários a digitarem
                        códigos de trapaça de vários jogos, testando e
                        aprimorando suas habilidades de digitação e
                        familiaridade com diferentes combinações de teclas. Ao
                        praticar a entrada rápida e precisa desses códigos, os
                        jogadores podem melhorar sua destreza manual e agilidade
                        ao teclado, ao mesmo tempo em que exploram ou revisitam
                        truques e segredos de jogos populares.
                     </p>
                  </div>
               </section>

               <section className="mt-10 h-[75vh] bg-[#0f1329d8] w-[800px] shadow-2xl border-solid border-[#0f1329] border-2">
                  <div className="mt-10 flex items-center gap-16 px-5">
                     <div className="flex flex-col gap-2 items-center w-[200px]">
                        <h1 className="text-white text-lg ">GTA San Andreas</h1>

                        <Image
                           src={"/gtaS.png"}
                           alt="logo"
                           width={200}
                           height={200}
                        />

                        <div className="mx-auto">
                           <GtaSGameInit />
                        </div>
                     </div>

                     <div className="flex flex-col gap-2 items-center w-[200px]">
                        <h1 className="text-white text-lg ">GTA V</h1>

                        <Image
                           src={"/gtaV.png"}
                           alt="logo"
                           width={188}
                           height={200}
                        />

                        <div className="mx-auto">
                           <GtaVGameInit />
                        </div>
                     </div>
                  </div>
               </section>
            </div>
         </main>
      </>
   );
}
