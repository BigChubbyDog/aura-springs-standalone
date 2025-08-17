const admin = require('firebase-admin');
const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

// Load service account
const serviceAccount = require('../serviceAccountKey.json');

// Initialize admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'aura-spring-cleaning-ce122'
});

async function setupFirebase() {
  console.log('🚀 Starting Firebase automated setup...\n');

  try {
    // 1. Create Web App using Firebase Management API
    console.log('📱 Creating Firebase Web App...');
    
    const auth = new google.auth.GoogleAuth({
      keyFile: 'serviceAccountKey.json',
      scopes: ['https://www.googleapis.com/auth/firebase', 'https://www.googleapis.com/auth/cloud-platform']
    });

    const authClient = await auth.getClient();
    const firebase = google.firebase({ version: 'v1beta1', auth: authClient });
    
    // Check if web app already exists
    const projectName = `projects/${serviceAccount.project_id}`;
    let apps;
    try {
      const response = await firebase.projects.webApps.list({
        parent: projectName,
        pageSize: 100
      });
      apps = response.data.apps || [];
      console.log(`Found ${apps.length} existing web apps`);
    } catch (error) {
      console.log('No existing web apps found');
      apps = [];
    }

    let webApp = apps.find(app => app.displayName === 'Aura Spring Website');
    
    if (!webApp) {
      // Create new web app
      const createResponse = await firebase.projects.webApps.create({
        parent: projectName,
        requestBody: {
          displayName: 'Aura Spring Website'
        }
      });
      
      webApp = createResponse.data;
      console.log('✅ Web app created:', webApp.appId);
    } else {
      console.log('✅ Web app already exists:', webApp.appId);
    }

    // 2. Get Web App Configuration
    console.log('\n🔧 Getting web app configuration...');
    const configResponse = await firebase.projects.webApps.getConfig({
      name: `${webApp.name}/config`
    });

    const config = configResponse.data;
    console.log('✅ Configuration retrieved');

    // 3. Update .env.local with Firebase config
    console.log('\n📝 Updating .env.local...');
    const envPath = path.join(process.cwd(), '.env.local');
    let envContent = fs.readFileSync(envPath, 'utf8');

    // Remove old Firebase web config if exists
    envContent = envContent.replace(/\n# Firebase Web App Configuration[\s\S]*?(?=\n#|\n\n|$)/g, '');

    // Add new config
    const newConfig = `
# Firebase Web App Configuration (Auto-generated ${new Date().toISOString()})
NEXT_PUBLIC_FIREBASE_API_KEY=${config.apiKey}
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=${config.authDomain}
NEXT_PUBLIC_FIREBASE_PROJECT_ID=${config.projectId}
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=${config.storageBucket}
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=${config.messagingSenderId}
NEXT_PUBLIC_FIREBASE_APP_ID=${webApp.appId || webApp.name.split('/').pop()}
${config.measurementId ? `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=${config.measurementId}` : ''}`;

    envContent += newConfig;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Environment variables updated');

    // 4. Update firestoreChatbot.ts with the config
    console.log('\n🔧 Updating Firebase configuration in code...');
    const chatbotPath = path.join(process.cwd(), 'lib', 'firestoreChatbot.ts');
    let chatbotContent = fs.readFileSync(chatbotPath, 'utf8');

    // Update the config in the file
    chatbotContent = chatbotContent.replace(
      /const firebaseConfig = \{[\s\S]*?\};/,
      `const firebaseConfig = {
  apiKey: "${config.apiKey}",
  authDomain: "${config.authDomain}",
  projectId: "${config.projectId}",
  storageBucket: "${config.storageBucket}",
  messagingSenderId: "${config.messagingSenderId}",
  appId: "${webApp.appId || webApp.name.split('/').pop()}"${config.measurementId ? `,
  measurementId: "${config.measurementId}"` : ''}
};`
    );

    fs.writeFileSync(chatbotPath, chatbotContent);
    console.log('✅ Chat configuration updated');

    // 5. Deploy Firestore rules
    console.log('\n📜 Deploying Firestore rules...');
    const rulesContent = fs.readFileSync('firestore.rules', 'utf8');
    
    // Note: Direct rules deployment requires Firebase CLI or REST API
    console.log('⚠️  Please run: firebase deploy --only firestore:rules');
    console.log('   Or manually update rules in Firebase Console');

    // 6. Test Firestore connection
    console.log('\n🧪 Testing Firestore connection...');
    const db = admin.firestore();
    const testDoc = await db.collection('_test').add({
      test: true,
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('✅ Firestore write successful:', testDoc.id);
    
    // Clean up test document
    await testDoc.delete();
    console.log('✅ Test document cleaned up');

    // Summary
    console.log('\n' + '='.repeat(50));
    console.log('✅ FIREBASE SETUP COMPLETE!');
    console.log('='.repeat(50));
    console.log('\nYour configuration:');
    console.log(`  Project ID: ${config.projectId}`);
    console.log(`  Web App ID: ${webApp.appId}`);
    console.log(`  API Key: ${config.apiKey.substring(0, 10)}...`);
    console.log('\nNext steps:');
    console.log('1. Deploy Firestore rules: firebase deploy --only firestore:rules');
    console.log('2. Restart dev server: npm run dev');
    console.log('3. Test the chat on your website!');
    console.log('\nMonitor at:');
    console.log(`  https://console.firebase.google.com/project/${config.projectId}`);

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.error('\nError details:', error);
    
    if (error.code === 'ENOENT') {
      console.error('\n⚠️  Make sure serviceAccountKey.json exists in the project root');
    }
  }
}

// Run the setup
setupFirebase().then(() => {
  process.exit(0);
}).catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});