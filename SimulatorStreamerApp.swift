import SwiftUI
@main
struct SimulatorStreamerApp: App {
    var body: some Scene {
        WindowGroup {
            VStack {
                Text("iOS Simulator Streamer").font(.largeTitle)
                Button("Start Simulator Stream") {
                    let task = Process()
                    task.launchPath = "/bin/bash"
                    task.arguments = ["-c", "sh ./scripts/start_sim_stream.sh <SIM_UDID> <SIGNALING_URL>"]
                    task.launch()
                }
            }.padding()
        }
    }
}
