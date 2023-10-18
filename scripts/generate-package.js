#!/usr/bin/env node

const { existsSync } = require('fs')
const { join, resolve } = require('path')

const fs = require('fs').promises

main()
  .then(() => process.exit(0))
  .catch(err => {
    process.stderr.write(err)
    process.exit(1)
  })

async function main() {
  const pkgJson = join(__dirname, '..', './package.json')
  const pkg = require.resolve(pkgJson) && require(pkgJson)

  const minimalPkg = trimPackageJSON(pkg)

  await fs.writeFile(
    './dist/package.json',
    JSON.stringify(minimalPkg, null, 2),
    'utf8'
  )
  await safeCopy('./README.md', './dist/README.md')
  await safeCopy('./LICENSE', './dist/LICENSE')
  await safeCopy('./docs', './dist/docs')
}

async function safeCopy(src, dest, force = false) {
  if (!existsSync(resolve(src))) {
    return
  }
  if (existsSync(resolve(dest)) && !force) {
    console.warn(`Attempted to overwrite ${dest}`)
    return
  }
  await fs.copyFile(src, dest, fs.constants.COPYFILE_FICLONE)
}

function trimPackageJSON(pkg) {
  return Object.assign({}, pkg, {
    'devDependencies': undefined,
    'lint-staged': undefined,
    'scripts': undefined,
    'prettier': undefined,
  })
}
