"use client"

import { useState } from "react"
import { supabaseBrowser } from "@/lib/supabase-browser"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function PostPage() {
    const supabase = supabaseBrowser()
    const router = useRouter()
    const [details, setDetails] = useState("")
    const [foodName, setFoodName] = useState("")
    const [emoji, setEmoji] = useState("")
    const [host, setHost] = useState("")
    const [location, setLocation] = useState("")
    const [distance, setDistance] = useState("")
    const [portions, setPortions] = useState(0)
    const [expiry, setExpiry] = useState(60)
    const isValid = foodName && host && location && distance && portions > 0 && expiry > 0 && emoji
    const handleSubmit = async () => {
        const expiresAt = new Date(Date.now() + expiry * 60 * 1000).toISOString()

        const { error } = await supabase
            .from("listings")
            .insert({
                food_name: foodName,
                emoji,
                host,
                location,
                distance,
                portions_left: portions,
                expires_at: expiresAt,
            })

        if (!error) {
            router.push("/feed")
        } else {
            console.log("error:", error)
        }
    }

    return (
        <div className="p-5 flex flex-col gap-1 pb-20">
            <Image src="/munchi.png" alt="munchi" width={100} height={40} />
            <h1 className="font-display text-maroon text-2xl italic">Post A New Listing</h1>
            <hr className="border-maroon opacity-20" />
            <p className="font-body text-noir text-sm">Select an Emoji</p>
            <div className="flex flex-row flex-wrap gap-3">
                {["🍕","🥪","🍩","🫔","🍱","🌮","🍜","🥗","🍣","🧁","🍔","🧃","🍎","🍗"].map(e => (
                    <button
                        key={e}
                        onClick={() => setEmoji(e)}
                        className={`w-12 h-12 rounded-2xl p-2 flex items-center justify-center border ${
                            emoji === e ? "bg-maroon border-maroon" : "bg-beige border-noir"
                        }`}
                    >
                        {e}
                    </button>
                ))}
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <p className="font-display text-noir text-sm">What is the food name?</p>
                <input
                    type="text"
                    placeholder="Food Name"
                    value={foodName}
                    onChange={e => setFoodName(e.target.value)}
                    className="bg-beige rounded-full px-4 py-2 text-sm font-body text-noir placeholder:text-noir"
                />
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <p className="font-display text-noir text-sm">Any details?</p>
                <input
                    type="text"
                    placeholder="dietary info, allergies, what's included, any notes..."
                    value={details}
                    onChange={e => setDetails(e.target.value)}
                    className="bg-beige rounded-full px-4 py-2 text-sm font-body text-noir placeholder:text-noir"
                />
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <p className="font-display text-noir text-sm">How many portions?</p>
                <input
                    type="number"
                    placeholder="Number of portions"
                    value={portions}
                    onChange={e => setPortions(Number(e.target.value))}
                    className="bg-beige rounded-full px-4 py-2 text-sm font-body text-noir placeholder:text-noir"
                />
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <p className="font-display text-noir text-sm">Your name / club?</p>
                <input type="text" placeholder="e.g. Engineering Club" value={host}
                       onChange={e => setHost(e.target.value)}
                       className="bg-beige rounded-full px-4 py-2 text-sm font-body text-noir" />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <p className="font-display text-noir text-sm">Where is it?</p>
                <input type="text" placeholder="e.g. Building 3 Room 100" value={location}
                       onChange={e => setLocation(e.target.value)}
                       className="bg-beige rounded-full px-4 py-2 text-sm font-body text-noir" />
            </div>

            <div className="flex flex-col gap-2 mt-4">
                <p className="font-display text-noir text-sm">Walking distance?</p>
                <input type="text" placeholder="e.g. 3 min" value={distance}
                       onChange={e => setDistance(e.target.value)}
                       className="bg-beige rounded-full px-4 py-2 text-sm font-body text-noir" />
            </div>
            <div className="flex flex-col gap-2 mt-4">
                <p className="font-display text-noir text-sm">How long will it last?</p>
                <div className="grid grid-cols-2 gap-2">
                    {[30, 60, 120, 180].map(mins => (
                        <button key={mins} onClick={() => setExpiry(mins)}
                                className={`py-3 rounded-2xl font-bold text-sm ${
                                    expiry === mins ? "bg-maroon text-cotton" : "bg-beige text-noir"
                                }`}>
                            {mins < 60 ? `${mins} min` : `${mins/60} hour${mins > 60 ? "s" : ""}`}
                        </button>
                    ))}
                </div>
            </div>
            <button
                onClick={handleSubmit}
                disabled={!isValid}
                className={`mt-6 w-full py-3 rounded-full font-bold text-sm transition-all ${
                    isValid
                        ? "bg-maroon text-cotton hover:bg-cherry"
                        : "bg-beige text-cotton opacity-40 cursor-not-allowed"
                }`}
            >
                post it →
            </button>

        </div>
    )
}