"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function ClaimPage() {
    const router = useRouter()
    const [item, setItem] = useState<any>(null)
    const [seconds, setSeconds] = useState(0)
    const [show, setShow] = useState(false)

    useEffect(() => {
        const saved = localStorage.getItem("claimed_item")
        if (!saved) {
            router.push("/feed")
            return
        }
        const parsed = JSON.parse(saved)
        setItem(parsed)
        setSeconds(Math.max(0, Math.floor((new Date(parsed.expires_at).getTime() - Date.now()) / 1000)))
        setTimeout(() => setShow(true), 100)
    }, [])

    useEffect(() => {
        if (seconds <= 0) return
        const t = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000)
        return () => clearInterval(t)
    }, [seconds])

    if (!item) return null

    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60

    return (
        <div className={`min-h-dvh bg-bg flex flex-col items-center justify-center px-6 relative overflow-hidden transition-all duration-500 ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
            {/* blobs */}
            <div className="absolute top-[-80px] left-[-80px] w-64 h-64 rounded-full bg-maroon opacity-10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-60px] right-[-60px] w-52 h-52 rounded-full bg-maroon opacity-10 blur-3xl pointer-events-none" />

            <div className="w-full max-w-sm flex flex-col items-center gap-4">
                {/* emoji */}
                <div className="text-7xl">{item.emoji}</div>

                {/* heading */}
                <div className="text-center">
                    <p className="text-xs font-bold tracking-widest uppercase text-noir opacity-40 font-body mb-1">you're claimed ✦</p>
                    <h1 className="font-display text-4xl italic text-maroon leading-tight">on your way!</h1>
                    <p className="font-body text-sm text-noir opacity-50 mt-2">head over before it's gone</p>
                </div>

                {/* card */}
                <div className="relative w-full">
                    <div className="absolute inset-0 bg-maroon rounded-2xl translate-y-1.5 translate-x-1.5" />
                    <div className="relative bg-butter rounded-2xl overflow-hidden">
                        <div className="bg-maroon px-4 py-2 flex justify-between items-center">
                            <span className="text-xs font-bold text-cotton tracking-widest uppercase font-body">hurry up!</span>
                            <span className="font-mono text-sm font-bold text-cotton">{minutes}:{secs.toString().padStart(2, "0")}</span>
                        </div>
                        <div className="p-4 flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">{item.emoji}</span>
                                <div>
                                    <div className="font-display text-xl italic text-maroon">{item.food_name}</div>
                                    <div className="font-body text-xs text-noir opacity-50">{item.host}</div>
                                </div>
                            </div>
                            <div className="flex gap-2 flex-wrap">
                                <span className="bg-white rounded-full px-3 py-1 text-xs font-bold font-body">📍 {item.location}</span>
                                <span className="bg-white rounded-full px-3 py-1 text-xs font-bold font-body">🚶 {item.distance}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* divider */}
                <div className="w-full h-[1px] bg-maroon opacity-10" />

                {/* buttons */}
                <div className="w-full flex flex-col gap-3">

                   <a href={`https://www.google.com/maps/search/${encodeURIComponent(item.location + " " + "Cal Poly Pomona")}`}
                    target="_blank"
                    className="w-full py-3 rounded-full bg-maroon text-cotton font-bold text-sm text-center font-body hover:bg-cherry transition-all"
                    >
                    get directions →
                </a>
                <button
                    onClick={() => router.push("/feed")}
                    className="w-full py-3 rounded-full border-2 border-maroon text-maroon font-bold text-sm font-body hover:bg-maroon hover:text-cotton transition-all"
                >
                    back to feed
                </button>
            </div>

            <p className="text-xs font-body text-noir opacity-30 text-center">
                your portion is reserved for {minutes} more minutes
            </p>
        </div>
</div>
)
}