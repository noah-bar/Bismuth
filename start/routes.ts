/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const CompaniesController = () => import('#controllers/companies_controller')
const ContactsController = () => import('#controllers/contacts_controller')
const QuotesController = () => import('#controllers/quotes_controller')
const SessionController = () => import('#controllers/session_controller')

router
  .group(() => {
    router.get('/login', [SessionController, 'create']).as('session.create')
    router.post('/login', [SessionController, 'store']).as('session.store')
  })
  .use(middleware.guest())

router
  .group(() => {
    router.resource('companies', CompaniesController)
    router.resource('contacts', ContactsController)
    router.resource('quotes', QuotesController)
    router.delete('/logout', [SessionController, 'destroy']).as('session.destroy')
  })
  .use(middleware.auth())
