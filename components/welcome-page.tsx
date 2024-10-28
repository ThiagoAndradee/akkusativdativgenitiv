'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import mascotImage from "@/public/logo.png" // Coloque a imagem da mascote no diretório público e ajuste o caminho conforme necessário.

type WelcomePageProps = {
  onStart: (mode: "quick" | "standard" | "challenge") => void
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-[#ffffff] flex items-center justify-center p-4">
      <div className="absolute bg-[#A7EBFE] w-full h-1/3 rounded-b-4xl top-0 flex items-center justify-center"></div>
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <div className="flex justify-center relative">
            <Image src={mascotImage} alt="Mascote" width={300} height={300} className="relative z-10" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold mb-2">
            Daily new German challenges
          </p>
          <p className="text-md text-gray-600 mb-4">
            Are you ready to ace German declensions?
          </p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button 
            onClick={() => onStart("quick")}
            className="w-full py-3 text-sm font-semibold rounded-lg bg-[#31CD9E] text-white hover:bg-green-600"
          >
            Quick (5 questions)
          </Button>
          <Button 
            onClick={() => onStart("standard")}
            className="w-full py-3 text-sm font-semibold rounded-lg bg-[#1DA0C4] text-white hover:bg-blue-600"
          >
            Standard (10 questions)
          </Button>
          <Button 
            onClick={() => onStart("challenge")}
            className="w-full py-3 text-sm font-semibold rounded-lg bg-[#1D1DC4] text-white hover:bg-purple-600"
          >
            Challenge (20 questions)
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
