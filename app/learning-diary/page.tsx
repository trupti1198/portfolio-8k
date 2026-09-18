"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, BookOpen, TrendingUp } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface LearningEntry {
  id: string
  title: string
  category: string
  notes: string
  key_takeaways: string[]
  tags: string[]
  entry_date: string
  created_at: string
}

export default function LearningDiaryPage() {
  const [entries, setEntries] = useState<LearningEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [availableMonths, setAvailableMonths] = useState<{ value: string; label: string }[]>([])
  const [selectedMonth, setSelectedMonth] = useState<string>("")

  useEffect(() => {
    fetchEntries()
  }, [])

  useEffect(() => {
    // Generate available months from entries
    if (entries.length > 0) {
      const months = new Set<string>()
      entries.forEach(entry => {
        const entryDate = new Date(entry.entry_date || entry.created_at)
        const monthKey = `${entryDate.getFullYear()}-${entryDate.getMonth()}`
        months.add(monthKey)
      })

      const monthOptions = Array.from(months)
        .map(monthKey => {
          const [year, month] = monthKey.split('-')
          const date = new Date(parseInt(year), parseInt(month))
          return {
            value: monthKey,
            label: date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
          }
        })
        .sort((a, b) => b.value.localeCompare(a.value)) // Sort newest first

      setAvailableMonths(monthOptions)
      
      // Set current month as default
      const currentMonthKey = `${currentMonth.getFullYear()}-${currentMonth.getMonth()}`
      if (monthOptions.some(option => option.value === currentMonthKey)) {
        setSelectedMonth(currentMonthKey)
      } else if (monthOptions.length > 0) {
        setSelectedMonth(monthOptions[0].value)
        const [year, month] = monthOptions[0].value.split('-')
        setCurrentMonth(new Date(parseInt(year), parseInt(month)))
      }
    }
  }, [entries])

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/learning-entries")
      const data = await response.json()
      if (data.entries) {
        setEntries(data.entries)
      }
    } catch (error) {
      console.error("Failed to fetch entries:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleMonthSelect = (monthKey: string) => {
    setSelectedMonth(monthKey)
    const [year, month] = monthKey.split('-')
    setCurrentMonth(new Date(parseInt(year), parseInt(month)))
    setSelectedDay(null) // Clear selected day when changing months
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth)
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1)
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1)
    }
    setCurrentMonth(newMonth)
    
    // Update selected month dropdown
    const monthKey = `${newMonth.getFullYear()}-${newMonth.getMonth()}`
    setSelectedMonth(monthKey)
    setSelectedDay(null) // Clear selected day when changing months
  }

  const getEntriesForMonth = () => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.entry_date || entry.created_at)
      return entryDate.getMonth() === currentMonth.getMonth() && 
             entryDate.getFullYear() === currentMonth.getFullYear()
    })
  }

  const getEntriesForDay = (day: number) => {
    return entries.filter(entry => {
      const entryDate = new Date(entry.entry_date || entry.created_at)
      return entryDate.getDate() === day &&
             entryDate.getMonth() === currentMonth.getMonth() && 
             entryDate.getFullYear() === currentMonth.getFullYear()
    })
  }

  const generateCalendar = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const calendar = []
    const current = new Date(startDate)

    for (let week = 0; week < 6; week++) {
      const weekDays = []
      for (let day = 0; day < 7; day++) {
        const dayEntries = getEntriesForDay(current.getDate())
        const isCurrentMonth = current.getMonth() === month
        const hasEntries = dayEntries.length > 0 && isCurrentMonth
        const dayKey = `${current.getFullYear()}-${current.getMonth()}-${current.getDate()}`
        
        weekDays.push({
          date: new Date(current),
          hasEntries,
          isCurrentMonth,
          dayKey,
          entriesCount: dayEntries.length
        })
        current.setDate(current.getDate() + 1)
      }
      calendar.push(weekDays)
    }

    return calendar
  }

  const handleDayClick = (dayInfo: any) => {
    if (dayInfo.hasEntries) {
      const dayKey = `${dayInfo.date.getFullYear()}-${dayInfo.date.getMonth()}-${dayInfo.date.getDate()}`
      setSelectedDay(selectedDay === dayKey ? null : dayKey)
    }
  }

  const getSelectedDayEntries = () => {
    if (!selectedDay) return []
    const [year, month, day] = selectedDay.split('-').map(Number)
    return entries.filter(entry => {
      const entryDate = new Date(entry.entry_date || entry.created_at)
      return entryDate.getDate() === day &&
             entryDate.getMonth() === month && 
             entryDate.getFullYear() === year
    })
  }

  const renderMarkdown = (text: string) => {
    if (!text) return null
    
    // Simple markdown parsing
    let html = text
      // Headers
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-semibold mb-2 mt-4">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-semibold mb-3 mt-4">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold mb-4 mt-4">$1</h1>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Links
      .replace(/\[([^\]]+)\]$$([^)]+)$$/g, '<a href="$2" class="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>')
      // Line breaks
      .replace(/\n/g, '<br>')

    // Handle lists
    const lines = html.split('<br>')
    let inList = false
    let listItems: string[] = []
    const processedLines: string[] = []

    lines.forEach(line => {
      const trimmedLine = line.trim()
      if (trimmedLine.match(/^[-*+]\s/)) {
        if (!inList) {
          inList = true
          listItems = []
        }
        listItems.push(`<li class="ml-4">${trimmedLine.replace(/^[-*+]\s/, '')}</li>`)
      } else if (trimmedLine.match(/^\d+\.\s/)) {
        if (!inList) {
          inList = true
          listItems = []
        }
        listItems.push(`<li class="ml-4">${trimmedLine.replace(/^\d+\.\s/, '')}</li>`)
      } else {
        if (inList) {
          processedLines.push(`<ul class="list-disc list-inside mb-4">${listItems.join('')}</ul>`)
          inList = false
          listItems = []
        }
        if (trimmedLine) {
          processedLines.push(line)
        }
      }
    })

    if (inList) {
      processedLines.push(`<ul class="list-disc list-inside mb-4">${listItems.join('')}</ul>`)
    }

    return <div dangerouslySetInnerHTML={{ __html: processedLines.join('<br>') }} />
  }

  // Calculate metrics
  const totalEntries = entries.length
  const thisMonthEntries = getEntriesForMonth().length
  
  // Calculate growth from last month
  const lastMonth = new Date(currentMonth)
  lastMonth.setMonth(lastMonth.getMonth() - 1)
  const lastMonthEntries = entries.filter(entry => {
    const entryDate = new Date(entry.entry_date || entry.created_at)
    return entryDate.getMonth() === lastMonth.getMonth() && 
           entryDate.getFullYear() === lastMonth.getFullYear()
  }).length

  const growthPercentage = lastMonthEntries === 0 
    ? (thisMonthEntries > 0 ? 100 : 0)
    : Math.round(((thisMonthEntries - lastMonthEntries) / lastMonthEntries) * 100)

  const calendar = generateCalendar()
  const selectedDayEntries = getSelectedDayEntries()

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <section className="py-20 bg-white">
        <div className="container px-4 md:px-6">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="outline" className="border-primary text-primary bg-primary/5">
              Learning Journey
            </Badge>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl text-gray-900">Learning Diary</h1>
            <p className="text-gray-700 md:text-xl max-w-2xl mx-auto">
              Track my continuous learning journey in product management, documenting insights, frameworks, and key takeaways
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container px-4 md:px-6 max-w-6xl mx-auto">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Entries</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalEntries}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">This Month</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{thisMonthEntries}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Growth From Last Month</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {growthPercentage > 0 ? '+' : ''}{growthPercentage}%
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Learning Activity Calendar */}
          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-semibold">Learning Activity</CardTitle>
                <div className="flex items-center gap-4">
                  {/* Month Dropdown */}
                  <Select value={selectedMonth} onValueChange={handleMonthSelect}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableMonths.map((month) => (
                        <SelectItem key={month.value} value={month.value}>
                          {month.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {/* Month Navigation */}
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('prev')}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-sm font-medium min-w-32 text-center">
                      {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigateMonth('next')}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="space-y-4">
                {/* Days of week header */}
                <div className="grid grid-cols-7 gap-1 text-center text-sm font-medium text-gray-500">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2">{day}</div>
                  ))}
                </div>
                
                {/* Calendar days */}
                <div className="space-y-1">
                  {calendar.map((week, weekIndex) => (
                    <div key={weekIndex} className="grid grid-cols-7 gap-1">
                      {week.map((dayInfo, dayIndex) => {
                        const isSelected = selectedDay === dayInfo.dayKey
                        return (
                          <button
                            key={dayIndex}
                            onClick={() => handleDayClick(dayInfo)}
                            className={`
                              aspect-square p-1 text-xs rounded-md transition-all duration-200
                              ${!dayInfo.isCurrentMonth ? 'text-gray-300' : 'text-gray-700'}
                              ${dayInfo.hasEntries 
                                ? 'bg-amber-200 hover:bg-amber-300 cursor-pointer' 
                                : 'bg-gray-100 hover:bg-gray-200'
                              }
                              ${isSelected ? 'ring-2 ring-amber-400 ring-offset-1' : ''}
                            `}
                            disabled={!dayInfo.hasEntries}
                            title={dayInfo.hasEntries ? `${dayInfo.entriesCount} entries` : 'No entries'}
                          >
                            {dayInfo.date.getDate()}
                          </button>
                        )
                      })}
                    </div>
                  ))}
                </div>
                
                {/* Legend */}
                <div className="flex items-center justify-center gap-2 text-xs text-gray-600 mt-4">
                  <span>No entries</span>
                  <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                  <div className="w-3 h-3 bg-amber-200 rounded-sm"></div>
                  <span>Has entries</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Selected Day Details */}
          {selectedDay && selectedDayEntries.length > 0 && (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-lg">
                  Learning Activity - {new Date(selectedDay.split('-').map(Number)).toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedDayEntries.map((entry) => (
                  <div key={entry.id} className="border-l-4 border-amber-200 pl-4 space-y-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{entry.title}</h3>
                      <Badge variant="outline" className="mt-1 text-xs">
                        {entry.category}
                      </Badge>
                    </div>
                    
                    {entry.notes && (
                      <div className="prose prose-sm max-w-none">
                        {renderMarkdown(entry.notes)}
                      </div>
                    )}
                    
                    {entry.tags && entry.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {entry.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Current Month Entries */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })} Entries
            </h2>
            
            {getEntriesForMonth().length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500">No learning entries for this month yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6">
                {getEntriesForMonth().map((entry) => (
                  <Card key={entry.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{entry.title}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline">{entry.category}</Badge>
                            <span className="text-sm text-gray-500">
                              {new Date(entry.entry_date || entry.created_at).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {entry.notes && (
                        <div className="prose prose-sm max-w-none">
                          {renderMarkdown(entry.notes)}
                        </div>
                      )}
                      
                      {entry.key_takeaways && entry.key_takeaways.length > 0 && (
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Key Takeaways:</h4>
                          <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                            {entry.key_takeaways.map((takeaway, index) => (
                              <li key={index}>{takeaway}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {entry.tags && entry.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {entry.tags.map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
