// fetchVoiceOverScript.ts
export const fetchVoiceoverScript = async (requestBody: any) => {
  const input_type = await requestBody.webpageUrl;
  if (input_type) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/leap/websitesummary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else if (
      response.headers.get("Content-Type")?.includes("application/json")
    ) {
      const predictionResponse: { id?: string; detail?: string } = await response.json();
      if (predictionResponse.id) {
        return predictionResponse.id;
      } else {
        throw new Error(predictionResponse.detail || "Unknown error");
      }
    } else {
      throw new Error("Response not JSON");
    }
  }  else {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/leap/usersummary`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
  
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else if (
      response.headers.get("Content-Type")?.includes("application/json")
    ) {
      const predictionResponse: { id?: string; detail?: string } = await response.json();
      if (predictionResponse.id) {
        return predictionResponse.id;
      } else {
        throw new Error(predictionResponse.detail || "Unknown error");
      }
    } else {
      throw new Error("Response not JSON");
    }
  }
  }

  