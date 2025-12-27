#!/usr/bin/env bash
#(gh) registration is required
set -e

# ===== [ CONFIG ] =====
BRANCH="main"
REPO_URL="git@github.com:derkaXz/Anby-Md.git"

VERSION=$1
MSG=${2:-"Release $VERSION"}

if [ -z "$VERSION" ]; then
  echo "Usage: bash deploy.sh v1.0.0 \"message\""
  exit 1
fi

echo "AUTO PUSH PROJECT (GITHUB)"
echo "Repo  : $REPO_URL"
echo "Version : $VERSION"
echo "-------------------------"

# Derka xz was here
# ===== [ LOCALS ] =====
if [ ! -d ".git" ]; then
  git init
  git branch -M "$BRANCH"
fi

if git remote | grep -q origin; then
  echo "[•••] Deleting the old remote"
  git remote remove origin
fi

git remote add origin "$REPO_URL"
echo "[+] Remote is set to new repo"

git fetch origin || true

if git tag | grep -q "^$VERSION$"; then
  echo "[•••] Remove local tags $VERSION"
  git tag -d "$VERSION"
fi

if git ls-remote --tags origin | grep -q "refs/tags/$VERSION"; then
  echo "[•••] Removes remote tags $VERSION"
  git push origin ":refs/tags/$VERSION"
fi

if command -v gh >/dev/null 2>&1; then
  if gh release view "$VERSION" >/dev/null 2>&1; then
    echo "[•••] Removed GitHub Release $VERSION"
    gh release delete "$VERSION" -y
  fi
else
  echo "[!] gh is not installed, skip delete release..."
fi

# ===== [ COMMIT ] =====
git add .
git diff --cached --quiet || git commit -m "$MSG"

echo "[•••] Currently push to the main branch"
git push -u origin "$BRANCH" 

git tag -a "$VERSION" -m "$MSG"
git push origin "$VERSION"

if command -v gh >/dev/null 2>&1; then
  gh release create "$VERSION" \
    --title "$MSG" \
    --notes "Release $VERSION"
  echo "[✓] A new GitHub Release is created"
fi

echo "[✓] Deployment is complete"
