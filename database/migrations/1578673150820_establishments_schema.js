'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EstablishmentsSchema extends Schema {
  up () {
    this.create('establishments', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('name', 80).notNullable().unique()
      table.string('state')
      table.string('city')
      table.string('country')
      table.string('description', 255)
      table.float('classification')
      table.string('facebook')
      table.string('twitter')
      table.string('instagram')
      table.integer('telephone')
      table.string('website', 255)
      table.string('category', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('establishments')
  }
}

module.exports = EstablishmentsSchema
