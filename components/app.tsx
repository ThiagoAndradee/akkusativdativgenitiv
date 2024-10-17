"use client"

import { useState } from "react"
import { WelcomePage } from "../components/welcome-page"
import { PracticePage } from "../components/practice-page"
import { ResultsPage } from "../components/results-page"

export function AppComponent() {
  const [currentPage, setCurrentPage] = useState<"welcome" | "practice" | "results">("welcome")
  const [score, setScore] = useState(0)
  const totalQuestions = 20

  const startChallenge = () => {
    setCurrentPage("practice")
  }

  const endChallenge = (finalScore: number) => {
    setScore(finalScore)
    setCurrentPage("results")
  }

  const restartChallenge = () => {
    setCurrentPage("welcome")
    setScore(0)
  }

  switch (currentPage) {
    case "welcome":
      return <WelcomePage onStart={startChallenge} />
    case "practice":
      return <PracticePage totalQuestions={totalQuestions} onComplete={endChallenge} />
    case "results":
      return <ResultsPage score={score} totalQuestions={totalQuestions} onRestart={restartChallenge} />
    default:
      return null
  }
}