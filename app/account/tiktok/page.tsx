import TikAPI from 'tikapi';
const tikApiKey = process.env.NEXT_PUBLIC_TIKAPI_API_KEY;
const api = TikAPI(tikApiKey);

api.set({
    $sandbox: true
});