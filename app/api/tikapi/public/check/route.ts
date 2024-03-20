import createClient from '@/utils/supabase/route'
import TikAPI from 'tikapi'

const api = TikAPI("myAPIKey")

export async function POST(req: Request, res: Response){
    const body = await req.json()
    try{
        let response = await api.public.check({
            username: body.username
        })
        console.log(response.json)
    }
    catch(err){
        console.log(err?.statusCode, err?.message, err?.json)
    }
}()