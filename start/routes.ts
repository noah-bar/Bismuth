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
const ProfilesController = () => import('#controllers/profiles_controller')

router
  .group(() => {
    router.get('/login', [SessionController, 'create']).as('session.create')
    router.post('/login', [SessionController, 'store']).as('session.store')
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('/', ({ response }) => response.redirect().toRoute('quotes.index'))
    router.resource('companies', CompaniesController)
    router.resource('contacts', ContactsController)
    router.get('/quotes/:id/offer', [QuotesController, 'offer']).as('quotes.offer')
    router.get('/quotes/:id/invoice', [QuotesController, 'invoice']).as('quotes.invoice')
    router.resource('quotes', QuotesController)
    router.resource('profiles', ProfilesController).only(['edit', 'update'])
    router.delete('/logout', [SessionController, 'destroy']).as('session.destroy')
  })
  .use(middleware.auth())
