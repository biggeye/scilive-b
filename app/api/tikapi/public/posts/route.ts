import TikAPI from 'tikapi';

const api = TikAPI("myAPIKey");

export async function POST(req: Request, res: Response){
    const body = await req.json();
    const userSecUid = body.secUid;
    try{
        let response = await api.public.posts({
            secUid: body.userSecUid})

        console.log(response?.json);

        while(response){

            let cursor = response?.json?.cursor;
            console.log("Getting next items ", cursor);
            res = await Promise.resolve(
                res
            );
        }
    }
    catch(err){
        console.log(err)

    }}