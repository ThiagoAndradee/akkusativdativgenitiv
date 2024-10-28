"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import mascotImage from "@/public/logo.png"
import hintIcon from "@/public/hint-icon.svg"
import showHintIcon from "@/public/showhint-icon.svg"

type Sentence = {
  frase: string
  respostas_certas: string[]
  nominativo: string
  caso: string
}

const allSentences: Sentence[] = [
  { frase: "Ich sehe ___ Mann im Park.", respostas_certas: ["den", "einen"], nominativo: "der Mann", caso: "Akkusativ" },
  { frase: "Das Auto ___ Freundes ist rot.", respostas_certas: ["des"], nominativo: "der Freund", caso: "Genitiv" },
  { frase: "Das djdkksd ___ dskldjksjadk ist dlksjklds.", respostas_certas: ["des"], nominativo: "der Freund", caso: "Genitiv" },
]

type PracticePageProps = {
  totalQuestions: number
  onComplete: (score: number) => void
}

export function PracticePage({ totalQuestions, onComplete }: PracticePageProps) {
  const [sentences, setSentences] = useState<Sentence[]>([])
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [feedback, setFeedback] = useState<{ correct: boolean; message: string } | null>(null)
  const [showFeedbackPanel, setShowFeedbackPanel] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [hasAnswered, setHasAnswered] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [streak, setStreak] = useState(0)

  useEffect(() => {
    const shuffled = [...allSentences].sort(() => Math.random() - 0.5).slice(0, totalQuestions)
    setSentences(shuffled)
  }, [totalQuestions])

  const currentSentence = sentences[currentSentenceIndex]

  const checkAnswer = () => {
    if (!currentSentence || hasAnswered) return

    const isCorrect = currentSentence.respostas_certas.includes(userAnswer.toLowerCase())
    setFeedback({
      correct: isCorrect,
      message: isCorrect ? "Awesome!" : "Not really...",
    })
    setShowFeedbackPanel(true)
    setHasAnswered(true)
    setShowHint(false)

    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1)
      setStreak(prev => prev + 1)
    } else {
      setStreak(0)
    }

    setAnsweredQuestions(prev => prev + 1)

    if (answeredQuestions + 1 >= totalQuestions) {
      onComplete(correctAnswers + (isCorrect ? 1 : 0))
    }
  }

  const nextSentence = () => {
    setShowFeedbackPanel(false) // Esconder o painel antes de passar para a próxima frase

    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1)
      setUserAnswer("")
      setFeedback(null)
      setHasAnswered(false)
    } else {
      onComplete(correctAnswers)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value)
  }

  if (!currentSentence) {
    return <div>Loading...</div>
  }

  const progressPercentage = ((answeredQuestions + 1) / totalQuestions) * 100

  // Dividir a frase em duas partes: antes e depois do espaço em branco
  const [beforeBlank, afterBlank] = currentSentence.frase.split("___")

  return (
    <div className="h-screen flex flex-col bg-[#f5f9ff] relative">
      {/* Header com progresso e vidas */}
      <div className="bg-[#A7EBFE] p-6 pt-72 flex flex-col items-center justify-center rounded-b-4xl relative">
        <Image src={mascotImage} alt="Mascote" width={140} height={140} className="absolute" />
      </div>
      <div className="flex flex-col items-center justify-center px-8 pt-16">
        <Progress value={progressPercentage} className="w-full h-4 mt-4 bg-[#D0EFFF]" />

        {/* Vidas, Dica e Streak */}
        <div className="flex justify-between items-center w-full mt-4">
          <div className="flex flex-row items-center space-x-1 bg-[#FFE3E3] px-4 rounded-full">
            <svg width="24" height="24" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                opacity="0.5"
                d="M51.3299 87.2037C63.8339 84.6997 80.0019 75.7037 80.0019 52.4437C80.0019 31.2797 64.5099 17.1837 53.3699 10.7077C50.8939 9.26772 48.0019 11.1597 48.0019 14.0197V21.3317C48.0019 27.0997 45.5779 37.6277 38.842 42.0077C35.402 44.2437 31.682 40.8957 31.266 36.8157L30.922 33.4637C30.522 29.5677 26.554 27.2037 23.442 29.5797C17.846 33.8397 12.002 41.3197 12.002 52.4397C12.002 80.8837 33.1579 87.9997 43.7339 87.9997C44.3526 87.9997 44.9979 87.9797 45.6699 87.9397C47.4539 87.7157 45.6699 88.3357 51.3299 87.1997"
                fill="#FF0000"
              />
              <path
                d="M32.001 73.7762C32.001 84.2562 40.445 87.4962 45.669 87.9442C47.453 87.7202 45.669 88.3402 51.329 87.2042C55.485 85.7362 60.001 81.9682 60.001 73.7762C60.001 68.5882 56.725 65.3842 54.161 63.8842C53.377 63.4242 52.465 64.0042 52.397 64.9082C52.173 67.7802 49.413 70.0682 47.537 67.8842C45.877 65.9562 45.177 63.1362 45.177 61.3322V58.9722C45.177 57.5562 43.749 56.6122 42.525 57.3402C37.981 60.0322 32.001 65.5762 32.001 73.7762Z"
                fill="white"
              />
            </svg>
            <span className="ml-4 text-black py-1 font-semibold">Streak: {streak}</span>
          </div>

          <button
            onClick={() => setShowHint(true)}
            className="bg-[#FFF59D] text-[#b98e22] px-5 py-1 rounded-full font-semibold flex items-center"
          >
            <Image src={hintIcon} alt="Hint Icon" width={16} height={16} className="mr-1" />
            Hint
          </button>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-col items-center px-6 text-center mt-4 flex-grow">
        <div className="w-full max-w-lg p-4 my-6 rounded-lg border border-gray-300 bg-white flex flex-col items-center">
          <p className="text-lg font-medium mb-2 flex flex-wrap justify-center items-center">
            <span>{beforeBlank}</span>
            <Input
              type="text"
              value={userAnswer}
              onChange={handleInputChange}
              className="inline-block mx-2 p-1 text-center text-md border border-blue-300 rounded-md"
              placeholder="your answer"
              disabled={hasAnswered}
            />
            <span>{afterBlank}</span>
          </p>
        </div>
        {showHint && (
          <div className="w-full px-4 py-4 mt-6 bg-[#DBE9FE] text-[#1D40B0] rounded-lg flex flex-row items-start">
            <Image src={showHintIcon} alt="Show Hint Icon" width={32} height={32} className="mr-2 mb-2" />
            <div className="text-left">
              <p><strong>Fall:</strong> {currentSentence.caso}</p>
              <p><strong>Nominativ:</strong> {currentSentence.nominativo}</p>
            </div>
          </div>
        )}
      </div>

      {/* Botão de submissão fixo próximo ao bottom-0 */}
      <div className="p-6 fixed bottom-0 w-full bg-[#f5f9ff]">
        <Button
          onClick={hasAnswered ? nextSentence : checkAnswer}
          className="w-full py-4 text-lg font-semibold rounded-8 bg-[#31CD9E] text-white hover:bg-[#196951]"
        >
          {hasAnswered ? "Next" : "Submit"}
        </Button>
      </div>

      {/* Painel de Feedback Animado */}
      {showFeedbackPanel && (
        <div
          className={`fixed bottom-0 left-0 w-full p-6 rounded-t-3xl shadow-lg transition-transform transform ${
            feedback?.correct ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"
          } ${showFeedbackPanel ? "translate-y-0" : "translate-y-full"}`}
          style={{ transition: "transform 0.4s ease-in-out" }}
        >
          <h2 className="text-xl font-bold">{feedback?.correct ? "Awesome!" : "Not really..."}</h2>
          <p className="mt-2">Richtige Antwort(en): "{currentSentence.respostas_certas.join(", ")}"</p>
          <Button
            onClick={nextSentence}
            className={`w-full mt-4 py-2 rounded-full ${
              feedback?.correct ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            Continue
            <svg width="24" height="24" viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48.525 39H12V33H48.525L31.725 16.2L36 12L60 36L36 60L31.725 55.8L48.525 39Z" fill="white"/>
            </svg>
          </Button>
        </div>
      )}
    </div>
  )
}
