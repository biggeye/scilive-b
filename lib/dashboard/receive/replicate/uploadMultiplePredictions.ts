import { uploadPrediction } from "./uploadPrediction";
export async function uploadMultiplePredictions(
    contents: string[],
    userId: string,
    modelId: string,
    predictionId: string,
    prompt: string
): Promise<string[]> {
    const urls = await Promise.all(contents.map((content, index) =>
        uploadPrediction(content, userId, modelId, `${predictionId}`, prompt, `${predictionId}-${index}`)
    ));
    return urls;
}
