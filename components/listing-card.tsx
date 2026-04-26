"use client"

import { useState } from "react"
import Countdown from "@/components/countdown"
import { supabaseBrowser } from "@/lib/supabase-browser"

export default function ListingCard({ item }: { item: any }) {
    const [portionsLeft, setPortionsLeft] = useState(item.portions_left)
    const [claimed, setClaimed] = useState(false)
    const supabase = supabaseBrowser()

    const handleClaim = async () => {
        if (claimed || portionsLeft <= 0) return

        const { error: claimError } = await supabase
            .from("claims")
            .insert({ listing_id: item.id })

        const { error: updateError } = await supabase
            .from("listings")
            .update({ portions_left: portionsLeft - 1 })
            .eq("id", item.id)

        if (!claimError && !updateError) {
            setPortionsLeft((prev: number) => prev - 1)
            setClaimed(true)
        }
    }

    return (
        <div className="relative mx-4">
            <div className="absolute inset-0 bg-maroon rounded-2xl translate-y-2 translate-x-2" />
            <div className="relative bg-butter rounded-2xl overflow-hidden min-h-[220px]">
                <div className="bg-maroon px-4 py-3 flex justify-end">
                    <Countdown expiresAt={item.expires_at} />
                </div>
                <div className="p-5 flex flex-col gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.emoji}</span>
                        <span className="font-display text-maroon text-2xl italic">{item.food_name}</span>
                        <span className="font-body text-noir text-sm ml-10">@ {item.host}</span>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className="bg-white rounded-full px-3 py-1 text-xs font-bold">🏢 {item.location}</span>
                        <span className="bg-white rounded-full px-3 py-1 text-xs font-bold">🚶 {item.distance}</span>
                        <span className="bg-white rounded-full px-3 py-1 text-xs font-bold">🍽️ {portionsLeft} remaining</span>
                    </div>
                    <div className="w-full h-[1.5px] bg-maroon opacity-30" />
                    <button
                        onClick={handleClaim}
                        disabled={claimed || portionsLeft <= 0}
                        className={`px-4 py-2 rounded-full font-bold transition-colors ${
                            claimed
                                ? "bg-noir text-cotton cursor-not-allowed"
                                : portionsLeft <= 0
                                    ? "bg-gray-400 text-white cursor-not-allowed"
                                    : "bg-maroon text-cotton hover:bg-cherry"
                        }`}
                    >
                        {claimed? "✔️ on my way!" : portionsLeft <= 0 ? "all gone 😢" : "I want this!"}
                    </button>
                </div>
            </div>
        </div>
    )
}