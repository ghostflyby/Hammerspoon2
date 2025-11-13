//
//  AlertView.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 10/11/2025.
//

import SwiftUI

struct AlertView: View {
    let message: HSAlertObject

    var body: some View {
        VStack {
            Spacer()
            HStack {
                Spacer()
                Text(message.message)
                    .font(message.swiftUIFont)
                    .multilineTextAlignment(.center)
                    .padding(.all, message.swiftUIPadding)
                    .glassEffect()
                Spacer()
            }
            Spacer()
        }
    }
}

#Preview("Alert") {
    let alertObject = HSAlertObject()
    alertObject.message = "TESTING"
    return AlertView(message: alertObject)
}
