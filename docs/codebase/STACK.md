# Technology Stack

## Core Sections (Required)

### 1) Runtime Summary

| Area                | Value                                                                   | Evidence                                                          |
| ------------------- | ----------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Primary language    | TypeScript, with Angular templates and CSS                              | `src/**/*.ts`, `src/**/*.html`, `src/styles.css`                  |
| Runtime + version   | Browser application built and deployed with Node.js 22                  | `.github/workflows/deploy.yml`, `.github/copilot-instructions.md` |
| Package manager     | npm; package manager metadata specifies npm 11.16.0                     | `package.json`                                                    |
| Module/build system | Angular CLI with `@angular/build:application`; ES2022 TypeScript output | `angular.json`, `tsconfig.json`                                   |

### 2) Production Frameworks and Dependencies

| Dependency                  | Version   | Role in system                                                     | Evidence                                                |
| --------------------------- | --------- | ------------------------------------------------------------------ | ------------------------------------------------------- |
| `@angular/core`             | `^22.1.0` | Standalone components, dependency injection, signals               | `package.json`, `src/app/app.ts`                        |
| `@angular/common`           | `^22.1.0` | Browser and common Angular functionality                           | `package.json`                                          |
| `@angular/platform-browser` | `^22.1.0` | Browser bootstrap support                                          | `package.json`, `src/main.ts`                           |
| `@angular/compiler`         | `^22.1.0` | Angular template compilation                                       | `package.json`                                          |
| `@angular/forms`            | `^22.1.0` | Installed production dependency; current source does not use forms | `package.json`, `src/**/*.ts`                           |
| `@angular/router`           | `^22.1.0` | Installed production dependency; `Routes` is currently empty       | `package.json`, `src/app/app.routes.ts`                 |
| `rxjs`                      | `~7.8.0`  | `HttpClient` observable data loading                               | `package.json`, `src/app/services/team-data.service.ts` |
| `tslib`                     | `^2.3.0`  | TypeScript runtime helpers                                         | `package.json`                                          |

### 3) Development Toolchain

| Tool                    | Purpose                                        | Evidence                              |
| ----------------------- | ---------------------------------------------- | ------------------------------------- |
| `@angular/cli`          | Local serve, build, and test commands          | `package.json`                        |
| `@angular/build`        | Application and unit-test builders             | `package.json`, `angular.json`        |
| `@angular/compiler-cli` | Angular TypeScript compilation                 | `package.json`, `tsconfig.app.json`   |
| TypeScript              | Type checking and compilation; `~6.0.2`        | `package.json`, `tsconfig.json`       |
| Vitest                  | Test runner; `^4.0.8`                          | `package.json`, `src/app/app.spec.ts` |
| jsdom                   | Browser-like test environment                  | `package.json`, Angular test tooling  |
| Prettier                | Formatting; Angular template parser configured | `package.json`, `.prettierrc`         |

### 4) Key Commands

```bash
npm ci
npm start
npm run build
npx ng build --base-href /CEULandingPage/
npm test -- --watch=false
npx ng test --watch=false --include src/app/app.spec.ts
```

There is no npm lint script. Formatting configuration exists, but a repository
lint command is `[TODO]`.

### 5) Environment and Config

- Config sources: `package.json`, `angular.json`, `tsconfig.json`,
  `tsconfig.app.json`, `tsconfig.spec.json`, `.prettierrc`, `.editorconfig`,
  `.github/workflows/deploy.yml`.
- Required environment variables: none are read by the application and no
  `.env.example` or `.env.template` was found by the repository scan.
- Deployment/runtime constraints: the GitHub Pages build uses Node 22, the
  `/CEULandingPage/` base href, and publishes
  `dist/ceu-landing-page/browser`; the workflow uses `npm run build -- --base-href "/CEULandingPage/"`
  while local verification can use `npx ng build --base-href /CEULandingPage/`.
- `[TODO]` Confirm whether a future custom domain will replace the repository
  base path.

### 6) Evidence

- `package.json`
- `angular.json`
- `tsconfig.json`
- `.github/workflows/deploy.yml`
- `.prettierrc`
