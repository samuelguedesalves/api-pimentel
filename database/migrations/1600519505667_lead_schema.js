'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LeadSchema extends Schema {
  up () {
    this.create('leads', (table) => {
      table.increments()

      table.string('name', 255).notNullable()
      table.string('email', 255).notNullable()
      table.string('phone', 255).notNullable()
      table.string('location', 255)

      table.timestamps()
    })
  }

  down () {
    this.drop('leads')
  }
}

module.exports = LeadSchema
