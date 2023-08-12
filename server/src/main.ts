import * as fs from "fs";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

const httpsOptions = {
    key: fs.readFileSync("src/secrets/key.pem"),
    cert: fs.readFileSync("src/secrets/cert.pem"),
};

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { httpsOptions });
    await app.listen(3000);
}
bootstrap();
