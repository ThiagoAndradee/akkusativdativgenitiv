import React from "react";
import Image from "next/image";
import mascotImage from "@/public/logo.png"; // Ajuste o caminho para o logotipo conforme necessário.
import { Button } from "@/components/ui/button";

type TutorialPageProps = {
  onStart: () => void;
  onBack: () => void; 
};

export function TutorialPage({ onStart, onBack }: TutorialPageProps) {
  return (
    <div className="min-h-screen bg-[#ffffff] flex flex-col items-center p-4">
     <div className="absolute top-16 left-4 z-50">
        <button onClick={onBack} className="flex items-center text-blue-600 font-semibold">
        <svg width="24" height="24" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
         <path d="M23.475 39H60V33H23.475L40.275 16.2L36 12L12 36L36 60L40.275 55.8L23.475 39Z" fill="blue"/>
        </svg>
          Back
        </button>
      </div>

      {/* Fundo com bordas arredondadas na parte superior */}
      <div className="absolute bg-[#A7EBFE] w-full h-1/3 rounded-b-4xl top-0 flex items-center justify-center"></div>
      
      {/* Conteúdo principal */}
      <div className="w-full max-w-md mt-8 relative z-10">

        

        {/* Logotipo e Título */}
        <div className="text-center mb-6">
          <Image src={mascotImage} alt="Mascote" width={140} height={140} className="mx-auto" />
          <p className="text-lg font-semibold mt-2 mx-8">A quick reminder of what the declensions in German are...</p>
        </div>

        {/* Tabela de Artigos Definidos */}
        <div className="mb-8">
            <h2 className="text-md font-semibold mb-2">Defined articles:</h2>
            <div className="grid grid-cols-4 gap-2">
                <div className="bg-[#1DA0C4] text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Nominativ</div>
                <div className="bg-black text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Der</div>
                <div className="bg-red-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Die</div>
                <div className="bg-yellow-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Das</div>

                <div className="bg-[#1DA0C4] text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Akkusativ</div>
                <div className="bg-black text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Den</div>
                <div className="bg-red-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Die</div>
                <div className="bg-yellow-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Das</div>

                <div className="bg-[#1DA0C4] text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Dativ</div>
                <div className="bg-black text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Dem</div>
                <div className="bg-red-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Der</div>
                <div className="bg-yellow-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Dem</div>

                <div className="bg-[#1DA0C4] text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Genitiv</div>
                <div className="bg-black text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Des</div>
                <div className="bg-red-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Der</div>
                <div className="bg-yellow-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Des</div>
            </div>
        </div>

        {/* Tabela de Artigos Indefinidos */}

        <div className="mb-8">
            <h2 className="text-md font-semibold mb-2">Undefined articles:</h2>
            <div className="grid grid-cols-4 gap-2">
                <div className="bg-[#1DA0C4] text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Nominativ</div>
                <div className="bg-black text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Der</div>
                <div className="bg-red-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Die</div>
                <div className="bg-yellow-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Das</div>

                <div className="bg-[#1DA0C4] text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Akkusativ</div>
                <div className="bg-black text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Den</div>
                <div className="bg-red-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Die</div>
                <div className="bg-yellow-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Das</div>

                <div className="bg-[#1DA0C4] text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Dativ</div>
                <div className="bg-black text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Dem</div>
                <div className="bg-red-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Der</div>
                <div className="bg-yellow-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Dem</div>

                <div className="bg-[#1DA0C4] text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Genitiv</div>
                <div className="bg-black text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Des</div>
                <div className="bg-red-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Der</div>
                <div className="bg-yellow-500 text-white py-3 px-1 min-h-[3rem] rounded-md font-semibold text-center text-md">Des</div>
            </div>
        </div>


        {/* Botão Start */}
        <div className="flex justify-center">
          <Button onClick={onStart} 
            className="w-full py-3 text-sm font-semibold rounded-lg bg-[#31CD9E] text-white hover:bg-green-600"
            >
            Start
          </Button>
        </div>
      </div>
    </div>
  );
}
