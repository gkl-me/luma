/**
 * Luma Demo Data
 * Simulated data for a PDF document with chapters and audio metadata.
 */

export type Chapter = {
  id: string;
  number: number;
  title: string;
  duration: string; // mm:ss
  durationSeconds: number;
  pages: string; // e.g. "1–24"
  summary: string;
  status: "done" | "playing" | "idle";
  progress: number; // 0–100 percent listened
  accentColor: string;
};

export type Document = {
  id: string;
  title: string;
  author: string;
  totalPages: number;
  totalChapters: number;
  uploadedAt: string;
  coverGradient: string;
  chapters: Chapter[];
};

export const demoDocument: Document = {
  id: "doc-001",
  title: "Deep Learning: A Practitioner's Guide",
  author: "Yusuf Adekunle & Priya Mehta",
  totalPages: 312,
  totalChapters: 8,
  uploadedAt: "Sep 25, 2026",
  coverGradient: "linear-gradient(135deg, #FFD60A 0%, #FF6B2B 55%, #FF3D5A 100%)",
  chapters: [
    {
      id: "ch-01",
      number: 1,
      title: "Introduction to Neural Networks",
      duration: "18:42",
      durationSeconds: 1122,
      pages: "1–38",
      summary:
        "Covers the biological inspiration behind neural networks, perceptrons, activation functions, and the universal approximation theorem.",
      status: "done",
      progress: 100,
      accentColor: "#FFD60A",
    },
    {
      id: "ch-02",
      number: 2,
      title: "Backpropagation & Gradient Descent",
      duration: "24:11",
      durationSeconds: 1451,
      pages: "39–82",
      summary:
        "Deep dive into the chain rule, vanishing/exploding gradients, SGD variants, and learning rate schedules.",
      status: "done",
      progress: 100,
      accentColor: "#FF6B2B",
    },
    {
      id: "ch-03",
      number: 3,
      title: "Convolutional Neural Networks",
      duration: "31:05",
      durationSeconds: 1865,
      pages: "83–134",
      summary:
        "Explains convolutions, pooling layers, receptive fields, and famous architectures like VGG, ResNet, and EfficientNet.",
      status: "playing",
      progress: 47,
      accentColor: "#4361EE",
    },
    {
      id: "ch-04",
      number: 4,
      title: "Recurrent Networks & LSTMs",
      duration: "28:34",
      durationSeconds: 1714,
      pages: "135–178",
      summary:
        "Sequential modeling, hidden states, BPTT, long short-term memory cells, GRUs, and applications in NLP.",
      status: "idle",
      progress: 0,
      accentColor: "#7B2FBE",
    },
    {
      id: "ch-05",
      number: 5,
      title: "Attention & Transformers",
      duration: "36:48",
      durationSeconds: 2208,
      pages: "179–222",
      summary:
        "Self-attention mechanism, multi-head attention, positional encodings, BERT, GPT, and vision transformers.",
      status: "idle",
      progress: 0,
      accentColor: "#FF3D5A",
    },
    {
      id: "ch-06",
      number: 6,
      title: "Generative Adversarial Networks",
      duration: "22:19",
      durationSeconds: 1339,
      pages: "223–258",
      summary:
        "The minimax game, mode collapse, DCGAN, conditional GANs, and image synthesis use cases.",
      status: "idle",
      progress: 0,
      accentColor: "#00D4AA",
    },
    {
      id: "ch-07",
      number: 7,
      title: "Reinforcement Learning Fundamentals",
      duration: "27:50",
      durationSeconds: 1670,
      pages: "259–288",
      summary:
        "Markov decision processes, Q-learning, policy gradients, actor-critic methods, and deep RL.",
      status: "idle",
      progress: 0,
      accentColor: "#ADFF2F",
    },
    {
      id: "ch-08",
      number: 8,
      title: "Deploying Models at Scale",
      duration: "15:33",
      durationSeconds: 933,
      pages: "289–312",
      summary:
        "Model quantization, distillation, ONNX, serving with TensorRT, monitoring drift, and ethical considerations.",
      status: "idle",
      progress: 0,
      accentColor: "#00CFFF",
    },
  ],
};
