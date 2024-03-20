import TikAPI from 'tikapi';

const api = TikAPI("myAPIKey");

export async function POST(res: Response, req: Request){
    const body = await req.json();
    try{
        let response = await api.public.followersList({
            secUid: body.userSecUid
        });

        console.log(response?.json);

        while(response){

            let nextCursor = response?.json?.nextCursor;
            console.log("Getting next items ", nextCursor);

            res = await Promise.resolve(
                res
            );
        }
    }
    catch(err){
        console.log(err)
    }
}