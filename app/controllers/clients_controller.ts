import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client' // Certifique-se de que o modelo Client existe

export default class ClientsController {
    public async index({ response }: HttpContext) {
        try {
            const clients = await Client.all()
            return response.ok(clients)
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao buscar clientes',
                error: error.message
            })
        }
    }

    public async store({ request, response }: HttpContext) {
        try {
            const data = request.only(['user_id', 'name', 'cpf', 'phone'])
            const client = await Client.create(data)
            return response.created(client)
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao cadastrar cliente',
                error: error.message
            })
        }
    }

    public async update({ request, response, params }: HttpContext) {
        try {
            const client = await Client.findOrFail(params.id)
            const data = request.only(['user_id', 'name', 'cpf', 'phone'])
            
            client.merge(data)
            await client.save()
            
            return response.ok(client)
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao atualizar cliente',
                error: error.message
            })
        }
    }

    public async show({ response, params }: HttpContext) {
        try {
            const client = await Client.findOrFail(params.id)
            return response.ok(client)
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao buscar cliente',
                error: error.message
            })
        }
    }

    public async destroy({ response, params }: HttpContext) {
        try {
            const client = await Client.findOrFail(params.id)
            await client.delete()
            
            return response.noContent()
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao excluir cliente',
                error: error.message
            })
        }
    }
}