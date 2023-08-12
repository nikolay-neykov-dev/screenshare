import * as fs from "fs";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync("src/secrets/key.pem"),
        cert: fs.readFileSync("src/secrets/cert.pem"),
    };

    const app = await NestFactory.create(AppModule, { httpsOptions });
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
