"use strict"

const User = use("App/Models/User")

class UserController {
  async create ({ request }) {
    const data = request.only([
      "name",
      "email",
      "password",
      "sexual_orientation",
      "date_of_birth",
      "state",
      "city",
      "country"
    ])

    const user = await User.create(data)

    return user
  }
}

module.exports = UserController
