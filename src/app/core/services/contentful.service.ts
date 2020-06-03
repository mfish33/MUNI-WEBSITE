import { Injectable } from '@angular/core';
import * as contentful  from 'contentful'

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {

  private client = contentful.createClient({
    space: '<space_id>',
    accessToken: '<access_token>'
  })

  constructor() { }



}
