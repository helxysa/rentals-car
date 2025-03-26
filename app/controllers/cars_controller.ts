import type { HttpContext } from '@adonisjs/core/http'
import Car from '#models/car'

export default class CarsController {
    public async index({response}: HttpContext){
        try {
            const cars = await Car.all()
            
            return response.json(cars)
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao buscar veículos',
                error: error.message
            })
        }
    }

    public async store({request, response}: HttpContext){
        try {
            const data = request.only(['model', 'plate', 'brand', 'isAvailable', 'dailyRate'])
            const car = await Car.create(data)
            return response.json(car)
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao cadastrar veículo',
                error: error.message
            })
        }
    }

    public async update({ request, response, params }: HttpContext) {
        try {
            const car = await Car.findOrFail(params.id)
            const data = request.only(['model', 'plate', 'brand', 'isAvailable', 'dailyRate'])
            
            car.merge(data)
            await car.save()
            
            return response.ok(car)
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao atualizar veículo',
                error: error.message
            })
        }
    }

    public async destroy({ response, params }: HttpContext) {
        try {
            const car = await Car.findOrFail(params.id)
            await car.delete()
            
            return response.noContent()
        } catch (error) {
            return response.internalServerError({
                message: 'Falha ao excluir veículo',
                error: error.message
            })
        }
    }
}