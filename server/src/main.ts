import * as fs from "fs";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync("/home/master/certificates/key.pem"),
        cert: fs.readFileSync("/home/master/certificates/cert.pem"),
    };

    const app = await NestFactory.create(AppModule, { httpsOptions });
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
