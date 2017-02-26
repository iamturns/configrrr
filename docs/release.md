# Release

## Update

```
git checkout master
git pull
git checkout develop
git pull
```

## Change log

Ensure all changes are summarised within `/CHANGELOG.md` under `Unreleased`.

The following diff command will help to highlight all changes;

    git diff master develop

## Semantic version

Decide on a new [semantic version](http://semver.org/) based on the changes.

## Branch

```
git flow release start v0.0.0
```

## Code updates

- `/CHANGELOG.md`:
	- Change the 'Unreleased' heading to the new version number and release date
- `/README.md`:
	- Update version number on first line (and remove any `-dev` suffix)
- `/package.json`:
	- Update version number (and remove any `-dev` suffix)

```
git add -A
git commit -m ":arrow_double_up: Prepare v0.0.0"
```

## Test

```
yarn run verify
```

## Finish & publish

```
git flow release finish v0.0.0
# Git commit message = :boom: v0.0.0
git push --tags
git checkout master
git push
git checkout develop
git push
```

## Reset develop branch

### Version

Append '-dev' to the version number (eg: '0.0.0-dev') in the following files:

- `/package.json`
- `/README.md`
	- On the first line

### Finish

```
git checkout develop
git add -A
git commit -m ":wrench: Prepare develop branch after release"
git push
```
