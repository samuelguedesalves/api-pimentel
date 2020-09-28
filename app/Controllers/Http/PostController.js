'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post');

class PostController {

  /*
    POSTS LISTAGE
    
    Method: GET - http://domain.com/posts/1

    A listagem de posts tem o numero máximo de posts por página de 8
  */
  async index ({ params }) {
    var page = params.page;

    if ( page === undefined || page === null ) {
      page = 1;
    }

    const posts = await Post.query().orderBy('id', 'desc').paginate(page, 8);
    
    return posts;
  }

  /*
    CREATE NEW POST
    
    Method: POST - http://domain.com/posts

    A criação de post possui como entrada de parametros:
    title - titulo do post
    body - corpo do texto
    image_url - url da imagem
  */
 /**
   * Create/save a new lead.
   * POST leads
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response, auth }) {
    try {
      try{
        await auth.check();
      } catch {
        return response.status(401).json({ error: 'auth is missing.' })
      }

      // title, body, image, image_url
      const { title, body, image_url } = request.all();

      const post = await Post.create({ title, body, image_url });
      return post;

    } catch ( error ) {
      console.log( error );
      return response.status( 400 ).json({ message: 'Error in post build.' })
    }
  }

  /*
    UPDATE POST

    Method: PUT - http://domain.com/posts

    A rota recebe em seu body:
    id - utilizado para identificar o post
    title - novo titulo do post
    body - novo corpo do post
    image_url - nova url da imagem do post
  */
  async update ({ request, response }) {
    const { id, title, body, image_url } = request.all();

    if(!id){
      return response.status( 400 ).send({ message: 'Invalid id.' });
    }

    const post = await Post.findBy('id', id);

    if( !post ) {
      return response.status( 400 ).send({ message: `This post don't existe.` });
    }

    post.title = title;
    post.body = body;

    if( image_url ){
      post.image_url = image_url;
    }

    await post.save();

    return post;
  }

  /*
    POST DESTROY

    Method: delete - http://domain.com/posts/1

    A rota recebe como parámetro de url o id do post que será deletado
  */
  async destroy ({ params, response }) {
    var id = parseInt(params.id);

    if( id === null || id === undefined ) {
      throw new Error('Invalid id');
    }

    try{
      await Post.query().where('id', id).delete();
  
      return response.status( 200 );
    } catch {
      return response.status(400).json({ error: 'Error in post destroy.' });
    }
  }
}

module.exports = PostController
