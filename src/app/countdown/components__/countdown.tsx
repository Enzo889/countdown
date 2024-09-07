'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { PictureInPictureIcon, PlayIcon, PauseIcon, PaletteIcon } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

const themes = [
  { name: 'Default', value: 'bg-background text-foreground', countdownBg: 'bg-card', buttonBg: 'bg-primary hover:bg-primary/90', buttonText: 'text-primary-foreground' },
  { name: 'Dark', value: 'bg-slate-950 text-slate-50', countdownBg: 'bg-slate-800', buttonBg: 'bg-slate-700 hover:bg-slate-600', buttonText: 'text-slate-50' },
  { name: 'Light', value: 'bg-slate-50 text-slate-950', countdownBg: 'bg-white', buttonBg: 'bg-slate-200 hover:bg-slate-300', buttonText: 'text-slate-950' },
  { name: 'Forest', value: 'bg-emerald-900 text-emerald-50', countdownBg: 'bg-emerald-800', buttonBg: 'bg-emerald-700 hover:bg-emerald-600', buttonText: 'text-emerald-50' },
  { name: 'Ocean', value: 'bg-blue-900 text-blue-50', countdownBg: 'bg-blue-800', buttonBg: 'bg-blue-700 hover:bg-blue-600', buttonText: 'text-blue-50' },
  { name: 'Sunset', value: 'bg-orange-900 text-orange-50', countdownBg: 'bg-orange-800', buttonBg: 'bg-orange-700 hover:bg-orange-600', buttonText: 'text-orange-50' },
]

const useCountdown = (initialTime: number, onFinish: () => void) => {
  const [time, setTime] = useState(initialTime)
  const [isRunning, setIsRunning] = useState(false)

  // Countdown logic here
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && time > 0) {
      interval = setInterval(() => setTime(t => {
        if (t <= 1) {
          clearInterval(interval)
          setIsRunning(false)
          onFinish()
          return 0
        }
        return t - 1
      }), 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning, time, onFinish])

  const start = () => setIsRunning(true)
  const pause = () => setIsRunning(false)
  const reset = (newTime: number) => {
    setTime(newTime)
    setIsRunning(false)
  }

  return { time, isRunning, start, pause, reset }
}

const usePictureInPicture = (videoRef: React.RefObject<HTMLVideoElement>) => {
  const [isPiP, setIsPiP] = useState(false)

  const togglePiP = async () => {
    if (!videoRef.current) return

    try {
      if (!isPiP) {
        await videoRef.current.requestPictureInPicture()
        setIsPiP(true)
      } else {
        await document.exitPictureInPicture()
        setIsPiP(false)
      }
    } catch (error) {
      console.error('Error toggling Picture-in-Picture:', error)
    }
  }

  return { isPiP, togglePiP }
}

export default function Countdown() {
  const [selectedTheme, setSelectedTheme] = useState(themes[0])
  const [date, setDate] = useState<Date>()
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const onFinish = () => {
    if (audioRef.current) {
      audioRef.current.play()
    }
  }

  const getTimeInSeconds = () => {
    if (!date) return 0
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    return Math.max(0, Math.floor(diff / 1000))
  }

  const { time, isRunning, start, pause, reset } = useCountdown(getTimeInSeconds(), onFinish)

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    const updateCanvas = () => {
      const canvas = canvasRef.current
      const video = videoRef.current
      if (canvas && video) {
        const ctx = canvas.getContext('2d')
        if (ctx) {
          ctx.fillStyle = selectedTheme.countdownBg
          ctx.fillRect(0, 0, canvas.width, canvas.height)
          ctx.font = 'bold 48px Arial'
          ctx.fillStyle = selectedTheme.value.split(' ')[1] // Use text color from theme
          ctx.textAlign = 'center'
          ctx.textBaseline = 'middle'
          ctx.fillText(formatTime(time), canvas.width / 2, canvas.height / 2)
        }
      }
    }

    updateCanvas()
    const interval = setInterval(updateCanvas, 1000)
    return () => clearInterval(interval)
  }, [time, selectedTheme])

  const { isPiP, togglePiP } = usePictureInPicture(videoRef)

  return (
    <div className={`flex h-screen ${selectedTheme.value}`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className={`fixed left-4 top-4 z-50 ${selectedTheme.buttonBg} ${selectedTheme.buttonText}`}>
            <PaletteIcon className="h-4 w-4" />
            <span className="sr-only">Open themes</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className={selectedTheme.value}>
          <h2 className="text-2xl font-bold mb-4">Themes</h2>
          {themes.map((theme) => (
            <Button
              key={theme.name}
              variant={selectedTheme.value === theme.value ? "default" : "outline"}
              className={`w-full mb-2 ${theme.buttonBg} ${theme.buttonText}`}
              onClick={() => setSelectedTheme(theme)}
            >
              {theme.name}
            </Button>
          ))}
        </SheetContent>
      </Sheet>
      <div className="flex-1 p-4 flex flex-col items-center justify-center">
        <Card className={`w-full max-w-md ${selectedTheme.countdownBg}`}>
          <CardContent className="p-6">
            <div className={`text-6xl font-bold text-center mb-8 ${selectedTheme.value.split(' ')[1]}`}>{formatTime(time)}</div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <Button onClick={isRunning ? pause : start} className={`${selectedTheme.buttonBg} ${selectedTheme.buttonText}`}>
                  {isRunning ? <PauseIcon className="mr-2" /> : <PlayIcon className="mr-2" />}
                  {isRunning ? 'Pause' : 'Start'}
                </Button>
                <Button onClick={() => reset(getTimeInSeconds())} className={`${selectedTheme.buttonBg} ${selectedTheme.buttonText}`}>Reset</Button>
                <Button onClick={togglePiP} className={`${selectedTheme.buttonBg} ${selectedTheme.buttonText}`}>
                  <PictureInPictureIcon className="mr-2" />
                  {isPiP ? 'Exit PiP' : 'Enter PiP'}
                </Button>
              </div>
              <div className="flex flex-col space-y-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        selectedTheme.buttonBg,
                        selectedTheme.buttonText
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP HH:mm:ss") : <span>Pick a date and time</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                    <div className="p-3 border-t">
                      <input
                        type="time"
                        step="1"
                        value={date ? format(date, "HH:mm:ss") : ""}
                        onChange={(e) => {
                          const [hours, minutes, seconds] = e.target.value.split(':').map(Number)
                          setDate(prev => {
                            if (!prev) return
                            const newDate = new Date(prev)
                            newDate.setHours(hours, minutes, seconds)
                            return newDate
                          })
                        }}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <video ref={videoRef} className="hidden">
        <source src="/placeholder.mp4" type="video/mp4" />
      </video>
      <canvas ref={canvasRef} width="300" height="150" className="hidden" />
      <audio ref={audioRef} src="/finish-sound.mp3" />
    </div>
  )
}