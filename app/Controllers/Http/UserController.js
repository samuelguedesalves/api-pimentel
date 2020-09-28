'use strict'

const User = use('App/Models/User');

class UserController {
  /**
   * LISTAGEM DE TODOS OS USUÁRIOS
  */
  async index ({ params, response }) {
    var page = params.page;

    if( page === null || page === undefined ) {
      page = 1;
    }

    const usersList = await User.query().orderBy('id', 'desc').paginate(page, 8);
    return response.status(200).json( usersList );
  }

  /**
   * CRIAÇÃO DE NOVOS USUÁRIOS
   */
  async store ({ request, response, auth }) {
    const { username, email, password  } = request.all();

    const verificUsername = await User.findBy('username', username);
    const verificEmail = await User.findBy('email', email);

    if( verificUsername !== null || verificEmail !== null ){
      return response.status( 400 ).json({ error: 'This user is already exists' })
    }

    const user = await User.create({ username, email, password });

    try {
      const token = await auth.attempt(email, password);

      return response.status( 200 ).json({ token, user });
    } catch {
      return response.status( 500 ).json({ error: 'Error in auth.' });
    }

  }

  /**
   * LOGIN DO USUÁRIO
   */
  async login ({ request, response, auth }) {
    const { email, password } = request.all();
    
    if ( email === null || email === undefined || email === '' || 
      password === null || password === undefined || password === '' 
    ){
      return response.status(400).json({ error: 'Email or password id invalid.' });
    }
    
    try{
      const token = await auth.attempt(email, password);

      return response.status(200).json(token);
    } catch {
      return response.status( 500 ).json({ error: 'Error in auth' });
    }

  }
  
}

module.exports = UserController
