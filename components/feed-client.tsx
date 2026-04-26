"use client"

import Image from "next/image"
import {useEffect, useState} from "react"
import ListingCard from "@/components/listing-card"
import {supabaseBrowser} from "@/lib/supabase-browser";
const supabase = supabaseBrowser()

export default function FeedClient({ listings: initialListings }: { listings: any[] }) {
    const [filter, setFilter] = useState("all")
    const [listings, setListings] = useState(initialListings)

    // real-time subscription goes here, before return
    useEffect(() => {
        const channel = supabase
            .channel("listings")
            .on("postgres_changes",
                { event: "INSERT", schema: "public", table: "listings" },
                (payload) => {
                    setListings(prev => [payload.new as any, ...prev])
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [])

    const filters = ["all", "meals", "drinks", "snacks"]
    return (
        <>
            <div className="p-5 flex flex-col gap-4 pb-24">
                <div className="flex items-center gap-2">
                    <Image src="/logo.png" alt="munchi" width={100} height={40} />
                    <p>@ cpp</p>
                </div>
                <div className="bg-maroon rounded-full px-6 py-3 flex items-center gap-2">
                    <span>🌱</span>
                    <span className="font-display text-beige">100 Meals saved this year</span>
                </div>
                <hr className="border-maroon opacity-20" />
                <div className="flex flex-row gap-2 overflow-x-auto">
                    {filters.map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                                    filter === f ? "bg-maroon text-beige" : "bg-transparent text-noir border border-noir"
                                }`}>
                            {f}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col gap-6">
                    {listings.map(item => (
                        <ListingCard key={item.id} item={item} />
                    ))}
                </div>
            </div>
        </>
    )
}