export const environment = {
  firebase: {
    app: import.meta.env.NG_APP_ENV,
    projectId: import.meta.env.NG_APP_PROJECTID,
    appId: import.meta.env.NG_APP_APPID,
    storageBucket: import.meta.env.NG_APP_STORAGEBUCKET,
    apiKey: import.meta.env.NG_APP_APIKEY,
    authDomain: import.meta.env.NG_APP_AUTHDOMAIN,
    messagingSenderId: import.meta.env.NG_APP_MESSAGINGSENDERID,
    measurementId: import.meta.env.NG_APP_MEASUREMENTID,
  },
  production: true
};
