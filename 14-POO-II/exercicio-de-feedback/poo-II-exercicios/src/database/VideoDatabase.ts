import { BaseDatabase } from "./knex";
import { VideosDB } from "../types";

export class VideoDatabase extends BaseDatabase {
  public static TABLE_USER = "videos";

  public async findVideo(): Promise<VideosDB[]> {
    const videosDB: VideosDB[] = await BaseDatabase.conection(
      VideoDatabase.TABLE_USER
    );
    return videosDB;
  }

  public async findVideoById(id: string): Promise<VideosDB> {
    const [videoDB]: VideosDB[] = await BaseDatabase.conection(
      VideoDatabase.TABLE_USER
    ).where({ id });
    return videoDB;
  }

  public async createVideo(newVideo: VideosDB): Promise<void> {
    await BaseDatabase.conection(VideoDatabase.TABLE_USER).insert(newVideo);
  }

  public async updateVideo(updateVideo: VideosDB, id: string): Promise<void> {
    await BaseDatabase.conection(VideoDatabase.TABLE_USER)
      .update(updateVideo)
      .where({ id });
  }

  public async deleteVideo(id: string): Promise<void> {
    await BaseDatabase.conection(VideoDatabase.TABLE_USER).del().where({ id });
  }
}
