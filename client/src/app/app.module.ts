import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { SocketIoModule } from "ngx-socket-io";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, SocketIoModule.forRoot({ url: window.location.href })],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
