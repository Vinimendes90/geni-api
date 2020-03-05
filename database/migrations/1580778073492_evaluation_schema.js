'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class EvaluationSchema extends Schema {
  up () {
    this.create('evaluations', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('establishment_id')
        .unsigned()
        .references('id')
        .inTable('establishments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('title', 255).notNullable()
      table.string('description', 255)
      table.string('pros')
      table.string('cons')
      table.string('climate')
      table.string('music')
      table.string('price')
      table.boolean('only_for_lgbt').defaultTo(false)
      table.string('security')
      table.string('agressions', 255)
      table.timestamps()
    })
  }

  down () {
    this.drop('evaluations')
  }
}

module.exports = EvaluationSchema
