# Firebase Functions
## Serving for local development
1. Create a gmailConfig.ts file in the src folder in the format
```ts
const emailInfo = {
    email:'MUNI_FEEDBACK_EMAIL_HERE',
    password:'MUNI_FEEDBACK_EMAIL_PASSWORD_HERE'
}

export default emailInfo
```
2. Set prod in config.ts to false
3. Run "npm run serve" to serve functions on localhost:8080

The functions should now be live and work when you run ng serve
## Deploying to Firebase
1. Ensure that you are logged into firebase with "firebase login"
2. Ensure that prod is set to true in config.ts
3. Run "npm run deploy" and the functions should deploy to the backend
