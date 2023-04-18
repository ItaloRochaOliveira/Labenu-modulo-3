export interface VideosDB {
  id: string;
  title: string;
  duration: number;
  created_at: string;
}

export interface UpdateVideoInputDTO {
  title: string | undefined;
  duration: number | undefined;
}
