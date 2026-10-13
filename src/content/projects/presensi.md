---
title: Presensi
order: 4
summary: Biometric and location-based attendance system for STMIK Jayakarta students.
platform: Android
year: 2023

# homepage card
tags: [Compose, Hilt, Biometric]
icon: fingerprint
iconTone: secondary

stack: [Kotlin, Jetpack Compose, Dagger/Hilt, Room, Retrofit, Coroutines, MVVM, Biometric Authentication, Location]

features:
  - icon: map-pin
    title: Geofencing
    text: Attendance can only be clocked inside the campus radius.
  - icon: fingerprint
    title: Biometric login
    text: Fingerprint or face unlock verifies the student's identity.
  - icon: receipt
    title: History log
    text: Students can view their complete attendance history.

highlights:
  - title: Precise geofencing
    text: Android's Location Services decide whether the device is on campus.
  - title: BiometricPrompt API
    text: Identity is verified with the system's own biometric prompt.
  - title: Dagger/Hilt
    text: Dependency injection keeps the codebase modular and testable.

next: mediq
---

## Overview

**Presensi** is a secure attendance solution built for STMIK Jayakarta. It ends proxy attendance with two checks: where the student is (geofencing) and who they are (biometrics).
