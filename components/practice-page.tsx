"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"

type Sentence = {
  frase: string
  resposta_correta: string
  nominativo: string
  caso: string
}

const allSentences: Sentence[] = [
  { frase: "Der Geschmack ___ Essens ist gut.", resposta_correta: "des", nominativo: "das Essen", caso: "Genitiv" },
  { frase: "Ich gebe ___ Frau das Buch.", resposta_correta: "der", nominativo: "die Frau", caso: "Dativ" },
  { frase: "Er hat ___ Hund gesehen.", resposta_correta: "den", nominativo: "der Hund", caso: "Akkusativ" },
  { frase: "Die Farbe ___ Autos ist rot.", resposta_correta: "des", nominativo: "das Auto", caso: "Genitiv" },
  { frase: "Wir helfen ___ Kind mit den Hausaufgaben.", resposta_correta: "dem", nominativo: "das Kind", caso: "Dativ" },
  { frase: "Sie trägt ___ Kleid.", resposta_correta: "das", nominativo: "das Kleid", caso: "Akkusativ" },
  { frase: "Das Haus ___ Frau ist schön.", resposta_correta: "der", nominativo: "die Frau", caso: "Genitiv" },
  { frase: "Er dankt ___ Mann für die Hilfe.", resposta_correta: "dem", nominativo: "der Mann", caso: "Dativ" },
  { frase: "Ich kaufe ___ Tisch.", resposta_correta: "den", nominativo: "der Tisch", caso: "Akkusativ" },
  { frase: "Die Tür ___ Hauses ist offen.", resposta_correta: "des", nominativo: "das Haus", caso: "Genitiv" },
  { frase: "Wir folgen ___ Anweisungen.", resposta_correta: "den", nominativo: "die Anweisungen", caso: "Dativ" },
  { frase: "Sie vertraut ___ Freund.", resposta_correta: "dem", nominativo: "der Freund", caso: "Dativ" },
  { frase: "Das Buch ___ Lehrers ist interessant.", resposta_correta: "des", nominativo: "der Lehrer", caso: "Genitiv" },
  { frase: "Er gibt ___ Katze Futter.", resposta_correta: "der", nominativo: "die Katze", caso: "Dativ" },
  { frase: "Ich sehe ___ Vogel im Baum.", resposta_correta: "den", nominativo: "der Vogel", caso: "Akkusativ" },
  { frase: "Die Qualität ___ Produkts ist hoch.", resposta_correta: "des", nominativo: "das Produkt", caso: "Genitiv" },
  { frase: "Sie hilft ___ Nachbarn beim Umzug.", resposta_correta: "dem", nominativo: "der Nachbar", caso: "Dativ" },
  { frase: "Wir besuchen ___ Museum heute.", resposta_correta: "das", nominativo: "das Museum", caso: "Akkusativ" },
  { frase: "Der Preis ___ Tickets ist günstig.", resposta_correta: "des", nominativo: "das Ticket", caso: "Genitiv" },
  { frase: "Er schenkt ___ Mutter Blumen.", resposta_correta: "der", nominativo: "die Mutter", caso: "Dativ" },
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

    const isCorrect = userAnswer.toLowerCase() === currentSentence.resposta_correta.toLowerCase()
    setFeedback({
      correct: isCorrect,
      message: isCorrect ? "Richtig!" : `Falsch. Richtige Antwort: "${currentSentence.resposta_correta}"`
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
    <div className="min-h-screen bg-[#f0f3f8] flex flex-col">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between">
        <Progress value={progressPercentage} className="w-full h-2" />
      </div>

      {/* Main content */}
      <div className="flex-grow flex flex-col justify-center p-6">
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