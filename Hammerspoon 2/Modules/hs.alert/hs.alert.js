//
//  hs.alert.js
//  Hammerspoon 2
//
//  Created by Chris Jones on 13/11/2025.
//

hs.alert.show = function(message) {
    var alert = hs.alert.newAlert()
    alert.message = message
    alert.font = HSFont.title()
    hs.alert.showAlert(alert)
}
