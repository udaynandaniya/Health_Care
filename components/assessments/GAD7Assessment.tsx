"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { toast } from "react-hot-toast"

const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid, as if something awful might happen",
]

const RESPONSE_OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
]

interface GAD7AssessmentProps {
  onComplete: (result: any) => void
  onBack: () => void
}

export default function GAD7Assessment({ onComplete, onBack }: GAD7AssessmentProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [responses, setResponses] = useState<number[]>(new Array(GAD7_QUESTIONS.length).fill(-1))
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleResponse = (score: number) => {
    const newResponses = [...responses]
    newResponses[currentQuestion] = score
    setResponses(newResponses)
  }

  const nextQuestion = () => {
    if (currentQuestion < GAD7_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const calculateResult = () => {
    const totalScore = responses.reduce((sum, score) => sum + score, 0)
    let level = ""
    let description = ""
    let recommendations: string[] = []

    if (totalScore <= 4) {
      level = "Minimal"
      description = "Minimal anxiety symptoms"
      recommendations = [
        "Continue current coping strategies",
        "Practice relaxation techniques",
        "Maintain regular exercise routine",
      ]
    } else if (totalScore <= 9) {
      level = "Mild"
      description = "Mild anxiety symptoms"
      recommendations = [
        "Practice deep breathing exercises",
        "Try mindfulness or meditation",
        "Consider stress management techniques",
        "Monitor symptoms",
      ]
    } else if (totalScore <= 14) {
      level = "Moderate"
      description = "Moderate anxiety symptoms"
      recommendations = [
        "Consider speaking with a healthcare professional",
        "Cognitive behavioral therapy may be helpful",
        "Practice regular relaxation techniques",
        "Limit caffeine and alcohol",
      ]
    } else {
      level = "Severe"
      description = "Severe anxiety symptoms"
      recommendations = [
        "Seek professional help immediately",
        "Consider therapy and/or medication",
        "Build a strong support network",
        "Avoid triggers when possible",
      ]
    }

    return { totalScore, level, description, recommendations }
  }

  const submitAssessment = async () => {
    setIsSubmitting(true)
    try {
      const result = calculateResult()
      const assessmentData = {
        type: "gad7",
        responses: GAD7_QUESTIONS.map((question, index) => ({
          question,
          answer: RESPONSE_OPTIONS[responses[index]]?.label || "",
          score: responses[index],
        })),
        score: result.totalScore,
        result: {
          level: result.level,
          description: result.description,
          recommendations: result.recommendations,
        },
      }

      const response = await fetch("/api/user/assessments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(assessmentData),
      })

      if (response.ok) {
        toast.success("✅ Assessment completed successfully!")
        onComplete(result)
      } else {
        toast.error("Failed to save assessment")
      }
    } catch (error) {
      console.error("Error submitting assessment:", error)
      toast.error("Error submitting assessment")
    } finally {
      setIsSubmitting(false)
    }
  }

  const progress = ((currentQuestion + 1) / GAD7_QUESTIONS.length) * 100
  const canProceed = responses[currentQuestion] !== -1
  const isLastQuestion = currentQuestion === GAD7_QUESTIONS.length - 1
  const allQuestionsAnswered = responses.every((response) => response !== -1)

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-6 h-6 text-yellow-500" />
              <CardTitle>GAD-7 Anxiety Assessment</CardTitle>
            </div>
            <Badge variant="outline">
              {currentQuestion + 1} of {GAD7_QUESTIONS.length}
            </Badge>
          </div>
          <Progress value={progress} className="w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Over the last 2 weeks, how often have you been bothered by:
            </p>
          </div>

          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {GAD7_QUESTIONS[currentQuestion]}
              </h3>
              <div className="space-y-3">
                {RESPONSE_OPTIONS.map((option, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleResponse(option.value)}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                      responses[currentQuestion] === option.value
                        ? "border-yellow-500 bg-yellow-100 dark:bg-yellow-900/40"
                        : "border-gray-200 dark:border-gray-700 hover:border-yellow-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{option.label}</span>
                      {responses[currentQuestion] === option.value && (
                        <CheckCircle className="w-5 h-5 text-yellow-500" />
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="flex items-center justify-between pt-6">
            <Button variant="outline" onClick={onBack} className="flex items-center space-x-2 bg-transparent">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Assessments</span>
            </Button>

            <div className="flex items-center space-x-3">
              {currentQuestion > 0 && (
                <Button variant="outline" onClick={prevQuestion}>
                  Previous
                </Button>
              )}

              {!isLastQuestion ? (
                <Button onClick={nextQuestion} disabled={!canProceed}>
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={submitAssessment}
                  disabled={!allQuestionsAnswered || isSubmitting}
                  className="bg-yellow-600 hover:bg-yellow-700"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                      />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Complete Assessment
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
