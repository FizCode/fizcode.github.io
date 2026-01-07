---
title: "MediQ App"
description: "Hospital queue management system to reduce patient wait times."
pubDate: 2023-05-10
tags: ["Kotlin", "Jetpack Compose", "Dagger/Hilt", "Room", "Retrofit", "Coroutines", "Material 3", "MVVM"]
priority: 2
heroImage: "/placeholder-hero.jpg"
---

## Overview

**MediQ** was developed to streamline the chaotic process of hospital queuing. It allows patients to book queue numbers from home and track the current serving number in real-time, significantly expanding the "waiting room" to anywhere the patient is.

## Key Features

*   **Remote Queuing**: Get a queue number without physically being at the hospital.
*   **Real-time Updates**: Live notification of the current queue status.
*   **Doctor Schedule**: View available doctors and their schedules.

## Technical Highlights

Built with the latest **Material 3** design guidelines for a beautiful, modern UI. The app communicates with a backend via **Retrofit** to sync queue status instantly using polling or web sockets (simulated).
