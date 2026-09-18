"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  ExternalLink,
  Download,
  Maximize2,
  ZoomIn,
  ZoomOut,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface MediaItem {
  type: "image" | "video" | "presentation"
  src: string
  alt?: string
  title?: string
  thumbnail?: string
  embedUrl?: string // For embedded presentations (Google Slides, PowerPoint Online, etc.)
  downloadUrl?: string // For downloadable files
  presentationType?: "pdf" | "embed" | "link" // Type of presentation
}

interface MediaCarouselProps {
  items: MediaItem[]
  className?: string
}

export default function MediaCarousel({ items, className }: MediaCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({})
  const [pdfError, setPdfError] = useState<{ [key: number]: boolean }>({})
  const [pdfScale, setPdfScale] = useState(1)
  const [loadingStates, setLoadingStates] = useState<{ [key: number]: boolean }>({})
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())

  // Preload images for better performance
  const preloadImage = useCallback(
    (src: string, index: number) => {
      if (preloadedImages.has(src)) return Promise.resolve()

      return new Promise<void>((resolve, reject) => {
        setLoadingStates((prev) => ({ ...prev, [index]: true }))

        const img = new Image()
        img.onload = () => {
          setPreloadedImages((prev) => new Set(prev).add(src))
          setLoadingStates((prev) => ({ ...prev, [index]: false }))
          resolve()
        }
        img.onerror = () => {
          setLoadingStates((prev) => ({ ...prev, [index]: false }))
          reject(new Error(`Failed to load image: ${src}`))
        }
        img.src = src
      })
    },
    [preloadedImages],
  )

  // Preload adjacent images for smoother navigation
  useEffect(() => {
    const preloadAdjacent = async () => {
      const imagesToPreload = []

      // Current image
      if (items[currentIndex]?.type === "image") {
        imagesToPreload.push({ src: items[currentIndex].src, index: currentIndex })
      }

      // Next image
      const nextIndex = (currentIndex + 1) % items.length
      if (items[nextIndex]?.type === "image") {
        imagesToPreload.push({ src: items[nextIndex].src, index: nextIndex })
      }

      // Previous image
      const prevIndex = (currentIndex - 1 + items.length) % items.length
      if (items[prevIndex]?.type === "image") {
        imagesToPreload.push({ src: items[prevIndex].src, index: prevIndex })
      }

      // Preload images
      imagesToPreload.forEach(({ src, index }) => {
        if (!preloadedImages.has(src)) {
          preloadImage(src, index).catch(console.warn)
        }
      })
    }

    preloadAdjacent()
  }, [currentIndex, items, preloadImage, preloadedImages])

  // Auto-play functionality for images
  useEffect(() => {
    if (isPlaying && items[currentIndex]?.type === "image") {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length)
      }, 4000)
      return () => clearInterval(interval)
    }
  }, [isPlaying, currentIndex, items.length])

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setPdfScale(1) // Reset zoom when changing slides
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)
    setPdfScale(1)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length)
    setPdfScale(1)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const zoomIn = () => {
    setPdfScale((prev) => Math.min(prev + 0.25, 3))
  }

  const zoomOut = () => {
    setPdfScale((prev) => Math.max(prev - 0.25, 0.5))
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50

    if (isLeftSwipe) {
      goToNext()
    } else if (isRightSwipe) {
      goToPrevious()
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
      if (e.key === "Escape") setIsFullscreen(false)
      if (e.key === " ") {
        e.preventDefault()
        togglePlayPause()
      }
      if (e.key === "+" || e.key === "=") {
        e.preventDefault()
        zoomIn()
      }
      if (e.key === "-") {
        e.preventDefault()
        zoomOut()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Handle image load errors
  const handleImageError = (index: number) => {
    setImageError((prev) => ({ ...prev, [index]: true }))
    setLoadingStates((prev) => ({ ...prev, [index]: false }))
  }

  // Handle PDF load errors
  const handlePdfError = (index: number) => {
    setPdfError((prev) => ({ ...prev, [index]: true }))
  }

  // Fallback image URL
  const getFallbackImage = (item: MediaItem, index: number) => {
    if (imageError[index]) {
      return `/placeholder.svg?height=400&width=800&text=Image+${index + 1}`
    }
    return item.src
  }

  // Handle external link opening
  const handleExternalLink = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer")
  }

  // Handle file download
  const handleDownload = (url: string, filename?: string) => {
    const link = document.createElement("a")
    link.href = url
    link.download = filename || "presentation"
    link.target = "_blank"
    link.rel = "noopener noreferrer"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Get Google Docs viewer URL (alternative approach)
  const getGoogleDocsViewerUrl = (pdfUrl: string) => {
    return `https://docs.google.com/gview?url=${encodeURIComponent(pdfUrl)}&embedded=true`
  }

  if (!items || items.length === 0) {
    return (
      <div className={cn("w-full h-64 bg-muted rounded-lg flex items-center justify-center", className)}>
        <p className="text-muted-foreground">No media available</p>
      </div>
    )
  }

  const currentItem = items[currentIndex]

  // Render presentation content based on type
  const renderPresentationContent = (item: MediaItem, index: number) => {
    const presentationType = item.presentationType || "pdf"

    switch (presentationType) {
      case "pdf":
        if (pdfError[index]) {
          return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 text-gray-800 p-8">
              <div className="text-8xl mb-6 text-red-500">⚠️</div>
              <h3 className="text-2xl font-bold mb-3 text-center">Unable to Load PDF</h3>
              <p className="text-gray-600 mb-6 text-center max-w-md">
                The PDF viewer encountered an error. Please try the alternative viewing options below.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  onClick={() => handleExternalLink(getGoogleDocsViewerUrl(item.src))}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                >
                  <ExternalLink className="h-5 w-5" />
                  View with Google Docs
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleExternalLink(item.src)}
                  className="flex items-center gap-2"
                >
                  <ExternalLink className="h-5 w-5" />
                  Open Original
                </Button>
              </div>
            </div>
          )
        }

        return (
          <div className="w-full h-full relative bg-gray-100">
            {/* Loading overlay for PDF */}
            {loadingStates[index] && (
              <div className="absolute inset-0 z-20 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Loading PDF...</p>
                </div>
              </div>
            )}

            <iframe
              src={getGoogleDocsViewerUrl(item.src)}
              className="w-full h-full border-0"
              title={item.title || `PDF Presentation ${index + 1}`}
              onLoad={() => setLoadingStates((prev) => ({ ...prev, [index]: false }))}
              onError={() => handlePdfError(index)}
              style={{
                transform: `scale(${pdfScale})`,
                transformOrigin: "top left",
                width: `${100 / pdfScale}%`,
                height: `${100 / pdfScale}%`,
              }}
              sandbox="allow-scripts allow-same-origin"
            />

            {/* PDF Controls - Positioned on the left side to avoid overlap */}
            <div className="absolute top-2 left-2 flex flex-col gap-1 bg-black/80 rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8"
                onClick={zoomOut}
                disabled={pdfScale <= 0.5}
                title="Zoom Out"
              >
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8"
                onClick={zoomIn}
                disabled={pdfScale >= 3}
                title="Zoom In"
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 h-8 w-8"
                onClick={toggleFullscreen}
                title="Fullscreen"
              >
                <Maximize2 className="h-4 w-4" />
              </Button>
            </div>

            {/* Zoom indicator - Positioned on bottom left to avoid overlap */}
            {pdfScale !== 1 && (
              <div className="absolute bottom-2 left-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                {Math.round(pdfScale * 100)}%
              </div>
            )}
          </div>
        )

      case "embed":
        return (
          <div className="w-full h-full relative">
            {/* Loading overlay for embeds */}
            {loadingStates[index] && (
              <div className="absolute inset-0 z-20 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Loading presentation...</p>
                </div>
              </div>
            )}

            <iframe
              src={item.embedUrl || item.src}
              className="w-full h-full border-0"
              title={item.title || `Embedded Presentation ${index + 1}`}
              allowFullScreen
              allow="fullscreen"
              onLoad={() => setLoadingStates((prev) => ({ ...prev, [index]: false }))}
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
            <div className="absolute top-2 left-2">
              <Button
                variant="ghost"
                size="icon"
                className="bg-black/50 hover:bg-black/70 text-white h-8 w-8"
                onClick={() => handleExternalLink(item.embedUrl || item.src)}
                title="Open in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )

      case "link":
      default:
        return (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 text-gray-800 p-8">
            <div className="text-8xl mb-6 text-purple-600">📊</div>
            <h3 className="text-2xl font-bold mb-3 text-center">{item.title || "Presentation"}</h3>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              Click below to view this presentation in a new window for the best experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                size="lg"
                onClick={() => handleExternalLink(item.src)}
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
              >
                <ExternalLink className="h-5 w-5" />
                View Presentation
              </Button>
              {item.downloadUrl && (
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => handleDownload(item.downloadUrl!, item.title)}
                  className="flex items-center gap-2"
                >
                  <Download className="h-5 w-5" />
                  Download
                </Button>
              )}
            </div>
          </div>
        )
    }
  }

  return (
    <div className={cn("relative w-full", className)}>
      {/* Fullscreen overlay */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="w-full h-full max-w-7xl max-h-full p-4">
            <div className="relative w-full h-full">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white"
                onClick={toggleFullscreen}
              >
                ✕
              </Button>
              {currentItem.type === "presentation" ? (
                renderPresentationContent(currentItem, currentIndex)
              ) : currentItem.type === "image" ? (
                <div className="relative w-full h-full">
                  {loadingStates[currentIndex] && (
                    <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  )}
                  <Image
                    src={getFallbackImage(currentItem, currentIndex) || "/placeholder.svg"}
                    alt={currentItem.alt || `Media ${currentIndex + 1}`}
                    fill
                    className="object-contain"
                    onError={() => handleImageError(currentIndex)}
                    onLoad={() => setLoadingStates((prev) => ({ ...prev, [currentIndex]: false }))}
                  />
                </div>
              ) : (
                <video
                  src={currentItem.src}
                  className="w-full h-full object-contain"
                  controls
                  poster={currentItem.thumbnail}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Main carousel container */}
      <div
        className="relative aspect-video bg-black rounded-lg overflow-hidden group"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            {currentItem.type === "image" ? (
              <div className="relative w-full h-full">
                {loadingStates[currentIndex] && !preloadedImages.has(currentItem.src) && (
                  <div className="absolute inset-0 z-10 bg-background/80 backdrop-blur-sm flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                )}
                <Image
                  src={getFallbackImage(currentItem, currentIndex) || "/placeholder.svg"}
                  alt={currentItem.alt || `Media ${currentIndex + 1}`}
                  fill
                  className="object-contain"
                  onError={() => handleImageError(currentIndex)}
                  onLoad={() => setLoadingStates((prev) => ({ ...prev, [currentIndex]: false }))}
                  priority={currentIndex === 0}
                />
              </div>
            ) : currentItem.type === "video" ? (
              <video
                src={currentItem.src}
                className="w-full h-full object-contain"
                controls
                poster={currentItem.thumbnail}
                preload="metadata"
              />
            ) : (
              renderPresentationContent(currentItem, currentIndex)
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation arrows */}
        {items.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
              onClick={goToNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </>
        )}

        {/* Play/Pause button for images */}
        {currentItem.type === "image" && items.length > 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        )}

        {/* Fullscreen button for non-presentation items */}
        {currentItem.type !== "presentation" && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-4 left-4 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
            onClick={toggleFullscreen}
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        )}

        {/* Media counter - Positioned to avoid overlap with PDF controls */}
        {items.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-opacity z-10">
            {currentIndex + 1} / {items.length}
          </div>
        )}
      </div>

      {/* Title */}
      {currentItem.title && (
        <div className="mt-4 text-center">
          <h4 className="font-medium text-foreground">{currentItem.title}</h4>
        </div>
      )}

      {/* Thumbnail navigation */}
      {items.length > 1 && (
        <div className="flex justify-center mt-4 gap-2 overflow-x-auto pb-2">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden transition-all relative",
                index === currentIndex
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-border hover:border-primary/50",
              )}
            >
              {item.type === "image" ? (
                <>
                  {loadingStates[index] && !preloadedImages.has(item.src) && (
                    <div className="absolute inset-0 bg-muted flex items-center justify-center">
                      <Loader2 className="h-3 w-3 animate-spin" />
                    </div>
                  )}
                  <Image
                    src={getFallbackImage(item, index) || "/placeholder.svg"}
                    alt={`Thumbnail ${index + 1}`}
                    width={64}
                    height={48}
                    className="w-full h-full object-cover"
                    onError={() => handleImageError(index)}
                    onLoad={() => setLoadingStates((prev) => ({ ...prev, [index]: false }))}
                  />
                </>
              ) : item.type === "video" ? (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">📹</span>
                </div>
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">{item.presentationType === "pdf" ? "📄" : "📊"}</span>
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Progress indicators */}
      {items.length > 1 && (
        <div className="flex justify-center mt-2 gap-1">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                index === currentIndex ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
            />
          ))}
        </div>
      )}
    </div>
  )
}
