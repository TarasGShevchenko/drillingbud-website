#!/usr/bin/env bash
# PostToolUse hook for Edit|Write: format the one file Claude just changed
# with the project's own Prettier. Hook input arrives as JSON on stdin;
# the changed file is tool_input.file_path (always absolute).
set -uo pipefail

if ! command -v node >/dev/null 2>&1; then
  echo "prettier hook: node not found on PATH" >&2
  exit 1
fi

project_dir="$(realpath "${CLAUDE_PROJECT_DIR:?}")"
prettier="$project_dir/node_modules/.bin/prettier"

# Read stdin and print tool_input.file_path only if it's a non-empty string.
# Bad JSON, a missing field, a non-string or a path containing a newline
# all print nothing, and the script skips below.
file_path="$(node -e '
try {
  const input = JSON.parse(require("fs").readFileSync(0, "utf8"))
  const p = input?.tool_input?.file_path
  if (typeof p === "string" && p !== "" && !p.includes("\n")) process.stdout.write(p)
} catch {}
')" || exit 0
[[ -n "$file_path" && -f "$file_path" ]] || exit 0   # missing/deleted → skip

# Resolve symlinks and ".." so the checks below can't be sidestepped
file_path="$(realpath "$file_path")" || exit 0

case "$file_path" in
  "$project_dir"/node_modules/* | "$project_dir"/.next/*) exit 0 ;;  # deps, build output
  "$project_dir"/*) ;;                                               # inside this project
  *) exit 0 ;;                                                       # anywhere else → skip
esac

case "$file_path" in
  *.ts | *.tsx | *.js | *.jsx | *.mjs | *.cjs | *.json | *.css) ;;
  *) exit 0 ;;                                                       # unsupported type
esac

if [[ ! -x "$prettier" ]]; then
  echo "prettier hook: $prettier not found (run npm install)" >&2
  exit 1
fi

# Prettier exits 2 on errors (e.g. a syntax error). Claude Code treats exit 2
# as "send stderr to Claude", so map every failure to 1: a notice for the user.
"$prettier" --write --log-level warn "$file_path" || exit 1
