import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class UsersController {
  async index({ response }: HttpContext) {
    const users = await User.all()
    return response.json(users)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['email', 'password', 'type', 'adminRole', 'status'])
    const user = await User.create(data)
    return response.created(user)
  }

  async show({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return response.json(user)
  }

  async update({ params, request, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    const data = request.only(['email', 'type', 'adminRole', 'status'])
    
    user.merge(data)
    await user.save()
    
    return response.json(user)
  }

  async destroy({ params, response }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
    return response.noContent()
  }
}