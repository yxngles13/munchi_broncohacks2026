import { supabase } from "@/lib/supabase"
import FeedClient from "@/components/feed-client"

export default async function FeedPage() {
    const { data: listings } = await supabase
        .from("listings")
        .select("*")
        .order("created_at", { ascending: false })

    return <FeedClient listings={listings ?? []} />
}