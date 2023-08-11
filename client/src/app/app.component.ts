import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { Socket } from "ngx-socket-io";

const config = {
    iceServers: [
        {
            urls: "stun:stun.stunprotocol.org",
        },
        {
            urls: "turn:numb.viagenie.ca",
            credential: "muazkh",
            username: "webrtc@live.com",
        },
    ],
};

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public sharing = false;
    public mediaStream: any = null;
    public pc = new RTCPeerConnection(config);

    constructor(
        private cdr: ChangeDetectorRef,
        private socket: Socket,
    ) {}

    ngOnInit(): void {
        this.socket.on("offer", (offer: any) => {
            this.pc
                .setRemoteDescription(offer)
                .then(() => {
                    return this.pc.createAnswer();
                })
                .then((answer) => {
                    return this.pc.setLocalDescription(answer);
                })
                .then(() => {
                    this.socket.emit("answer", this.pc.localDescription);
                });
        });

        this.socket.on("answer", (answer: any) => {
            this.pc.setRemoteDescription(answer);
        });

        this.socket.on("candidate", (candidate: any) => {
            setTimeout(() => {
                this.pc.addIceCandidate(candidate);
            }, 1000);
        });

        this.socket.on("end", () => {
            this.mediaStream = null;
            this.cdr.detectChanges();
        });

        this.pc.ontrack = (e) => {
            if (!this.mediaStream) {
                this.mediaStream = e.streams[0];
            }
        };

        this.pc.onnegotiationneeded = () => {
            this.pc
                .createOffer()
                .then((offer) => {
                    return this.pc.setLocalDescription(offer);
                })
                .then(() => {
                    this.socket.emit("offer", this.pc.localDescription);
                });
        };

        this.pc.onicecandidate = (e) => {
            if (e.candidate) {
                this.socket.emit("candidate", e.candidate);
            }
        };

        this.pc.oniceconnectionstatechange = () => {
            if (this.pc.iceConnectionState === "connected") {
                this.sharing = true;
                this.cdr.detectChanges();
            }
        };
    }

    startScreenShare() {
        navigator.mediaDevices
            .getDisplayMedia({ video: { frameRate: { ideal: 60 } }, audio: false })
            .then((mediaStream) => {
                this.mediaStream = mediaStream;
                const [track] = this.mediaStream.getVideoTracks();
                this.pc.addTrack(track, this.mediaStream);
                track.onended = () => this.stopScreenShare();
            });
    }

    stopScreenShare() {
        this.mediaStream = null;
        this.socket.emit("end");
        this.cdr.detectChanges();
    }
}
