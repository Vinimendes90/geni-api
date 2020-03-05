'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Evaluation extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  establishments () {
    return this.belongsTo('App/Models/Establishment')
  }
}

module.exports = Evaluation
