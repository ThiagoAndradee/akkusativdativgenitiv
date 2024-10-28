'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import ReactConfetti from "react-confetti"
import mascotImage from "@/public/logo.png"
import Image from "next/image"
import { useState, useEffect } from "react"

type ResultsPageProps = {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export function ResultsPage({ score, totalQuestions, onRestart }: ResultsPageProps) {
  const [showConfetti, setShowConfetti] = useState(true)
  const percentage = Math.round((score / totalQuestions) * 100)

  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 3000) // confete por 3 segundos
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#f0f3f8] flex flex-col items-center relative">
      
      <div className="bg-[#A7EBFE] p-6 pt-96 flex flex-col items-center justify-center rounded-b-4xl relative w-full">
        <Image src={mascotImage} alt="Mascote" width={140} height={140} className="absolute" />
      </div>

      {showConfetti && <ReactConfetti width={window.innerWidth} height={window.innerHeight} />}
      
      <div className="text-center mb-4 p-4 pt-16">
        <h1 className="text-4xl font-bold text-black mb-2">Gut gemacht!</h1>
        <p className="text-lg">Your final score</p>
        <p className="text-4xl font-bold text-blue-600">{score}/{totalQuestions}</p>
        <p className="text-lg font-semibold text-black">{percentage}%</p>
      </div>

      <Button 
        onClick={onRestart}
        className="mt-8 py-4 w-3/4 max-w-xs rounded-8 bg-[#31CD9E] text-white font-semibold text-lg"
      >
        Play again
      </Button>

      <p className="mt-4 text-gray-600 text-sm text-center">
        Small habits, big evolution. Come back tomorrow for a new challenge.
      </p>
    </div>
  )
}
