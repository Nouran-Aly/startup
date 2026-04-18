# khidma MVP (React Native + Firebase)

Cross-platform MVP for connecting homeowners with verified service professionals.

## Suggested Folder Structure

```txt
khidma-app/
  docs/
    database-schema.md
  src/
    components/
      common/
      homeowner/
      professional/
    screens/
      homeowner/
        HomeDashboardScreen.tsx
      professional/
        ProfessionalOnboardingScreen.tsx
    navigation/
      AppNavigator.tsx
    services/
      firebase/
        firebaseConfig.ts
        authService.ts
        chatService.ts
        bookingService.ts
    hooks/
    theme/
      colors.ts
    types/
      models.ts
    utils/
  App.tsx
  package.json
  tsconfig.json
```

## Design Language

- Primary: Deep Blue (`#0A3D62`)
- Secondary: White (`#FFFFFF`)
- Accent: Trust/verified green (`#2E8B57`)
- Goal: Large tap targets, clear labels, short flows for non-tech-savvy users.

## Quick Start

1. `npm install`
2. `npm run start`
3. Open with Expo Go on Android/iOS.
