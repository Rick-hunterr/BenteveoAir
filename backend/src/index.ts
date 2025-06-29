import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./db";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log("Database connected");
    app.listen(3000);
    console.log("Server", 3000);
  } catch (error) {
    console.log("Database not connected");
  }
}

main();
