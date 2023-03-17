import { ZaxConfig } from "./Config"

export class EnvConfig implements ZaxConfig {
  webserviceUrl = process.env.REACT_APP_WEBSERVICE_URL!;
  notificationServiceUrl = process.env.REACT_APP_NOTIFICATION_SERVICE_URL!;
  streamApiKey = process.env.REACT_APP_STREAM_API_KEY!;
  streamAppId = process.env.REACT_APP_STREAM_APP_ID!;
  cloudfrontUrl =  process.env.REACT_APP_STATIC_CLOUDFRONT_URL!;
  stripePublishableKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY!;
  googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAP_API_KEY!;
}
const envConfig = new EnvConfig() as ZaxConfig;
export {
  envConfig
}