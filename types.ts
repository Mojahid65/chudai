export enum PromptStyle {
  SHORT = 'Short & Concise',
  DETAILED = 'Detailed & Descriptive',
  ARTISTIC = 'Highly Artistic',
  PHOTOGRAPHY = 'Photography / Realism',
  ANIME = 'Anime / Illustration',
}

export interface GenerationResult {
  prompt: string;
  timestamp: number;
}

export interface PromptRequest {
  image: File;
  style: PromptStyle;
}

export interface HistoryItem {
  id: string;
  thumbnail: string; // Base64 data URL
  prompt: string;
  timestamp: number;
  style: PromptStyle;
}