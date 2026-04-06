export type Page = "Summary" | "WorkExp" | "Projects" | "Preview";

export type Project = {
  id: string;
  user_id: string;
  title: string;
  url?: string;
  date_range: string;
  description: string[];
  tags?: string[];
  is_selected: boolean;
  order: number;
};

export type Work = {
  id: string;
  user_id: string;
  title: string;
  company: string;
  date_range: string;
  description: string[];
  tags?: string[];
  is_selected: boolean;
  order: number;
};

export type Summary = {
  id: string;
  user_id: string;
  body: string;
};

export type Builder = {
  role: string;
  summary: Summary;
  works?: Work[];
  projects?: Project[];
  langs: string[];
  tools: string[];
}
