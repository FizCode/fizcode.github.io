---
title: "Presensi App"
description: "Biometric and location-based attendance system for STMIK Jayakarta students."
pubDate: 2023-08-20
tags: ["Kotlin", "Jetpack Compose", "Dagger/Hilt", "Room", "Retrofit", "Coroutines", "MVVM", "Biometric Authentication", "Location Tracking"]
priority: 3
heroImage: "/placeholder-hero.jpg"
---

## Overview

**Presensi App** is a secure attendance solution built for STMIK Jayakarta. It eliminates proxy attendance by enforcing two-factor verification: physical location (Geofencing) and biometric identity.

## Key Features

*   **Geofencing**: Attendance can only be clocked when the device is physically within the campus radius.
*   **Biometric Login**: Uses fingerprint or face unlock to verify the student's identity.
*   **History Log**: Students can view their complete attendance history.

## Technical Highlights

This app leverages Android's **Location Services** for precise geofencing. Security is handled via **BiometricPrompt API**. We used **Dagger/Hilt** for dependency injection to keep the codebase modular and testable.
