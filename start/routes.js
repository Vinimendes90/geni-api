'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.create')
Route.post('/sessions', 'SessionController.create')

//ESTABLISHMENTS ROUTES
Route.resource('establishments', 'EstablishmentController')
  .apiOnly()
  .middleware('auth')

Route.post('establishments/:id/images', 'ImageController.store')
.middleware('auth')

//EVALUATIONS ROUTES
Route.post('evaluations/:id', 'EvaluationController.store')
.middleware('auth')

Route.get('evaluations/establishments/:id', 'EvaluationController.establishmentEvaluations')
.middleware('auth')


Route.get('evaluations/user', 'EvaluationController.userEvaluations')
.middleware('auth')


Route.put('evaluations/:id', 'EvaluationController.update')
.middleware('auth')

Route.delete('evaluations/:id', 'EvaluationController.destroy')
.middleware('auth')
