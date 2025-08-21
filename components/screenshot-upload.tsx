"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, CheckCircle, ImageIcon, X } from "lucide-react"

interface ScreenshotUploadProps {
  onUpload: (file: File) => void
  uploaded: boolean
  playerName: string
}

export function ScreenshotUpload({ onUpload, uploaded, playerName }: ScreenshotUploadProps) {
  const [dragOver, setDragOver] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      onUpload(file)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const clearUpload = () => {
    setPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  if (uploaded && preview) {
    return (
      <Card className="border-green-200 bg-green-50 dark:bg-green-950/20">
        <CardContent className="p-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                <span className="font-medium">Screenshot Uploaded</span>
              </div>
              <Button variant="ghost" size="sm" onClick={clearUpload}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <img
                src={preview || "/placeholder.svg"}
                alt="Match result screenshot"
                className="w-full rounded-lg max-h-48 object-cover"
              />
            </div>
            <div className="text-sm text-green-700 dark:text-green-300">
              Your screenshot has been submitted for verification
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Card
        className={`border-2 border-dashed transition-colors ${
          dragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25"
        }`}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault()
          setDragOver(true)
        }}
        onDragLeave={() => setDragOver(false)}
      >
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
              <Upload className="h-6 w-6 text-muted-foreground" />
            </div>
            <div>
              <div className="font-medium mb-2">Upload Match Result Screenshot</div>
              <div className="text-sm text-muted-foreground mb-4">
                Drag and drop your screenshot here, or click to browse
              </div>
              <Button variant="outline" onClick={() => fileInputRef.current?.click()} className="bg-transparent">
                <ImageIcon className="h-4 w-4 mr-2" />
                Choose File
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileInput} className="hidden" />

      <div className="text-xs text-muted-foreground space-y-1">
        <div>• Accepted formats: JPG, PNG, GIF</div>
        <div>• Maximum file size: 10MB</div>
        <div>• Ensure the final score and player names are clearly visible</div>
      </div>
    </div>
  )
}
