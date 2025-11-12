//
//  Dictionary.swift
//  Hammerspoon 2
//
//  Created by Chris Jones on 11/11/2025.
//

import Foundation

extension Dictionary where Value: Equatable {
    func firstKey(forValue val: Value) -> Key? {
        return first(where: { $1 == val })?.key
    }
}
