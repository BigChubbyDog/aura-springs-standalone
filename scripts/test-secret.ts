// Test if the new secret is being loaded correctly
import 'dotenv/config';

console.log('Testing Environment Variables\n');
console.log('================================\n');

console.log('AZURE_CLIENT_ID:', process.env.AZURE_CLIENT_ID);
console.log('AZURE_CLIENT_SECRET:', process.env.AZURE_CLIENT_SECRET?.substring(0, 10) + '...');
console.log('DYNAMICS_365_CLIENT_SECRET:', process.env.DYNAMICS_365_CLIENT_SECRET?.substring(0, 10) + '...');

// Test authentication with new secret
import { ClientSecretCredential } from '@azure/identity';

const credential = new ClientSecretCredential(
  '753965c2-2a85-437e-a9c9-9f824df99584',
  '94d3924d-79c4-4280-975d-8223752343b8',
  process.env.AZURE_CLIENT_SECRET || 'process.env.AZURE_CLIENT_SECRET'
);

async function testAuth() {
  try {
    console.log('\nTesting authentication with new secret...');
    const token = await credential.getToken('https://graph.microsoft.com/.default');
    if (token) {
      console.log('✅ Authentication successful with new secret!');
      console.log('Token expires at:', new Date(token.expiresOnTimestamp));
    }
  } catch (error: any) {
    console.log('❌ Authentication failed:', error.message);
  }
}

testAuth();