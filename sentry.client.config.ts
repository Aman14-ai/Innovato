import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://35bf07d4921ad85c1a169b89dffe4f49@o4509304257118208.ingest.us.sentry.io/4509304290213888",
  integrations: [
    Sentry.feedbackIntegration({
      // Additional SDK configuration goes in here, for example:
      colorScheme: "system",
    }),
  ],
});