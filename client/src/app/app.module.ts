import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SocketIoModule } from "ngx-socket-io";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, SocketIoModule.forRoot({ url: "https://77.76.56.17" })],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
