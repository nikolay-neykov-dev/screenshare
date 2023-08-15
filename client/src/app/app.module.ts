import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SocketIoModule } from "ngx-socket-io";
import { AppComponent } from "./app.component";

const url = isDevMode() ? "ws://localhost" : "wss://77.76.56.17";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, SocketIoModule.forRoot({ url })],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
