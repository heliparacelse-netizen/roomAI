import express from 'express';
import { body, validationResult } from 'express-validator';
import { analyzeRoom } from '../services/huggingfaceVision.js';
import { inferMissingObjects } from '../services/glmAdapter.js';
import { getWatermarkMode } from '../services/watermarkService.js';

const router = express.Router();

router.post(
  '/',
  [
    body('imageUrl').isString().isLength({ min: 5 }),
    body('roomType').isString().isLength({ min: 3 })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { imageUrl, roomType } = req.body;
    try {
      const analysis = await analyzeRoom({ imageUrl, roomType });
      const inferred = await inferMissingObjects({
        roomType,
        detectedObjects: analysis.detectedObjects
      });

      const assets = [...analysis.detectedObjects, ...inferred].map((item, index) => ({
        name: item,
        color: index % 2 === 0 ? '#c2d1ff' : '#d0f4ff'
      }));

      return res.json({
        roomType,
        detected: analysis.detectedObjects,
        inferred,
        assets,
        watermark: getWatermarkMode(req)
      });
    } catch (error) {
      return res.status(500).json({ error: 'Analysis failed.' });
    }
  }
);

export default router;
