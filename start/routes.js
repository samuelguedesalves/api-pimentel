'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

// ------------------------------------------------------------------------

// LISTAGEM DE POST
Route.get('/posts', 'PostController.index');
Route.get('/posts/:page', 'PostController.index');

// BUSCA DE UM UNICO POST
Route.get('/post/:post_id', 'PostController.findByPostId');

// CRIAÇÃO DE POSTS
Route.post('/posts', 'PostController.store');

// ATUALIZAÇÃO DE POST
Route.put('/posts', 'PostController.update').middleware('auth');

// DESTRUIR POST
Route.delete('/posts', 'PostController.destroy').middleware('auth');
Route.delete('/posts/:id', 'PostController.destroy').middleware('auth');

// ------------------------------------------------------------------------

// CRIAÇÃO DE UM USUÁRIO
Route.post('/user', 'UserController.store').middleware('auth');

// LOGIN DE UM USUÁRIO
Route.post('/login', 'UserController.login');

// ROTA DE LISTAGEM DE USUÁRIOS
Route.get('/user', 'UserController.index').middleware('auth');
Route.get('/user/:page', 'UserController.index').middleware('auth');

// ------------------------------------------------------------------------

//LISTAGEM DE LEADS
Route.get('/lead', 'LeadController.index');
Route.get('/lead/:page', 'LeadController.index')

// CRIAÇÃO DE LEAD
Route.post('/lead', 'LeadController.store');
