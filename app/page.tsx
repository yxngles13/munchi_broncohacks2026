"use client"

import Image from "next/image"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const UNIVERSITIES = [
        "Cal Poly Pomona",
        "Cal Poly San Luis Obispo",
        "UCLA",
        "UC Berkeley",
        "UC San Diego",
        "UC Davis",
        "UC Irvine",
        "USC",
        "Stanford University",
        "California State University Long Beach",
        "California State University Fullerton",
        "San Diego State University",
        "Arizona State University",
        "University of Michigan",
        "New York University",
    ]

    const searchUniversity = (value: string) => {
        setQuery(value)
        if (value.length < 2) {
            setResults([])
            return
        }
        const filtered = UNIVERSITIES.filter(u =>
            u.toLowerCase().includes(value.toLowerCase())
        )
        setResults(filtered)
    }
    /*const searchUniversity = async (value: string) => {
        setQuery(value)
        if (value.length < 2) {
            setResults([])
            return
        }
        setLoading(true)
        console.log("fetching:", value)
        const res = await fetch(
            `https://api.data.gov/ed/collegescorecard/v1/schools?fields=school.name&school.name=${value}&api_key=DEMO_KEY&per_page=6`
        )
        const data = await res.json()
        console.log("results:", data)
        setResults(data.results || [])
        setLoading(false)
    }*/

    const handleSelect = (name: string) => {
        localStorage.setItem("university", name)
        router.push("/login")
    }

    return (
        <div className="min-h-dvh bg-bg flex flex-col items-center justify-center px-8 relative overflow-hidden">
            <div className="absolute top-[-60px] left-[-60px] w-52 h-52 rounded-full bg-maroon opacity-10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 rounded-full bg-maroon opacity-10 blur-2xl pointer-events-none" />

            <div className="flex flex-col items-center gap-6 w-full max-w-sm">
                <Image src="/munchi.png" alt="munchi" width={1000} height={400} className="w-52 h-auto" />

                <div className="text-center">
                    <h1 className="font-display text-3xl italic text-maroon">find your campus</h1>
                    <p className="font-body text-sm text-noir opacity-50 mt-1">free food, zero waste</p>
                </div>

                <div className="w-full h-[1.5px] bg-maroon opacity-10" />

                <div className="w-full flex flex-col gap-2">
                    <input
                        type="text"
                        placeholder="search your university..."
                        value={query}
                        onChange={e => searchUniversity(e.target.value)}
                        className="w-full bg-beige border border-maroon border-opacity-20 rounded-full px-5 py-3 text-sm font-body text-noir placeholder:text-noir placeholder:opacity-40 outline-none"
                    />

                    {loading && (
                        <p className="text-xs text-center font-body text-noir opacity-40">searching...</p>
                    )}


                    {results.map((r, i) => (
                        <button
                            key={i}
                            onClick={() => handleSelect(r)}
                            className="w-full text-left bg-beige border border-maroon border-opacity-20 rounded-full px-5 py-3 text-sm font-body text-noir hover:bg-maroon hover:text-cotton transition-all"
                        >
                            🎓 {r}
                        </button>
                    ))}
                </div>

                <p className="text-xs font-body text-noir opacity-30 text-center">
                    supporting universities across the US
                </p>
            </div>
        </div>
    )
}