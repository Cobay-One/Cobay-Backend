# Cobay Backend

A modular Node.js (ESM) backend library organised into small, side-effect-free
units:

- `src/domain/` — immutable domain entities.
- `src/services/` — pure business-logic helpers over collections of entities.
- `src/repositories/` — in-memory repositories keyed by id.
- `src/schemas/` — request/response data-transfer helpers.
- `src/utils/` — reusable utilities (money, text, dates, hashing, etc.).
- `test/` — unit tests using the built-in `node:test` runner.

## Development

```bash
npm install   # install dev dependencies (ESLint)
npm run lint  # static analysis
npm test      # run the unit test suite
```

## Security scanning

CodeQL runs automatically on every push and pull request to `main`
(see `.github/workflows/codeql.yml`).
