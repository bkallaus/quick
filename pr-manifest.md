PR Title: feat: ROT13 Encoder

The Problem Solved: Adds a bidirectional ROT13 encoder/decoder tool, allowing users to easily obscure or read obfuscated text.

Visuals: None

Implementation Journey:
- Created bidirectional ROT13 encoder component
- Registered the tool in Text & Encoding category
- Added comprehensive tests for rendering and conversion

Tradeoffs & Assumptions: Assumed standard alphabetical ROT13 algorithm while leaving all numbers and symbols intact. Chose a bidirectional 2-textarea approach over a single toggle input based on similarity to other Text encoding tools.

Testing Instructions: Run `npm start`, navigate to Text & Encoding -> ROT13 Encoder, and test encoding plain text and decoding ROT13 text.

Action Item: `git push origin HEAD:feature/rot13-encoder && gh pr create --title "feat: ROT13 Encoder" --body "Adds ROT13 Encoder component. See pr-manifest.md for details."`
