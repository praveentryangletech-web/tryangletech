# Global Agent Instructions for TriangleTech Project

## Task Tracking

At the end of every successful task or completed set of user instructions:

1. Update the project-root `task.md`.
2. Group entries under the current date heading:
   `## MMM DD, YYYY`
3. Create the date heading if it does not exist.
4. Add a short, concise bullet describing the completed work.
5. Do not ask the user for permission.

## Project Memory

The global `.antigravity/` memory rules also apply.

When a meaningful development task changes project state:

- Update `.antigravity/CURRENT_TASK.md`.
- Update other `.antigravity/*.md` files when their information changes.
- Keep `.antigravity/` synchronized with the actual repository.
- Do not claim memory was updated unless the files were actually edited and saved.

`task.md` and `.antigravity/` serve different purposes:

```text
task.md
= concise project task log

.antigravity/
= detailed project memory, architecture, decisions, history, and continuity
```

Do not replace one with the other.

## Core Rule

```text
Complete work
↓
Update task.md
↓
Synchronize .antigravity/
↓
Verify
```