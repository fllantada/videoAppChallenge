import { Schema, model, connect } from "mongoose";
import { Video as IVideo } from "src/VideoApp/domain/entities/video";

// 1. Create an interface representing a document in MongoDB.

// 2. Create a Schema corresponding to the document interface.
const videoSchema = new Schema<IVideo>({
  _id: String,
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

// 3. Create a Model.
const videoModel = model<IVideo>("Video", videoSchema);

export default videoModel;
/* run().catch((err) => console.log(err));

async function run() {
  // 4. Connect to MongoDB
  const video = new Video({
    _id: "1",
    title: "Video 1",
    author: "Author 1",
    views: 1,
    youtube_id: "youtube_id 1",
    thumbnail_url: "thumbnail_url 1",
    slug: "slug 1",
    active: true,
    created_date: new Date(),
    popularity: 1,
  });
  await video.save();
  console.log(video._id); // '5e9e0f8c7f1cfc0b8c7b0f5c'
}
 */
