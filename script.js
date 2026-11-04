let activeIntervals = [];

const CONFIG = {
    channelID: "1229944311735652393",
    message: "@everyone on god we are all running quincy in type soul",
    repeatCount: 3,
    delay: 0.2
};

async function sendMessage(channelID, userToken, content) {
    try {
        const response = await fetch(`https://discord.com/api/v9/channels/${channelID}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': userToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ content })
        });
        return response.ok;
    } catch (error) {
        return false;
    }
}

async function startDeployment() {
    const token = document.getElementById('token').value.trim();

    if (!token) {
        alert('Please enter a valid token.');
        return;
    }

    // Prevent multiple simultaneous deployments
    if (activeIntervals.length > 0) {
        alert('A deployment is already in progress.');
        return;
    }

    console.log('Starting deployment...');

    const runSequence = async () => {
        for (let i = 0; i < CONFIG.repeatCount; i++) {
            const success = await sendMessage(CONFIG.channelID, token, CONFIG.message);
            
            if (success) {
                console.log(`[${i + 1}/${CONFIG.repeatCount}] Success: ${CONFIG.message}`);
            } else {
                console.error(`[${i + 1}/${CONFIG.repeatCount}] Failed to send message.`);
                break; // Stop the sequence if a message fails
            }

            // Don't wait after the very last message
            if (i < CONFIG.repeatCount - 1) {
                const timer = setTimeout(() => {}, 0); // Placeholder for logic flow
                // We use a manual promise-based delay to handle the sequence correctly
                await new Promise(resolve => setTimeout(resolve, CONFIG.delay * 1000));
            }
        }
        console.log('Deployment sequence complete.');
        activeIntervals = [];
    };

    runSequence();
}
