'use strict'

const Establishment = use('App/Models/Establishment')

/**
 * Resourceful controller for interacting with establishments
 */
class EstablishmentController {
  /**
   * Show a list of all establishments.
   * GET establishments
   */
  async index ({ request, response }) {
    const establishments = Establishment.query()
    .with('images')
    .with('evaluations')
    .fetch()

    return establishments
  }

  /**
   * Create/save a new establishment.
   * POST establishments
   */
  async store ({ request, response, auth }) {
    const { id } = auth.user
    const data = request.only([
      'title',
      'state',
      'city',
      'country',
      'description',
      'classification',
      'facebook',
      'twitter',
      'instagram',
      'telephone',
      'website',
      'category',
    ])

    const establishment = await Establishment.create({...data, user_id: id})

    return establishment
  }

  /**
   * Display a single establishment.
   * GET establishments/:id
   */
  async show ({ params }) {
    const establishment = await Establishment.findOrFail(params.id)

    await establishment.load('images')
    await establishment.load('evaluations')

    return establishment
  }

  /**
   * Update establishment details.
   * PUT or PATCH establishments/:id
   */
  async update ({ params, request, response, auth }) {
    const establishment = await Establishment.findOrFail(params.id)

    if (establishment.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    const data = request.only([
      'title',
      'state',
      'city',
      'country',
      'description',
      'classification',
      'facebook',
      'twitter',
      'instagram',
      'telephone',
      'website',
      'category',
    ])

    establishment.merge(data)

    await establishment.save()

    return establishment
  }

  /**
   * Delete a establishment with id.
   * DELETE establishments/:id
   */
  async destroy ({ params, auth, response }) {
    const establishments = await Establishments.findOrFail(params.id)

    if (establishments.user_id !== auth.user.id) {
      return response.status(401).send({ error: 'Not authorized' })
    }

    await establishments.delete()
  }
}

module.exports = EstablishmentController
