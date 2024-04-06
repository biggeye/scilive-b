// fetchVoiceOverScript.ts
export const fetchVoiceoverScript = async (input: { webpageUrl?: string; userSummary?: string }) => {
  // Determine the endpoint based on the input provided
  const endpoint = input.webpageUrl ? 'websitesummary' : 'usersummary';
  const apiUrl = `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/leap/${endpoint}`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const predictionResponse: { id?: string; detail?: string; script?: string } = await response.json();
    if (predictionResponse.id) {
      // If specifically looking for a script, check for that property
      if (predictionResponse.script) {
        return predictionResponse.script;
      } else {
        return predictionResponse.id; // Or return id as fallback or based on your needs
      }
    } else {
      throw new Error(predictionResponse.detail || "Unknown error");
    }
  } catch (error) {
    throw new Error("unknown internal server error");
  }
};
