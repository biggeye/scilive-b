import { createClient } from "@/utils/supabase/route";
interface TikApiAuthResponse {
    access_token: string;
    scope: string[]; // Changed to an array of strings
}

export async function POST(req: Request) {
    const { access_token, scope }: { access_token: string; scope: string } = await req.json(); // Destructure access_token and scope from request query
    
    // Assuming scope is provided as a comma-separated string in the query, split it into an array
    const scopeArray: string[] = scope.split(',');

    try {
        // Assuming createClient returns a Supabase client instance
        const supabase = createClient(req);

        // Assuming you have a table named 'tikapi' in your Supabase database
        // Upsert the data into the 'tikapi' table, matching rows where access_token equals to access_token
        await supabase
            .from('tikapi')
            .upsert({ access_token, scope: scopeArray }, { onConflict: 'access_token' });

        // Return a success status code
        return { statusCode: 200, body: 'Success' };
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        // Return an appropriate error response
        return { statusCode: 500, body: 'Internal Server Error' };
    }
}
