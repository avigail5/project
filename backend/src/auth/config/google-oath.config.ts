import { registerAs } from "@nestjs/config"

export default registerAs("goopleOAth", ()=>({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
}));