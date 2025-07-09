"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Brain, AlertTriangle, CheckCircle, ArrowLeft, Home, Phone } from "lucide-react"

interface AssessmentResultsProps {
  type: string
  result: {
    totalScore: number
    level: string
    description: string
    recommendations: string[]
  }
  onBack: () => void
  onReturnToDashboard: () => void
}

export default function AssessmentResults({ type, result, onBack, onReturnToDashboard }: AssessmentResultsProps) {
  const getIcon = () => {
    return type === "phq9" ? (
      <Brain className="w-8 h-8 text-blue-500" />
    ) : (
      <AlertTriangle className="w-8 h-8 text-yellow-500" />
    )
  }

  const getTitle = () => {
    return type === "phq9" ? "PHQ-9 Depression Assessment Results" : "GAD-7 Anxiety Assessment Results"
  }

  const getScoreColor = () => {
    if (result.level === "Minimal") return "text-green-600"
    if (result.level === "Mild") return "text-yellow-600"
    if (result.level === "Moderate") return "text-orange-600"
    return "text-red-600"
  }

  const getBadgeColor = () => {
    if (result.level === "Minimal") return "bg-green-100 text-green-800"
    if (result.level === "Mild") return "bg-yellow-100 text-yellow-800"
    if (result.level === "Moderate") return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  const shouldShowCrisisAlert = () => {
    return result.level === "Severe" || result.level === "Moderately Severe"
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Crisis Alert */}
      {shouldShowCrisisAlert() && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mb-6">
          <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-red-800 dark:text-red-200">
                    Important: Professional Help Recommended
                  </p>
                  <p className="text-red-700 dark:text-red-300 text-sm mt-1">
                    Your assessment indicates you may benefit from professional support. Please consider reaching out to
                    a healthcare provider or crisis helpline.
                  </p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-red-500 text-red-700 hover:bg-red-50 bg-transparent"
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Get Help
                </Button>
              </div>
            </AlertDescription>
          </Alert>
        </motion.div>
      )}

      {/* Results Card */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-3">
              {getIcon()}
              <div>
                <CardTitle>{getTitle()}</CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Assessment completed successfully</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Score Summary */}
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Your Score</p>
                  <p className={`text-4xl font-bold ${getScoreColor()}`}>{result.totalScore}</p>
                  <p className="text-sm text-gray-500">out of {type === "phq9" ? "27" : "21"} total points</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Severity Level</p>
                  <Badge className={`text-lg px-4 py-2 ${getBadgeColor()}`}>{result.level}</Badge>
                  <p className="text-sm text-gray-500 mt-2">{result.description}</p>
                </div>
              </div>
            </div>

            {/* Recommendations */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Personalized Recommendations</span>
              </h3>
              <div className="space-y-3">
                {result.recommendations.map((recommendation, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  >
                    <div className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300">{recommendation}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Important Note */}
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
              <p className="text-sm text-amber-800 dark:text-amber-200">
                <strong>Important:</strong> This assessment is for informational purposes only and should not replace
                professional medical advice. If you're experiencing severe symptoms or having thoughts of self-harm,
                please seek immediate professional help or contact a crisis helpline.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-6 border-t">
              <Button variant="outline" onClick={onBack} className="flex items-center space-x-2 bg-transparent">
                <ArrowLeft className="w-4 h-4" />
                <span>Take Another Assessment</span>
              </Button>
              <Button onClick={onReturnToDashboard} className="flex items-center space-x-2">
                <Home className="w-4 h-4" />
                <span>Return to Dashboard</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
