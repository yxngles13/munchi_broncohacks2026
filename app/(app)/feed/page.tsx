import { supabase } from "@/lib/supabase"
import FeedClient from "@/components/feed-client"

export default async function FeedPage() {
    const { data: listings } = await supabase
        .from("listings")
        .select("*")

    return <FeedClient listings={listings ?? []} />
}