'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Evaluation = use('App/Models/Evaluation')
const Establishment = use('App/Models/Establishment')
const Database = use('Database')

/**
 * Resourceful controller for interacting with evaluations
 */
class EvaluationController {
  /**
   * Show a list of all evaluations.
   * GET evaluations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, view }) {
  }

  async establishmentEvaluations ({ request, response, params }) {
    return await Database
      .table('evaluations')
      .where('establishment_id', params.id)
  }

  async userEvaluations ({ request, response, auth }) {
    const { id } = auth.user

    return await Database
      .table('evaluations')
      .where('user_id', id)
  }

  async store ({ request, response, params, auth }) {
    const { id } = auth.user
    const establishmentId = params.id

    const data = request.only([
      'title',
      'description',
      'pros',
      'cons',
      'climate',
      'music',
      'price',
      'only_for_lgbt',
      'security',
      'agressions'
    ])

    const evaluation = await Evaluation.create({...data, user_id: id, establishment_id: establishmentId})

    return evaluation
  }

  /**
   * Display a single evaluation.
   * GET evaluations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params, request, response, view }) {
  }

  /**
   * Update evaluation details.
   * PUT or PATCH evaluations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response, auth }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    if (evaluation.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    const data = request.only([
      'title',
      'description',
      'pros',
      'cons',
      'climate',
      'music',
      'price',
      'only_for_lgbt',
      'security',
      'agressions'
    ])

    evaluation.merge(data)

    await evaluation.save()

    return evaluation
  }

  /**
   * Delete a evaluation with id.
   * DELETE evaluations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response, auth }) {
    const evaluation = await Evaluation.findOrFail(params.id)

    if (evaluation.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await evaluation.delete()
  }
}

module.exports = EvaluationController
