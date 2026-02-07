import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import uploadImageRoute from './routes/upload-image.js';
import analyzeSceneRoute from './routes/analyze-scene.js';
import paymentsRoute from './routes/payments.js';
import webhooksRoute from './routes/webhooks.js';

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 120
});

app.use(helmet());
app.use(cors({ origin: process.env.FRONTEND_ORIGIN || '*' }));
app.use(morgan('dev'));
app.use(limiter);
app.use('/uploads', express.static('uploads'));
app.use('/api/webhooks', webhooksRoute);
app.use(express.json({ limit: '5mb' }));

app.use('/api/upload-image', uploadImageRoute);
app.use('/api/analyze-scene', analyzeSceneRoute);
app.use('/api/payments', paymentsRoute);

const profiles = new Map();

app.get('/api/profile', (req, res) => {
  res.json({ profile: profiles.get('default') || {} });
});

app.post('/api/profile', (req, res) => {
  const { displayName, avatar } = req.body;
  profiles.set('default', { displayName, avatar });
  res.json({ status: 'ok' });
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`RoomAI backend running on port ${port}`);
});
