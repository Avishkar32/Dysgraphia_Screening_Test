"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { SpaceBackground } from "@/components/space-background"
import { Upload, Home, Star } from "lucide-react"
import Image from "next/image"

export default function ResultsPage() {
  const [childName, setChildName] = useState("")
  const [earlyCompletions, setEarlyCompletions] = useState(0)
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    // Get child's info from localStorage
    const name = localStorage.getItem("childName")
    const completions = localStorage.getItem("earlyCompletions")

    if (!name) {
      router.push("/")
      return
    }

    setChildName(name)
    setEarlyCompletions(completions ? Number.parseInt(completions) : 0)
  }, [router])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file))
      setUploadedImages((prev) => [...prev, ...newImages])
    }
  }

  const handleRestart = () => {
    // Clear localStorage except for name and age
    const name = localStorage.getItem("childName")
    const age = localStorage.getItem("childAge")

    localStorage.clear()

    if (name) localStorage.setItem("childName", name)
    if (age) localStorage.setItem("childAge", age)

    localStorage.setItem("earlyCompletions", "0")

    router.push("/")
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <SpaceBackground />
      <Card className="w-[350px] md:w-[600px] bg-white/90 backdrop-blur-sm shadow-xl z-10 border-purple-200">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-2">
            <div className="relative">
              <Star className="h-12 w-12 text-yellow-400 animate-pulse" />
              <Star className="h-8 w-8 text-yellow-300 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center text-purple-700">Congratulations, {childName}!</CardTitle>
          <CardDescription className="text-center text-lg">You completed the space writing adventure!</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="bg-purple-100 p-4 rounded-xl mb-6 text-center">
            <p className="text-purple-800 font-medium">
              You finished writing {earlyCompletions} times before the timer ran out!
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-center font-medium">Upload your handwritten samples:</p>

            <div className="flex justify-center">
              <label htmlFor="image-upload" className="cursor-pointer">
                <div className="flex items-center justify-center gap-2 bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium py-2 px-4 rounded-full transition-all duration-300">
                  <Upload className="h-5 w-5" />
                  <span>Upload Images</span>
                </div>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {uploadedImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-4">
                {uploadedImages.map((src, index) => (
                  <div
                    key={index}
                    className="relative aspect-square rounded-lg overflow-hidden border-2 border-purple-200"
                  >
                    <Image
                      src={src || "/placeholder.svg"}
                      alt={`Uploaded sample ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleRestart}
            className="bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold py-2 px-4 rounded-full transition-all duration-300 hover:scale-105"
          >
            <Home className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}
