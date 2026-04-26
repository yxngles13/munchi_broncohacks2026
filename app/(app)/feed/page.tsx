import { supabase } from "@/lib/supabase"
import FeedClient from "@/components/feed-client"

export default async function FeedPage() {
    export const dynamic = 'force-dynamic'
    const { data: listings } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false })

    const { count } = await supabase
        .from("claims")
        .select("*", { count: "exact", head: true })

    return <FeedClient listings={listings ?? []} claimsCount={count ?? 0} />
}