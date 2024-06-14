"use client";

import Image from "next/image";
import GameInit from "./components/gameInit";

export default function Home() {
   return (
      <>
         <header className="bg-[#0f1329d8] w-full h-[160px]"> </header>

         <main className="w-full h-[785px] bg-bgFundo bg-cover">
            <div className="container mx-auto flex items-center gap-10 justify-center">
               <section className="mt-10 h-[75vh] bg-[#0f1329d8] w-[390px] flex flex-col items-center shadow-lg">
                  <div className="mt-10 flex flex-col items-center gap-5">
                     <Image
                        src={"/images.png"}
                        alt="logo"
                        width={100}
                        height={100}
                        className="rounded-full border-solid border border-yellow-500"
                     />

                     <h1 className="text-white text-lg">
                        Ranking - Melhores tempos
                     </h1>
                  </div>
               </section>

               <section className="mt-10 h-[75vh] bg-[#0f1329d8] w-[800px] shadow-lg">
                  <div className="mt-10 flex flex-col gap-5 px-5">
                     <h1 className="text-white text-2xl text-center">
                        Teste suas abilidades de digitação com codigos
                     </h1>

                     <div className="flex flex-col gap-2 items-center w-[200px]">
                        <h1 className="text-white text-lg ">GTA San Andreas</h1>

                        <Image
                           src={"/gta.png"}
                           alt="logo"
                           width={200}
                           height={200}
                        />

                        <div className="mx-auto">
                           <GameInit />
                        </div>
                     </div>
                  </div>
               </section>
            </div>
         </main>
      </>
   );
}
