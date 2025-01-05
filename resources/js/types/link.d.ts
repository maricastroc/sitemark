export interface LinkProps {
  id: number;
  platform: string;
  url: string;
  name: string;
  photo_url: string;
  user_id: number;
  display_order: number;
  is_first?: boolean;
  is_last?: boolean;
}
