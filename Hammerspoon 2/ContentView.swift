//
//  ContentView.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 23/09/2025.
//

import SwiftUI

// MARK: - Test Harness

func runJSCTest() {
    let engine = JSEngine.shared
    try? engine.createContext()

    // Inject TimerManager
//    let timerManager = HammerTimerManager()
//    engine["timerManager"] = timerManager

    // JS Script
    let script = """
    console.log("I AM JAVASCRIPT, WATCH ME RUN");
    console.log("Manager: " + timer);
    console.log("Name: " + timer.name);
    var timer = timer.every(2, function(timer) {
        console.log("I AM IN THE TIMER: " + timer);
    });
    console.log("Timer scheduled: " + timer.description);
    """

    // Execute the JS code
    engine.eval(script)

    print("*** DONE WITH JSCTEST ***")
}

struct ContentView: View {
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundStyle(.tint)
            Text("Hello, world!")
            Button("Run JSC Test") {
                runJSCTest()
            }
            Button("Reset JSC") {
                try? JSEngine.shared.resetContext()
            }
        }
        .padding()
    }
}

#Preview {
    ContentView()
}
