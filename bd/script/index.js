import { MongoClient } from "mongodb";
import { faker } from "@faker-js/faker";

async function start() {
  const db = await connectMongo();
  const randomVideos = createRandomVideos(100);
  const videos = db.collection("videos");
  await videos.insertMany(randomVideos);
  //close conection
  process.exit(0);
}

start();

export async function connectMongo() {
  const url = "mongodb://localhost:27017";
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true });
    console.log("Connected to MongoDB");

    const db = client.db("videoApp");
    return db;
  } catch (error) {
    console.error(error);
  }
}

function createRandomVideos(n) {
  const videos = [];
  const today = getTodayFormat();
  for (let i = 0; i < n; i++) {
    videos.push({
      title: faker.lorem.words(),
      author: faker.internet.userName(),
      views: faker.random.numeric(),
      youtube_id: faker.random.alpha(10),
      thumbnail_url: faker.image.imageUrl(),
      slug: faker.lorem.slug(),
      active: faker.random.numeric() % 3 !== 0,
      created_date: faker.date.recent(10),
      popularity: faker.random.numeric(4),
    });
  }
  return videos;
}

function getTodayFormat() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // months are zero-indexed
  const day = currentDate.getDate();
  const formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;
  console.log("formattedDate", formattedDate);
  return formattedDate;
}
