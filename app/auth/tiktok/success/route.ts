import { createClient } from "@/utils/supabase/route";
interface TikApiAuthResponse {
    access_token: string;
    scope: string[]; // Changed to an array of strings
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const queryParams = url.searchParams;
    const access_token = queryParams.get('access_token');
    const scope = queryParams.get('scope');

    // Your logic to handle the access token and scope

    try {
        // Assuming createClient returns a Supabase client instance
        const supabase = createClient(req);
        await supabase
            .from('tikapi')
            .upsert({ access_token, scope: scope }, { onConflict: 'access_token' });

        return new Response("Success", { status: 200 }); // or use NextResponse for more specific Next.js functionality
    } catch (error) {
        console.error('Error processing the TikTok callback:', error);
        // Return an error response
        return new Response("Internal Server Error", { status: 500 });
    }
}
