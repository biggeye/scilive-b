import createContentRecord from '@/lib/dashboard/receive/createRecord';

export const fetchVoiceoverScript = async (
    hostName: string, 
    podcastName: string, 
    webpageUrl: string, 
    userId: string
) => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_DEFAULT_URL}/api/leap/websummary`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${process.env.NEXT_PUBLIC_LEAP_API_KEY}`,
            },
            body: JSON.stringify({
                webpage_url: webpageUrl,
                host: hostName,
                podcast: podcastName,
                user_id: userId,
            }),
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        if (!data.body || typeof data.body.id === 'undefined') {
            throw new Error('Response data is missing the expected structure');
        }

        const recordData = await createContentRecord(userId, data.body.id);

        return {
            success: true,
            data: recordData.prediction_id, // Assuming this is the intended return structure
        };
    } catch (error) {
        console.error('Error fetching script:', error);
        // Depending on how detailed you want the error handling to be,
        // you might consider differentiating types of errors here
        return {
            success: false,
            error: error.message || 'An unexpected error occurred',
        };
    }
};
