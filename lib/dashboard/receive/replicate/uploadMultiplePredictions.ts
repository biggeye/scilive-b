import { uploadPrediction } from "./uploadPrediction";

export async function uploadMultiplePredictions(
  contents: string[],
  predictionId: string
): Promise<string[]> {
  try {
    // Upload each prediction asynchronously and collect the URLs
    const urls = await Promise.all(contents.map(async (content) => {
      const url = await uploadPrediction(content, predictionId);
      return url;
    }));

    return urls;
  } catch (error) {
    console.error('Error during uploadMultiplePredictions:', error);
    throw new Error('Error during uploadMultiplePredictions');
  }
}
