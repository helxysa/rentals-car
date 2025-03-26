import type { HttpContext } from '@adonisjs/core/http'
import Rental from '#models/rental' // Certifique-se de que o modelo Rental existe

export default class RentalsController {
    public async index({ response }: HttpContext) {
        try {
            const rentals = await Rental.all()
            return response.ok(rentals)
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao buscar locações',
                error: error.message
            })
        }
    }

    public async store({ request, response }: HttpContext) {
        try {
            const data = request.only(['client_id', 'car_id', 'rental_start', 'rental_end', 'status', 'total_value', 'commitment_term_signed'])
            const rental = await Rental.create(data)
            return response.created(rental)
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao cadastrar locação',
                error: error.message
            })
        }
    }

    public async update({ request, response, params }: HttpContext) {
        try {
            const rental = await Rental.findOrFail(params.id)
            const data = request.only(['client_id', 'car_id', 'rental_start', 'rental_end', 'status', 'total_value', 'commitment_term_signed'])
            
            rental.merge(data)
            await rental.save()
            
            return response.ok(rental)
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao atualizar locação',
                error: error.message
            })
        }
    }

    public async destroy({ response, params }: HttpContext) {
        try {
            const rental = await Rental.findOrFail(params.id)
            await rental.delete()
            
            return response.noContent()
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao excluir locação',
                error: error.message
            })
        }
    }
}