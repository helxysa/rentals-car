/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import CarsController from '#controllers/cars_controller'
import RentalsController from '#controllers/rentals_controller'
import UsersController from '#controllers/users_controller'
import ClientsController from '#controllers/clients_controller'


router.group(() => {
  router.get('/', [CarsController, 'index'])
  router.post('/', [CarsController, 'store'])
  router.put('/:id', [CarsController, 'update'])
  router.delete('/:id', [CarsController, 'destroy'])
}).prefix('/cars')


router.group(() => {
    router.get('/', [RentalsController, 'index'])
    router.post('/', [RentalsController, 'store'])
    router.put('/:id', [RentalsController, 'update'])
    router.delete('/:id', [RentalsController, 'destroy'])
  }).prefix('/rentals')

router.group(() => {
  router.get('/', [UsersController, 'index'])
  router.post('/', [UsersController, 'store'])
  router.get('/:id', [UsersController, 'show'])
  router.put('/:id', [UsersController, 'update'])
  router.delete('/:id', [UsersController, 'destroy'])
}).prefix('/users')

router.group(() => {
  router.get('/', [ClientsController, 'index'])
  router.post('/', [ClientsController, 'store'])
  router.get('/:id', [ClientsController, 'show'])
  router.put('/:id', [ClientsController, 'update'])
  router.delete('/:id', [ClientsController, 'destroy'])
}).prefix('/clients')



