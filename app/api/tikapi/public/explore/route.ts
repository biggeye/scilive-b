import TikAPI from 'tikapi';

const api = TikAPI("myAPIKey");

export async function POST(req: Request, res: Response) {
    const body = await req.json();
    const postCount = body.postCount;
    const country = body.country;
    try {
        let trendingTopics = await api.public.explore({
            session_id: 0,
            count: postCount,
            country: country
        });
        console.log(trendingTopics.json);
        return trendingTopics;
    }
    catch (err) {
        console.log(err);
    }
}