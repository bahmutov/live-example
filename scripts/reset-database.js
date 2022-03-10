const path = require('path')
const write = require('fs').writeFileSync

const filename = path.join(__dirname, '..', 'data.json')

const resetDatabase = () => {
  // for complex resets can use NPM script command
  // cy.exec('npm run reset:database')

  // for simple cases, can just overwrite the data file
  const data = {
    todos: []
  }
  const str = JSON.stringify(data, null, 2) + '\n'
  write(filename, str)
}

resetDatabase()
