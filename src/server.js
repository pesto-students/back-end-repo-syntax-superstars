const express = require('express');
const Sentry = require('@sentry/node');
const config = require('./config/config');
const cookieParser = require('cookie-parser');
var cors = require('cors');
require('./config/database');

const app = express();

Sentry.init({ 
  dsn: 'https://bb849159ca578598594c8ef8f2fe2cbc@o4505701574574080.ingest.sentry.io/4505701712855040', 
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({
      tracing: true
    }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({
      app
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!,
});

// Trace incoming requests
app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// Middleware to parse incoming JSON data
app.use(cors({
  origin: 'https://master--intelliplagiarismai.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the HTTP methods you intend to use
  allowedHeaders: ['Content-Type', 'Authorization'], // Add any additional headers your app might send
}));
app.use(express.json());
app.use(cookieParser());

app.use(cors());
app.options('*', cors());

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/project', require('./routes/project.routes'));
app.use('/api/document', require('./routes/document.routes'));
app.use('/api/plan', require('./routes/plan.routes'));
app.use('/api/report', require('./routes/report.routes'));

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

// Start the server
app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});


module.exports = app;