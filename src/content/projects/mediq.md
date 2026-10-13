---
title: MediQ
order: 5
summary: Hospital queue management system that reduces patient wait times.
platform: Android
role: Design & development
year: 2023

# homepage card
tags: [Compose, Hilt, Material 3]
icon: medical
iconTone: tertiary

stack: [Kotlin, Jetpack Compose, Dagger/Hilt, Room, Retrofit, Coroutines, Material 3, MVVM]

features:
  - icon: user
    title: Remote queuing
    text: Get a queue number without being at the hospital.
  - icon: gauge
    title: Real-time updates
    text: Live notification of the current queue status.
  - icon: medical
    title: Doctor schedule
    text: See which doctors are available and when.

highlights:
  - title: Material 3
    text: Built on the latest Material 3 guidelines for a modern interface.
  - title: Live queue status
    text: Retrofit keeps the queue in sync with the backend, using polling or web sockets (simulated).

next: secondhand
---

## Overview

**MediQ** streamlines the chaotic process of hospital queuing. Patients book a queue number from home and follow the number being served in real time, so the waiting room can be anywhere.
