import { createClient } from '@/utils/supabase/route';
import TikAPI from 'tikapi'
const tikApiKey = process.env.NEXT_PUBLIC_TIKAPI_API_KEY;
const api = TikAPI(tikApiKey)

export async function POST(req: Request, res: Response){
    const supabase = createClient(req);
    const body = await req.json()
    try{
        let response = await api.public.check({
            username: body.username
        })
        console.log(response.json)
    }
    catch(err){
        console.log(err)
    }
}