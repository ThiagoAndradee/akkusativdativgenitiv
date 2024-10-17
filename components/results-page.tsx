'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type ResultsPageProps = {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export function ResultsPage({ score, totalQuestions, onRestart }: ResultsPageProps) {
  const percentage = (score / totalQuestions) * 100

  return (
    <div className="min-h-screen bg-[#f0f3f8] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
          Challenge Completed!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-lg mb-4">
          Your final score:
                    </p>
          <p className="text-center text-3xl font-bold text-blue-600">
            {score} / {totalQuestions}
          </p>
          <p className="text-center text-lg mt-4">
            {percentage}% 
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={onRestart}
            className="w-full py-4 text-lg font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Play again
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}