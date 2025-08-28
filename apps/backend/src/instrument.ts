import * as Sentry from '@sentry/nestjs';
import { nodeProfilingIntegration } from '@sentry/profiling-node';

Sentry.init({
  dsn: 'https://c1ce2e565a7faa3dd0844a57876555b8@o4509921981104128.ingest.de.sentry.io/4509921983529040',
  integrations: [
    nodeProfilingIntegration(),
    Sentry.httpIntegration(),
    Sentry.consoleLoggingIntegration(),
  ],
  enableLogs: true,
  tracesSampleRate: 1,
  profileSessionSampleRate: 1,
  profileLifecycle: 'trace',
  sendDefaultPii: false,
  environment: process.env.NODE_ENV || 'development',
  beforeSend(event) {
    // anonymze for now
    delete event.server_name;
    delete event.contexts?.os;
    delete event.contexts?.runtime;
    delete event.contexts?.device;

    if (event.user) {
      delete event.user.ip_address;
      delete event.user.email;
    }
    return event;
  },
});

Sentry.startSpan(
  {
    name: 'My spann',
  },
  () => {},
);
