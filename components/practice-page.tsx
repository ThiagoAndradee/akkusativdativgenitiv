"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

type Sentence = {
  frase: string
  respostas_certas: string[]
  nominativo: string
  caso: string
}

const allSentences: Sentence[] = [
  { frase: "Ich sehe ___ Mann im Park.", respostas_certas: ["den", "einen"], nominativo: "der Mann", caso: "Akkusativ" },
  { frase: "Das Auto ___ Freundes ist rot.", respostas_certas: ["des"], nominativo: "der Freund", caso: "Genitiv" },
  { frase: "Sie hilft ___ Kind mit den Hausaufgaben.", respostas_certas: ["dem", "einem"], nominativo: "das Kind", caso: "Dativ" },
  { frase: "Die Tasche ___ Frau liegt auf dem Tisch.", respostas_certas: ["der"], nominativo: "die Frau", caso: "Genitiv" },
  { frase: "Er gibt ___ Lehrer das Buch.", respostas_certas: ["dem", "einem"], nominativo: "der Lehrer", caso: "Dativ" },
  { frase: "Ich nehme ___ Apfel aus der Schale.", respostas_certas: ["den", "einen"], nominativo: "der Apfel", caso: "Akkusativ" },
  { frase: "Das Fahrrad ___ Kindes ist neu.", respostas_certas: ["des"], nominativo: "das Kind", caso: "Genitiv" },
  { frase: "Ich spreche mit ___ Arzt über das Problem.", respostas_certas: ["dem", "einem"], nominativo: "der Arzt", caso: "Dativ" },
  { frase: "Sie kauft ___ Blumen für den Garten.", respostas_certas: ["die"], nominativo: "die Blumen", caso: "Akkusativ" },
  { frase: "Der Hut ___ Mannes ist schwarz.", respostas_certas: ["des"], nominativo: "der Mann", caso: "Genitiv" },
  { frase: "Er stellt ___ Stuhl in die Ecke.", respostas_certas: ["den", "einen"], nominativo: "der Stuhl", caso: "Akkusativ" },
  { frase: "Der Bruder ___ Frau ist Lehrer.", respostas_certas: ["der"], nominativo: "die Frau", caso: "Genitiv" },
  { frase: "Sie zeigt ___ Kind das Buch.", respostas_certas: ["dem", "einem"], nominativo: "das Kind", caso: "Dativ" },
  { frase: "Der Hund ___ Nachbarn bellt laut.", respostas_certas: ["des"], nominativo: "der Nachbar", caso: "Genitiv" },
  { frase: "Ich bringe ___ Freundin ein Geschenk.", respostas_certas: ["der", "einer"], nominativo: "die Freundin", caso: "Dativ" },
  { frase: "Er hat ___ Schlüssel verloren.", respostas_certas: ["den", "einen"], nominativo: "der Schlüssel", caso: "Akkusativ" },
  { frase: "Das Handy ___ Mannes klingelt.", respostas_certas: ["des"], nominativo: "der Mann", caso: "Genitiv" },
  { frase: "Sie erzählt ___ Lehrer die Geschichte.", respostas_certas: ["dem", "einem"], nominativo: "der Lehrer", caso: "Dativ" },
  { frase: "Ich finde ___ Buch interessant.", respostas_certas: ["das", "ein"], nominativo: "das Buch", caso: "Akkusativ" },
  { frase: "Das Auto ___ Nachbarn ist blau.", respostas_certas: ["des"], nominativo: "der Nachbar", caso: "Genitiv" }
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
  const [showExplanation, setShowExplanation] = useState(false)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [answeredQuestions, setAnsweredQuestions] = useState(0)
  const [hasAnswered, setHasAnswered] = useState(false)

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
      message: isCorrect ? "Richtig!" : `Falsch. Richtige Antwort(en): "${currentSentence.respostas_certas.join(', ')}"`
    })
    setShowExplanation(true)
    setHasAnswered(true)
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1)
    }
    setAnsweredQuestions(prev => prev + 1)

    if (answeredQuestions + 1 >= totalQuestions) {
      onComplete(correctAnswers + (isCorrect ? 1 : 0))
    }
  }

  const nextSentence = () => {
    if (currentSentenceIndex < sentences.length - 1) {
      setCurrentSentenceIndex(prev => prev + 1)
      setUserAnswer("")
      setFeedback(null)
      setShowExplanation(false)
      setHasAnswered(false)
    } else {
      onComplete(correctAnswers)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserAnswer(e.target.value)
  }

  if (!currentSentence) {
    return <div>Laden...</div>
  }

  const progressPercentage = ((answeredQuestions + 1) / totalQuestions) * 100

  return (
    <div className="h-screen flex flex-col overflow-none">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between">
        <Progress value={progressPercentage} className="w-full h-2" />
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col justify-center p-6 overflow-y-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Füllen Sie die Lücke</h2>
        <p className="mb-6 text-xl font-medium text-center">
          {currentSentence.frase.split('___').map((part, index, array) => (
            <span key={index}>
              {part}
              {index < array.length - 1 && (
                <span className="inline-block w-20 mx-1 border-b-2 border-gray-400"></span>
              )}
            </span>
          ))}
        </p>
        <Input
          type="text"
          value={userAnswer}
          onChange={handleInputChange}
          className="w-full text-center text-lg p-4 mb-6 rounded-full border-2 border-gray-300"
          placeholder="Ihre Antwort"
          disabled={hasAnswered}
        />
        {feedback && (
          <div className={`mb-6 p-4 rounded-lg text-center ${feedback.correct ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            <p>{feedback.message}</p>
          </div>
        )}
        {showExplanation && (
          <div className="mb-6 p-4 bg-blue-100 rounded-lg text-blue-800 text-center">
            <p><strong>Fall:</strong> {currentSentence.caso}</p>
            <p><strong>Nominativ:</strong> {currentSentence.nominativo}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-6">
        <Button 
          onClick={hasAnswered ? nextSentence : checkAnswer} 
          className="w-full py-4 text-lg font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700"
        >
          {hasAnswered ? "Weiter" : "Überprüfen"}
        </Button>
      </div>
    </div>
  )
}
