"use client"

import { useState } from "react"
import { WelcomePage } from "../components/welcome-page"
import { TutorialPage } from "../components/tutorial-page"
import { PracticePage } from "../components/practice-page"
import { ResultsPage } from "../components/results-page"

export function AppComponent() {
  const [currentPage, setCurrentPage] = useState<"welcome" | "tutorial" | "practice" | "results">("welcome")
  const [score, setScore] = useState(0)
  const [challengeType, setChallengeType] = useState<"quick" | "standard" | "challenge">("quick")
  
  // Define o número de perguntas com base no tipo de desafio selecionado
  const totalQuestions = challengeType === "quick" ? 5 : challengeType === "standard" ? 10 : 20

  // Função para iniciar o tutorial
  const startTutorial = (mode: "quick" | "standard" | "challenge") => {
    setChallengeType(mode)
    setCurrentPage("tutorial")
  }

  // Função para iniciar a prática após o tutorial
  const startPractice = () => {
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

  const goBackToWelcome = () => {
    setCurrentPage("welcome")
  }

  switch (currentPage) {
    case "welcome":
      return <WelcomePage onStart={startTutorial} />
    case "tutorial":
      return <TutorialPage onStart={startPractice} onBack={goBackToWelcome} />
    case "practice":
      return <PracticePage totalQuestions={totalQuestions} onComplete={endChallenge} />
    case "results":
      return <ResultsPage score={score} totalQuestions={totalQuestions} onRestart={restartChallenge} />
    default:
      return null
  }
}
