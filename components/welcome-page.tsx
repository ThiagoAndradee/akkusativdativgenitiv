'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

type WelcomePageProps = {
  onStart: () => void
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-[#f0f3f8] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
          Daily Case Challenge in German
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-4">
          Test your knowledge of German cases with 20 challenging questions!          </p>
          <p className="text-center text-sm text-gray-600">
          Akkusativ, Dativ, and Genitiv - are you ready?
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={onStart}
            className="w-full py-4 text-lg font-semibold rounded-full bg-blue-600 text-white hover:bg-blue-700"
          >
            Start Challenge
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}