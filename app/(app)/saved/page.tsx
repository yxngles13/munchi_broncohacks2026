"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function SavedPage() {
    const [saved, setSaved] = useState<any[]>([])
    const router = useRouter()

    useEffect(() => {
        const loadSaved = () => {
            const items = localStorage.getItem("claimed_items")
            if (items) setSaved(JSON.parse(items))
        }

        loadSaved()
        window.addEventListener("focus", loadSaved)
        return () => window.removeEventListener("focus", loadSaved)
    }, [])

    return (
        <div className="p-5 flex flex-col gap-4 pb-24">
            <Image src="/munchi.png" alt="munchi" width={1000} height={400} className="w-36 h-auto" />
            <h1 className="font-display text-maroon text-2xl italic">your claims</h1>
            <hr className="border-maroon opacity-20" />

            {saved.length === 0 ? (
                <div className="flex flex-col items-center gap-3 mt-12 text-center">
                    <div className="text-5xl">🍽️</div>
                    <p className="font-display text-xl italic text-maroon">nothing yet</p>
                    <p className="font-body text-sm text-noir opacity-50">claim some food and it'll show up here</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {saved.map((item, i) => (
                        <div key={i} className="relative">
                            <div className="absolute inset-0 bg-maroon rounded-2xl translate-y-2 translate-x-2" />
                            <div className="relative bg-butter rounded-2xl p-4 flex items-center gap-3">
                                <span className="text-3xl">{item.emoji}</span>
                                <div className="flex-1">
                                    <div className="font-display text-maroon text-lg italic">{item.food_name}</div>
                                    <div className="font-body text-xs text-noir opacity-50">{item.host} · {item.location}</div>
                                </div>
                                <span className="bg-maroon text-cotton text-xs font-bold rounded-full px-3 py-1">✓ claimed</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}