import * as fs from "fs";
import * as os from "os";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
    const httpsOptions = {
        key: fs.readFileSync(`${os.homedir()}/certs/key.pem`),
        certs: fs.readFileSync(`${os.homedir()}/certs/cert.pem`),
    };

    console.log(httpsOptions);

    const app = await NestFactory.create(AppModule, { httpsOptions });
    app.enableCors();

    await app.listen(3000);
}
bootstrap();
