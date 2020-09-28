'use strict'

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User');

class UserSeeder {
  async run () {
    const user = await User.create({
      username: 'agpremium',
      email: 'contato@agenciapremium.com.br',
      password: 'agpremium1706',
    });
    console.log(user);
  }
}

module.exports = UserSeeder
