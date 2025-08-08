const axios = require('axios');

const TEAMS_WEBHOOK_URL = 'https://adminaccountbcd.webhook.office.com/webhookb2/df9b5b12-f537-435b-a578-c6f540ae7c5c@753965c2-2a85-437e-a9c9-9f824df99584/IncomingWebhook/ade6e7bcf89a420f97b09dd6ca021bbc/85ae95d7-aee8-44ea-8e78-af97c72fa4a9/V2ChyK7Cl-K-zvRJAyxjNAJe8th0jh-73cKcm4Wdw7mfY1';

async function testTeamsWebhook() {
  const payload = {
    '@type': 'MessageCard',
    '@context': 'https://schema.org/extensions',
    themeColor: '00ff00',
    summary: 'Test Notification from Aura Spring Cleaning',
    sections: [{
      activityTitle: '🎉 Aura Spring Cleaning Webhook Test',
      activitySubtitle: new Date().toLocaleString('en-US', { 
        timeZone: 'America/Chicago',
        dateStyle: 'full',
        timeStyle: 'short'
      }),
      text: 'This is a test notification to verify Teams webhook integration is working correctly.',
      facts: [
        { name: 'Environment', value: 'Development' },
        { name: 'Service', value: 'Aura Spring Cleaning' },
        { name: 'Status', value: 'Webhook Connected' },
        { name: 'Test Time', value: new Date().toISOString() }
      ]
    }],
    potentialAction: [
      {
        '@type': 'OpenUri',
        name: 'Visit Website',
        targets: [
          { os: 'default', uri: 'https://aurasprings.com' }
        ]
      }
    ]
  };

  try {
    console.log('Sending test notification to Teams...');
    const response = await axios.post(TEAMS_WEBHOOK_URL, payload, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log('✅ Success! Teams webhook is working.');
    console.log('Response:', response.data);
  } catch (error) {
    console.error('❌ Error sending to Teams:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

testTeamsWebhook();