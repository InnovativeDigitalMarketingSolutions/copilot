# Lessons Learned: Pushen naar GitHub (Copilot Backend)

## Problemen die we tegenkwamen:
- Git dacht dat alles al up-to-date was, omdat wijzigingen nooit gecommit waren.
- Pre-commit hooks (ruff, mypy, pytest) blokkeerden commits door fouten.
- Git user.name en user.email waren niet correct ingesteld in VS Code terminal.
- Verwarring over branches (ontwikkelen op main in plaats van feature branch).

---

## Hoe correct te committen en pushen (stappenplan):

1️⃣ **Zorg voor de juiste git config:**

```bash
git config --global user.name "Yannick Mac Gillavry"
git config --global user.email "innovativemarketinglisbon@gmail.com"
```

---

2️⃣ **Controleer welke bestanden gewijzigd zijn:**

```bash
git status
```

---

3️⃣ **Voeg wijzigingen toe aan de commit (staging):**

```bash
git add .
```
Of specifieker:

```bash
git add pad/naar/bestand.py
```

---

4️⃣ **Commit de wijzigingen:**

Normaal:

```bash
git commit -m "Je commit message hier"
```

**OF** als je pre-commit checks tijdelijk wilt overslaan (alleen als het echt nodig is):

```bash
git commit -m "WIP: tijdelijke commit" --no-verify
```

---

5️⃣ **Push naar de juiste branch:**

```bash
git push origin <branchnaam>
```

Bijvoorbeeld:

```bash
git push origin yannick-07112025
```

---

## Branch Strategie:

- **main**: stabiele, geteste code. Alleen via pull request mergen.
- **feature branches**: voor nieuwe features of fixes. Naamgeving:

```
<jouwnaam>-<datum>
```

Voorbeeld:

```
yannick-07112025
```

---

## Samenvatting:

- Eerst commiten, dan pushen.
- Pre-commit checks oplossen of tijdelijk omzeilen met `--no-verify`.
- Nooit direct op `main` ontwikkelen zonder branch of PR.

---

## Wat ging er mis deze keer?

- Pre-commit hooks faalden → commit strandde.
- Geen commit = geen push.
- Push meldde 'everything up-to-date' terwijl er lokaal wel wijzigingen waren.
- Author identity ontbrak in VS Code terminal → commit faalde.

---

## Aanbevolen workflow voor de toekomst:

1. Feature branch maken:  
   `git checkout -b jouw-naam-datum`

2. Wijzigingen doen.

3. Committen met goede git config.

4. Pre-commit checks oplossen, of tijdelijk omzeilen.

5. Pushen naar GitHub.

6. PR aanmaken naar `main`.

```
