'use strict'

const Model = use('Model')

const Database = use('Database')

class Establishment extends Model {
  user () {
    return this.belongsTo('App/Models/User')
  }

  images () {
    return this.hasMany('App/Models/Image')
  }

  evaluations () {
    return this.hasMany('App/Models/Evaluation')
  }
}

module.exports = Establishment
