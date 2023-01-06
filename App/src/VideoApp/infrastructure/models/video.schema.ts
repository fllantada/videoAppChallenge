import { Schema, model, connect } from "mongoose";
import { Video as IVideo } from "src/VideoApp/domain/entities/video";

const videoSchema = new Schema<IVideo>({
  title: String,
  author: String,
  views: Number,
  youtube_id: String,
  thumbnail_url: String,
  slug: String,
  active: Boolean,
  created_date: Date,
  popularity: Number,
});

const videoModel = model<IVideo>("Video", videoSchema);

export default videoModel;
