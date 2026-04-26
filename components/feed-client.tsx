"use client"

import Image from "next/image";
import {useState} from "react";

export default function FeedClient({ listings }: { listings: any[] }) {
    const [filter, setFilter] = useState("all")

    const filters = ["all", "meals", "drinks", "snacks"]
    return (
        <>
            <div className="p-5 flex flex-col gap-4 pb-24">           <div className={"flex items-center gap-2"}>
                <Image src="/logo.png" alt="munchi" width={100} height={40} />
                <p> @ cpp (placeholder) </p>
            </div>
                <div className="bg-maroon rounded-full px-6 py-3 flex items-center gap-2">
                    <span>🌱</span>
                    <span className="font-display text-beige">100 Meals saved this year</span>
                </div>
                <hr className="border-maroon opacity-20" />
                <div className="flex flex-row gap-2 overflow-x-auto">
                    {filters.map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap ${
                                filter === f
                                    ? "bg-maroon text-cotton"
                                    : "bg-transparent text-noir border border-noir"
                            }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
                <div className="flex flex-col gap-6">
                    {listings.map(item => (
                        <div key={item.id} className="relative mx-4">
                            <div className="relative mx-4transition-transform duration-300 hover:scale-101">
                                {/* maroon shadow */}
                                <div className="absolute inset-0 bg-maroon rounded-2xl translate-y-2 translate-x-2" />

                                {/* butter card */}
                                <div className="relative bg-butter rounded-2xl overflow-hidden min-h-[220px]">
                                    {/* maroon top strip */}
                                    <div className="bg-maroon px-4 py-3 flex justify-end">
                                        <span className="text-cotton text-sm font-bold">60:00</span>
                                    </div>

                                    {/* body */}
                                    <div className="p-5 flex flex-col gap-4 ">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{item.emoji}</span>
                                            <span className="font-display text-maroon text-2xl italic">{item.food_name}</span>
                                            <span className="font-body text-noir opactiy-50  text-sm ml-10">@ {item.host}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="bg-white rounded-full px-3 py-1 text-xs font-bold">🏢{item.location}</span>
                                            <span className="bg-white rounded-full px-3 py-1 text-xs font-bold">🚶{item.distance}</span>
                                        </div>
                                        <div className="w-full h-[1.5px] bg-maroon opacity-30" />
                                        <button className="bg-maroon text-cotton px-4 py-2 rounded-full font-bold hover:bg-cherry">I want this!</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>

    )
}