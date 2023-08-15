import { NgModule, isDevMode } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SocketIoModule } from "ngx-socket-io";
import { AppComponent } from "./app.component";

const url = isDevMode() ? "ws://localhost:3000" : "wss://http://77.76.56.17:3000";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, SocketIoModule.forRoot({ url })],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
