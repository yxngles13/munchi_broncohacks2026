"use client"

import { useState, useEffect } from "react"


export default function Countdown({ expiresAt }: { expiresAt: string }) {
    const calculateSeconds = () => {
        const diff = new Date(expiresAt).getTime() - Date.now()
        return Math.max(0, Math.floor(diff / 1000))
    }

    const [seconds, setSeconds] = useState(0)

    useEffect(() => {
        setSeconds(calculateSeconds())

        const timerId = setInterval(() => {
            setSeconds(calculateSeconds())
        }, 1000)

        return () => clearInterval(timerId)
    }, [expiresAt])

    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    const isExpiringSoon = seconds <= 15 * 60


    const isExpired = seconds <= 0

    if (isExpired) {
        return (
            <span className="text-cotton text-xs font-bold bg-noir px-2 py-0.5 rounded-full">
      ⏰ expired
    </span>
        )
    }

    return (
        <div className="flex items-center gap-2">
            {isExpiringSoon && (
                <span className="text-cotton text-xs font-bold bg-cherry px-2 py-0.5 rounded-full">
        ⚡️ expiring soon
      </span>
            )}
            <span className="text-cotton text-sm font-bold">
      {minutes}:{secs.toString().padStart(2, "0")}
    </span>
        </div>
    )
}