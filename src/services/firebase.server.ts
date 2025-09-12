import {
  initializeApp,
  getApps,
  cert,
  getApp,
  type App,
} from 'firebase-admin/app';
import { Auth, getAuth } from 'firebase-admin/auth';

let app: App;
let auth: Auth;

if (getApps().length === 0) {
  console.log(
    'PRIVATE_KEY START:',
    process.env.FIREBASE_PRIVATE_KEY?.slice(0, 40)
  );
  console.log(
    'Contains newline?',
    process.env.FIREBASE_PRIVATE_KEY?.includes('\n')
  );
  app = initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
  auth = getAuth(app);
} else {
  app = getApp();
  auth = getAuth(app);
}
export { auth as serverAuth };
