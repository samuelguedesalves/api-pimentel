'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Lead = use('App/Models/Lead');

/**
 * Resourceful controller for interacting with leads
 */
class LeadController {
  /**
   * Show a list of all leads.
   * GET leads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ request, response, params, auth }) {
    try {
      try{
        await auth.check();
      } catch {
        return response.status(401).json({ error: 'auth is missing.' })
      }

      var page = params.page;
      
      if( page === undefined || null ){
        page = 1;
      }
      
      const leads = await Lead.query().orderBy('id', 'desc').paginate(page, 8)
      return response.status( 200 ).json(leads);
    } catch {
      return response.status( 500 ).json({ error: 'error in server' });
    }
  }

  /**
   * Create/save a new lead.
   * POST leads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    try {
      const { name, email, phone, location } = request.all();
      
      const lead = await Lead.create( { name, email, phone, location } );
      
      return response.status( 200 ).send( lead );
    } catch ( error ) {
      return response.status( 400 ).send({ error: 'error in creation lead.' });
    }
  }

  /**
   * Update lead details.
   * PUT or PATCH leads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
  }

  /**
   * Delete a lead with id.
   * DELETE leads/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = LeadController
