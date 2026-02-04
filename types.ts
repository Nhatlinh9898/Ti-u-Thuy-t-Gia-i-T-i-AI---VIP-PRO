export enum NodeType {
  NOVEL = 'Tiểu thuyết',
  PART = 'Phần',
  CHAPTER = 'Chương',
  ACT = 'Hồi',
  SECTION = 'Mục'
}

export interface NovelNode {
  id: string;
  type: NodeType;
  title: string;
  summary?: string;
  content?: string;
  children: NovelNode[];
  isExpanded?: boolean;
}

export interface NovelConfig {
  genre: string;
  tone: string;
  pov: string; // Point of View
  setting: string;
  plotIdea: string;
  mainCharacter: string;
}

export interface VoiceConfig {
  enabled: boolean;
  voiceURI: string | null;
  rate: number;
  pitch: number;
}

export enum GeneratorMode {
  STRUCTURE = 'STRUCTURE',
  CONTINUE = 'CONTINUE',
  SUMMARIZE = 'SUMMARIZE',
  TITLE = 'TITLE',
  ENDING = 'ENDING',
  INTRO_STORYTELLER = 'INTRO_STORYTELLER',
  OPTIONS = 'OPTIONS'
}