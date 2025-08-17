const { google } = require('googleapis');
const fs = require('fs');

async function getFirebaseConfig() {
  console.log('🔍 Getting Firebase Web App Configuration...\n');

  try {
    // Load service account
    const serviceAccount = require('../serviceAccountKey.json');
    
    // Setup auth
    const auth = new google.auth.GoogleAuth({
      keyFile: 'serviceAccountKey.json',
      scopes: ['https://www.googleapis.com/auth/firebase', 'https://www.googleapis.com/auth/cloud-platform']
    });

    const authClient = await auth.getClient();
    const firebase = google.firebase({ version: 'v1beta1', auth: authClient });
    
    // List existing web apps
    console.log('📱 Checking for existing web apps...');
    const projectName = `projects/${serviceAccount.project_id}`;
    
    const response = await firebase.projects.webApps.list({
      parent: projectName,
      pageSize: 100
    });
    
    const apps = response.data.apps || [];
    console.log(`Found ${apps.length} web app(s)\n`);
    
    if (apps.length === 0) {
      console.log('❌ No web apps found!');
      console.log('\n📝 To create a web app:');
      console.log('1. Go to: https://console.firebase.google.com/project/aura-spring-cleaning-ce122/settings/general');
      console.log('2. Scroll down to "Your apps"');
      console.log('3. Click the </> icon (Add web app)');
      console.log('4. Enter name: "Aura Spring Website"');
      console.log('5. Click "Register app"');
      console.log('6. Run this script again\n');
      return;
    }
    
    // Get the first web app (or the one we created)
    const webApp = apps.find(app => app.displayName === 'Aura Spring Website') || apps[0];
    console.log(`Using web app: ${webApp.displayName || 'Unnamed'}`);
    console.log(`App Name: ${webApp.name}`);
    console.log(`App ID: ${webApp.appId}\n`);
    
    // Get the configuration
    console.log('🔧 Getting configuration...');
    const configResponse = await firebase.projects.webApps.getConfig({
      name: `${webApp.name}/config`
    });
    
    const config = configResponse.data;
    
    // Display configuration
    console.log('\n✅ Firebase Web App Configuration:\n');
    console.log('```javascript');
    console.log('const firebaseConfig = {');
    console.log(`  apiKey: "${config.apiKey}",`);
    console.log(`  authDomain: "${config.authDomain}",`);
    console.log(`  projectId: "${config.projectId}",`);
    console.log(`  storageBucket: "${config.storageBucket}",`);
    console.log(`  messagingSenderId: "${config.messagingSenderId}",`);
    console.log(`  appId: "${webApp.appId}"`);
    if (config.measurementId) {
      console.log(`  measurementId: "${config.measurementId}"`);
    }
    console.log('};');
    console.log('```\n');
    
    // Update .env.local
    console.log('📝 Updating .env.local...');
    const envPath = '.env.local';
    let envContent = fs.readFileSync(envPath, 'utf8');
    
    // Remove old Firebase web config if exists
    envContent = envContent.replace(/\n# Firebase Web App Configuration[\s\S]*?(?=\n#|\n\n|$)/g, '');
    
    // Add new config
    const newConfig = `
# Firebase Web App Configuration (Retrieved ${new Date().toISOString()})
NEXT_PUBLIC_FIREBASE_API_KEY=${config.apiKey}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${config.authDomain}
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${config.projectId}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${config.storageBucket}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${config.messagingSenderId}
NEXT_PUBLIC_FIREBASE_APP_ID=${webApp.appId}${config.measurementId ? `
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=${config.measurementId}` : ''}`;
    
    envContent += newConfig;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Environment variables updated!\n');
    
    // Update firestoreChatbot.ts
    console.log('🔧 Updating chat configuration...');
    const chatbotPath = 'lib/firestoreChatbot.ts';
    if (fs.existsSync(chatbotPath)) {
      let chatbotContent = fs.readFileSync(chatbotPath, 'utf8');
      
      // Update the config in the file
      chatbotContent = chatbotContent.replace(
        /const firebaseConfig = \{[\s\S]*?\};/,
        `const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "${config.apiKey}",
  authDomain: "${config.authDomain}",
  projectId: "${config.projectId}",
  storageBucket: "${config.storageBucket}",
  messagingSenderId: "${config.messagingSenderId}",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "${webApp.appId}"${config.measurementId ? `,
  measurementId: "${config.measurementId}"` : ''}
};`
      );
      
      fs.writeFileSync(chatbotPath, chatbotContent);
      console.log('✅ Chat configuration updated!\n');
    }
    
    console.log('='.repeat(50));
    console.log('✅ CONFIGURATION COMPLETE!');
    console.log('='.repeat(50));
    console.log('\nNext steps:');
    console.log('1. Deploy Firestore rules:');
    console.log('   firebase deploy --only firestore:rules');
    console.log('   OR manually update at:');
    console.log('   https://console.firebase.google.com/project/aura-spring-cleaning-ce122/firestore/rules');
    console.log('\n2. Restart dev server:');
    console.log('   npm run dev');
    console.log('\n3. Test the AI chat!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    if (error.code === 404) {
      console.log('\n📝 No web apps found. Please create one:');
      console.log('1. Go to: https://console.firebase.google.com/project/aura-spring-cleaning-ce122/settings/general');
      console.log('2. Add a web app');
      console.log('3. Run this script again');
    }
  }
}

getFirebaseConfig();