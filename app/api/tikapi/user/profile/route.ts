import TikAPI from "tikapi";
import { createClient } from "@/utils/supabase/route";


export async function POST(req: Request, res: Response) {

    const supabase = createClient(req);

    const tikApiKey = process.env.NEXT_PUBLIC_TIKAPI_API_KEY;
    const body = await req.json();
    const userAccessToken = body.access_token;
    const api = TikAPI(tikApiKey);
    const User = new api.user({
        accountKey: body.accountKey
    });

    (async function () {
        try {
            let profile = await User.info();
            const userProfile = await profile.json();
            console.log("user profile: ", userProfile);

            let posts = await User.posts.feed();
            let userFeed = await posts.json();
            console.log("user's feed: ", userFeed)
            while (userFeed) {

                let cursor = userFeed?.json?.cursor;
                console.log("Getting next items ", cursor);

                userFeed = await Promise.resolve(
                    userFeed?.nextItems()
                );
            }
            const userUpdatePayload = {userFeed}
            const userUpdate = await supabase // upsert to public.tikapi
        } catch (err) {
            console.log(err)
        }

    })

}