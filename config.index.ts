import { writeFile } from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
   production: true,
   firebase: {
      apiKey: '${process.env.TIC_TAC_TOE_API_KEY}',
      authDomain: '${process.env.TIC_TAC_TOE_AUTH_DOMAIN}',
      databaseURL: '${process.env.TIC_TAC_TOE_DATABASE_URL}',
      projectId: '${process.env.TIC_TAC_TOE_PROJECT_ID}',
      storageBucket: '${process.env.TIC_TAC_TOE_STORAGE_BUCKET}',
      messagingSenderId: '${process.env.TIC_TAC_TOE_MESSAGING_SENDER_ID}',
      appId: '${process.env.TIC_TAC_TOE_APP_ID}',
      measurementId: '${process.env.TIC_TAC_TOE_MEASUREMENT_ID}'
    }
};
`;

writeFile(targetPath, envConfigFile, 'utf8', (err) => {
  if (err) {
    return console.log(err);
  }
});
