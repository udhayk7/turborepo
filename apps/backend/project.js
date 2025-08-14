// project.routes.js
import express from "express";
import { z } from "zod";
import { prismaClient as prisma } from "db";

const router = express.Router();

/* -------------------- ZOD SCHEMAS -------------------- */

// Project creation schema
const createProjectSchema = z.object({
    userId: z.string(),
    title: z.string().min(1),
    targetPlatform: z.string().min(1),
    style: z.string().optional(),
  });
  
  const updateProjectSchema = z.object({
    title: z.string().optional(),
    aspectRatio: z.string().optional(),
    brandKit: z.string().optional(),
  });
  
  const mediaUploadSchema = z.object({
    fileUrl: z.string().url(),
  });

// Transcription schema
const transcribeSchema = z.object({
  mediaUrl: z.string().url(),
});

// Highlight detect schema
const highlightSchema = z.object({
  transcriptId: z.string().optional(),
  text: z.string().optional(),
});

// Clip assemble schema
const clipAssembleSchema = z.object({
  highlights: z.array(
    z.object({
      start: z.number(),
      end: z.number(),
    })
  ),
  stylePreset: z.string().optional(),
  musicPreference: z.string().optional(),
});

// B-roll schema
const brollSchema = z.object({
  transcript: z.string(),
  keywords: z.array(z.string()),
});

// Captions schema
const captionsSchema = z.object({
  videoSegmentId: z.string(),
  style: z.string().optional(),
});

// Translation schema
const translateSchema = z.object({
  captionFileUrl: z.string().url(),
  targetLanguage: z.string().min(2),
});

// Export schema
const exportSchema = z.object({
  resolution: z.string(),
  format: z.string(),
  captionStyle: z.string().optional(),
  introOutro: z.string().optional(),
});

// Invite schema
const inviteSchema = z.object({
  role: z.enum(["viewer", "editor"]),
  email: z.string().email(),
});

/* -------------------- ENDPOINTS -------------------- */

// 1. Project & Media Management
router.post("/videos", async (req, res) => {
    const parsed = createProjectSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
  
    try {
      const project = await prisma.video.create({
        data: {
          userId: parsed.data.userId,
          title: parsed.data.title,
          originalUrl: "",
          size: 0n,
          status: "UPLOADING",
        },
      });
      res.json({ status: "ok", project });
    } catch (err) {
      console.error(err);
      res.status(500).json({ status: "error", message: "DB error" });
    }
  });
  
router.get("/videos", async (req, res) => {
    try {
      const projects = await prisma.video.findMany();
      res.json({ status: "ok", projects });
    } catch (err) {
      res.status(500).json({ status: "error", message: "DB error" });
    }
  });
  
router.get("/videos/:videoId", async (req, res) => {
    try {
      const project = await prisma.video.findUnique({
        where: { id: req.params.videoId },
      });
      if (!project) return res.status(404).json({ status: "error", message: "Not found" });
      res.json({ status: "ok", project });
    } catch (err) {
      res.status(500).json({ status: "error", message: "DB error" });
    }
  });
  
router.put("/videos/:videoId", async (req, res) => {
    const parsed = updateProjectSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
  
    try {
      const updated = await prisma.video.update({
        where: { id: req.params.videoId },
        data: parsed.data,
      });
      res.json({ status: "ok", project: updated });
    } catch (err) {
      res.status(500).json({ status: "error", message: "DB error" });
    }
  });
  
router.delete("/videos/:videoId", async (req, res) => {
    try {
      await prisma.video.delete({ where: { id: req.params.videoId } });
      res.json({ status: "ok", message: "Project deleted" });
    } catch (err) {
      res.status(500).json({ status: "error", message: "DB error" });
    }
  });
  
  // 2. Media Upload
  router.post("/projects/:projectId/media", async (req, res) => {
    const parsed = mediaUploadSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
  
    // Here you’d store media record in DB
    res.json({ status: "ok", url: parsed.data.fileUrl });
  });

router.delete("/media/:mediaId", (req, res) => {
  res.json({ status: "ok", message: "Media deleted" });
});

// 2. AI-Assisted Editing
router.post("/ai/transcribe", (req, res) => {
  const parsed = transcribeSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  res.json({ status: "ok", transcript: "Sample transcript" });
});

router.post("/ai/highlight-detect", (req, res) => {
  const parsed = highlightSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  res.json({ status: "ok", highlights: [] });
});

router.post("/ai/clip-assemble", (req, res) => {
  const parsed = clipAssembleSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  res.json({ status: "ok", jobId: "123" });
});

router.get("/ai/clip-assemble/:jobId", (req, res) => {
  res.json({ status: "ok", status: "Rendering" });
});

router.post("/ai/b-roll-suggest", (req, res) => {
  const parsed = brollSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  res.json({ status: "ok", suggestions: [] });
});

router.post("/ai/captions/generate", (req, res) => {
  const parsed = captionsSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  res.json({ status: "ok", captionsUrl: "https://example.com/captions.srt" });
});

router.post("/ai/captions/translate", (req, res) => {
  const parsed = translateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  res.json({ status: "ok", translatedUrl: "https://example.com/translated.srt" });
});

// 3. Generative Assets
router.post("/ai/image-generate", (req, res) => {
  res.json({ status: "ok", imageUrl: "https://example.com/image.png" });
});

router.post("/ai/music-generate", (req, res) => {
  res.json({ status: "ok", musicUrl: "https://example.com/music.mp3" });
});

// 4. Rendering & Export
router.post("/exports", (req, res) => {
  const parsed = exportSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  res.json({ status: "ok", exportId: "exp123" });
});

router.get("/exports/:exportId", (req, res) => {
  res.json({ status: "ok", status: "Completed", url: "https://download.com/file.mp4" });
});

// 5. Billing & Quotas
router.get("/credits", (req, res) => {
  res.json({ status: "ok", credits: 100 });
});

router.post("/checkout/session", (req, res) => {
  res.json({ status: "ok", checkoutUrl: "https://stripe.com/checkout" });
});

router.post("/stripe/webhook", (req, res) => {
  console.log(req.body);
  res.json({ status: "ok", message: "Stripe webhook received" });
});

// 6. Collaboration & Sharing
router.post("/projects/:projectId/invite", (req, res) => {
  const parsed = inviteSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json(parsed.error);
  res.json({ status: "ok", message: "Invite sent" });
});

router.get("/projects/:projectId/history", (req, res) => {
  res.json({ status: "ok", history: [] });
});

// 7. Auth & User Profile
router.post("/auth/signup", (req, res) => res.json({ status: "ok" }));
router.post("/auth/login", (req, res) => res.json({ status: "ok" }));
router.post("/auth/logout", (req, res) => res.json({ status: "ok" }));

router.get("/profile", (req, res) => res.json({ status: "ok", profile: {} }));
router.put("/profile", (req, res) => res.json({ status: "ok" }));

// 8. Webhooks
router.post("/webhook/render", (req, res) => {
  console.log(req.body);
  res.json({ status: "ok", message: "Render webhook received" });
});

router.post("/webhook/ai", (req, res) => {
  console.log(req.body);
  res.json({ status: "ok", message: "AI webhook received" });
});

export default router;