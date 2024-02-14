import { join } from 'path';  // viene de node
import { existsSync } from 'fs'; // viene de node

import { BadRequestException, Injectable } from '@nestjs/common';


@Injectable()
export class FilesService {

  getStaticProductImage( imageName: string ) {

      const path = join( __dirname, '../../static/products', imageName );

      if ( !existsSync(path) ) 

      throw new BadRequestException(`No product found with image ${ imageName }`);


      return path;


  }
  
}
