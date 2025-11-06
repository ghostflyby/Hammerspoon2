//
//  hs.timer.js
//  Hammerspoon 2
//
//  Created by Chris Jones on 06/11/2025.
//

"use strict";

// Time conversion utilities
hs.timer.minutes = function(n) {
    return n * 60;
};

hs.timer.hours = function(n) {
    return n * 3600;
};

hs.timer.days = function(n) {
    return n * 86400;
};

hs.timer.weeks = function(n) {
    return n * 604800;
};

// Parse time strings
// Supports formats like "HH:MM:SS", "HH:MM", "5m", "2h", "1d", etc.
hs.timer.seconds = function(timeString) {
    if (typeof timeString !== 'string') {
        throw new Error("hs.timer.seconds(): argument must be a string");
    }

    // Try parsing as HH:MM:SS or HH:MM format (time since midnight)
    const timeMatch = timeString.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?$/);
    if (timeMatch) {
        const hours = parseInt(timeMatch[1]);
        const minutes = parseInt(timeMatch[2]);
        const seconds = timeMatch[3] ? parseInt(timeMatch[3]) : 0;

        if (hours >= 24 || minutes >= 60 || seconds >= 60) {
            throw new Error("hs.timer.seconds(): invalid time string (hours must be < 24, minutes/seconds < 60)");
        }

        return hours * 3600 + minutes * 60 + seconds;
    }

    // Try parsing as duration format: "5m", "2h", "1d", "30s", "500ms"
    const durationMatch = timeString.match(/^(\d+(?:\.\d+)?)(ms|s|m|h|d)$/);
    if (durationMatch) {
        const value = parseFloat(durationMatch[1]);
        const unit = durationMatch[2];

        switch (unit) {
            case 'ms':
                return value / 1000;
            case 's':
                return value;
            case 'm':
                return value * 60;
            case 'h':
                return value * 3600;
            case 'd':
                return value * 86400;
        }
    }

    throw new Error("hs.timer.seconds(): unable to parse time string '" + timeString + "'");
};

// Predicate-based timers

hs.timer.doUntil = function(predicateFn, actionFn, checkInterval) {
    if (typeof predicateFn !== 'function') {
        throw new Error("hs.timer.doUntil(): predicate must be a function");
    }
    if (typeof actionFn !== 'function') {
        throw new Error("hs.timer.doUntil(): action must be a function");
    }

    checkInterval = checkInterval || 1;

    const timer = hs.timer.new(checkInterval, function() {
        if (predicateFn()) {
            actionFn();
            timer.stop();
        } else {
            actionFn();
        }
    });

    return timer.start();
};

hs.timer.doWhile = function(predicateFn, actionFn, checkInterval) {
    if (typeof predicateFn !== 'function') {
        throw new Error("hs.timer.doWhile(): predicate must be a function");
    }
    if (typeof actionFn !== 'function') {
        throw new Error("hs.timer.doWhile(): action must be a function");
    }

    checkInterval = checkInterval || 1;

    const timer = hs.timer.new(checkInterval, function() {
        if (!predicateFn()) {
            timer.stop();
        } else {
            actionFn();
        }
    });

    return timer.start();
};

hs.timer.waitUntil = function(predicateFn, actionFn, checkInterval) {
    if (typeof predicateFn !== 'function') {
        throw new Error("hs.timer.waitUntil(): predicate must be a function");
    }
    if (typeof actionFn !== 'function') {
        throw new Error("hs.timer.waitUntil(): action must be a function");
    }

    checkInterval = checkInterval || 1;

    const timer = hs.timer.new(checkInterval, function() {
        if (predicateFn()) {
            actionFn();
            timer.stop();
        }
    });

    return timer.start();
};

hs.timer.waitWhile = function(predicateFn, actionFn, checkInterval) {
    if (typeof predicateFn !== 'function') {
        throw new Error("hs.timer.waitWhile(): predicate must be a function");
    }
    if (typeof actionFn !== 'function') {
        throw new Error("hs.timer.waitWhile(): action must be a function");
    }

    checkInterval = checkInterval || 1;

    const timer = hs.timer.new(checkInterval, function() {
        if (!predicateFn()) {
            actionFn();
            timer.stop();
        }
    });

    return timer.start();
};

// Delayed timer implementation - fires only after a period of inactivity
hs.timer.delayed = function(delay, fn) {
    if (typeof fn !== 'function') {
        throw new Error("hs.timer.delayed(): callback must be a function");
    }

    let timer = null;

    const delayedObj = {
        start: function(delayOverride) {
            const actualDelay = delayOverride !== undefined ? delayOverride : delay;

            if (timer) {
                timer.stop();
            }

            timer = hs.timer.doAfter(actualDelay, fn);
            return delayedObj;
        },

        stop: function() {
            if (timer) {
                timer.stop();
                timer = null;
            }
            return delayedObj;
        },

        running: function() {
            return timer ? timer.running() : false;
        },

        nextTrigger: function() {
            return timer ? timer.nextTrigger() : -1;
        },

        setDelay: function(newDelay) {
            delay = newDelay;
            return delayedObj;
        }
    };

    return delayedObj;
};
