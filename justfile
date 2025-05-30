dev:
  pnpm run dev

build:
  pnpm run build

release-major:
  npm version major
  git push --follow-tags

release-minor:
  npm version minor
  git push --follow-tags

release-patch:
  npm version patch
  git push --follow-tags