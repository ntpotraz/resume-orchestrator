export type Project = {
  id: string;
  user_id: string;
  title: string;
  url?: string;
  date_range: string;
  description: string[];
  tags: string[];
  is_selected: boolean;
  order: number;
}
