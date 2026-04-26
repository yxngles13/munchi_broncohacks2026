"use client"
import Image from "next/image";
import { useEffect, useState } from "react"
import { supabaseBrowser } from "@/lib/supabase-browser"

export default function LoginPage() {
    const supabase = supabaseBrowser()
    const [email, setEmail] = useState("")
    const [sent, setSent] = useState(false)
    const [university, setUniversity] = useState("")
    useEffect(() => {
        const saved = localStorage.getItem("university")
        if (saved) setUniversity(saved)
    }, [])
    const handleLogin = async () => {
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${window.location.origin}/auth/callback`,
            }
        })
        if (!error) {
            setSent(true)
        } else {
            console.log("error:", error)
        }
    }

    return (
        <div className="min-h-dvh bg-bg flex flex-col items-center justify-center px-8 relative overflow-hidden">
            {/* blobs */}
            <div className="absolute top-[-60px] left-[-60px] w-52 h-52 rounded-full bg-maroon opacity-10 blur-2xl pointer-events-none" />
            <div className="absolute bottom-[-60px] right-[-60px] w-64 h-64 rounded-full bg-maroon opacity-10 blur-2xl pointer-events-none" />

            {/* card */}
            <div className="relative w-full max-w-sm flex flex-col items-center gap-6">

                {/* logo */}
                <Image
                    src="/munchi.png"
                    alt="munchi"
                    width={1000}
                    height={400}
                    className="w-52 h-auto"
                />

                {/* heading */}
                <div className="text-center flex flex-col gap-1">
                    <h1 className="font-display text-3xl italic text-maroon leading-tight">
                        welcome to munchi
                    </h1>
                    <p className="font-body text-sm text-noir opacity-50">
                        free food on campus, find it fast
                    </p>
                </div>
                {university && (
                    <div className="bg-beige border border-maroon border-opacity-20 rounded-full px-5 py-2 flex items-center gap-2">
                        <span>🎓</span>
                        <span className="font-body text-sm text-noir font-bold">{university}</span>
                    </div>
                )}

                {/* divider */}
                <div className="w-full h-[1.5px] bg-maroon opacity-10" />

                {sent ? (
                    <div className="flex flex-col items-center gap-3 text-center">
                        <div className="text-5xl">📬</div>
                        <p className="font-display text-xl italic text-maroon">check your email!</p>
                        <p className="font-body text-sm text-noir opacity-50">
                            we sent a magic link to<br />
                            <span className="font-bold opacity-100 text-maroon">{email}</span>
                        </p>
                        <button
                            onClick={() => setSent(false)}
                            className="mt-2 text-xs font-body text-noir opacity-40 underline"
                        >
                            wrong email? go back
                        </button>
                    </div>
                ) : (
                    <div className="w-full flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="your email..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            onKeyDown={e => e.key === "Enter" && handleLogin()}
                            className="w-full bg-beige border border-maroon border-opacity-20 rounded-full px-5 py-3 text-sm font-body text-noir placeholder:text-noir placeholder:opacity-40 outline-none focus:border-opacity-60 transition-all"
                        />
                        <button
                            onClick={handleLogin}
                            disabled={!email}
                            className={`w-full py-3 rounded-full font-body font-bold text-sm transition-all ${
                                email
                                    ? "bg-maroon text-cotton hover:bg-cherry"
                                    : "bg-beige text-noir opacity-40 cursor-not-allowed"
                            }`}
                        >
                            send me a link →
                        </button>
                        <p className="text-center text-xs font-body text-noir opacity-30">
                            no password needed. just a link.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}