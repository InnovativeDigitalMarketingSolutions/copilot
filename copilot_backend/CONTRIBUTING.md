# 🤝 Contributing Guidelines – CoPilot Backend

Thank you for contributing to the CoPilot AI Business Suite! Please follow the workflow below to ensure smooth collaboration.

---

## 🧪 Git Workflow

1. Clone and checkout dev:

```bash
git checkout dev
git pull
```

2. Create a new branch:

```bash
git checkout -b feature/your-feature-name
```

3. Commit your changes with conventional commits:
- `feat:` for new features
- `fix:` for bugfixes
- `docs:` for documentation
- `refactor:` for internal changes

4. Push and open a pull request to `dev`:

```bash
git push -u origin feature/your-feature-name
```

---

## ✅ Pull Request Requirements

- Feature is working and tested
- Corresponding unit tests are added
- Swagger docs are visible for new routes
- If applicable, `.env.example` is updated
- CI checks pass (if enabled)

---

## 🧪 Testing

Run tests before pushing:

```bash
pytest
```

Add test files to `/tests/` matching the module name.

---

## 🔄 Branch Naming Conventions

| Type       | Format                  |
|------------|-------------------------|
| Feature    | `feature/your-feature`  |
| Fix        | `fix/your-fix`          |
| Hotfix     | `hotfix/urgent-fix`     |
| Refactor   | `refactor/memory-utils` |

---

## 🧠 Questions?

Open an issue or contact the maintainers.

Thank you for helping make CoPilot awesome!
