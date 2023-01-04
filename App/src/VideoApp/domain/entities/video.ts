export interface Video {
  _id: string;
  title: string;
  author: string;
  views: number;
  youtube_id: string;
  thumbnail_url: string;
  slug: string;
  active: boolean;
  created_date: Date;
  popularity: number;
}
