const { defineConfig } = require('@yarnpkg/types')

/**
 * @typedef {import('@yarnpkg/types/lib/constraints').Context} Context
 * @typedef {import('@yarnpkg/types/lib/constraints').Yarn} Yarn
 * @typedef {import('@yarnpkg/types/lib/constraints').Workspace} Workspace
 * @typedef {import('@yarnpkg/types/lib/constraints').Dependency} Dependency
 */

/**
 * Write a pretty error message indicating that a package is missing from the root package.json.
 * @param {Dependency} dep the missing dependency
 * @returns {Promise<string>} the error message
 */
function missingInRoot(dep, chalk) {
  return chalk`Missing {blue devDependencies["${dep.ident}"]} in root package.json; expected {green '${dep.range}'}`
}

/**
 * Define the engines.node field of a workspace's package.json.
 * @param {Workspace} project a project in the workspace
 */
function setNodeEngine(project) {
  project.set('engines.node', '^22')
}

/**
 * Synchronize a project's version with the workspace version.
 * @param {Workspace} project a project in the workspace
 * @param {string} wsVersion the version of the root package.json
 */
function setProjectVersion(project, wsVersion) {
  project.set('version', wsVersion)
}

/**
 * Require that any dependency of a project is also a dependency of the root workspace.
 * @param {Yarn} yarn the yarn context
 * @param {Workspace} project a project in the workspace
 */
async function enforceConsistentProjectDependencies(yarn, project) {
  const rootWs = yarn.workspace({ cwd: '.' })

  for (const pkg of yarn.dependencies({ workspace: project })) {
    if (pkg.type === 'peerDependencies') {
      continue
    }

    const rootPkg = yarn.dependency({ workspace: rootWs, ident: pkg.ident })
    if (!rootPkg) {
      pkg.delete()
    } else {
      pkg.update(rootPkg.range)
    }
  }
}

/**
 * Require that all workspaces depend on the same versions of NX packages as the root workspace.
 * @param {Yarn} yarn the yarn context
 */
async function enforceNxVersions(yarn) {
  const rootWs = yarn.workspace({ cwd: '.' })

  for (const pkg of yarn.dependencies()) {
    if (pkg.workspace.ident === rootWs.ident || pkg.type === 'peerDependencies') {
      continue
    }
    const rootPkg = yarn.dependency({ workspace: rootWs, ident: pkg.ident })
    if (rootPkg === null) {
      pkg.delete()
    } else {
      pkg.update(rootPkg.range)
    }
  }
}

module.exports = defineConfig({
  async constraints({ Yarn }) {
    enforceNxVersions(Yarn)
    for (const ws of Yarn.workspaces()) {
      setNodeEngine(ws)
      setProjectVersion(ws, Yarn.workspace({ cwd: '.' }).pkg.version)
      enforceConsistentProjectDependencies(Yarn, ws)
    }
  },
})
