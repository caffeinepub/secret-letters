# Secret Letters

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Landing page with app intro and two actions: Write a Letter, Open a Letter
- Letter composer with multiple aesthetic templates (parchment, floral, minimalist, night sky, vintage typewriter)
- Secret code setup: user sets a custom code (or one is generated) before saving the letter
- Letter storage in backend: letter content, chosen template, hashed secret code, unique letter ID
- Letter viewer: enter letter ID + secret code to unlock and read the letter in its original template
- Aesthetic template rendering with unique fonts and styling per template

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Backend: store letters with ID, template name, encrypted/hashed content, secret code hash
2. Backend APIs: createLetter(content, template, secretCode) -> letterId, getLetter(letterId, secretCode) -> letter or error
3. Frontend: landing page, composer page, unlock page, letter display page
4. Five aesthetic templates rendered purely in CSS/frontend
5. Secret code is hashed before storing; verified on read
