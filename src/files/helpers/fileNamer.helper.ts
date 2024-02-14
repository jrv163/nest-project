import { v4 as uuid } from 'uuid';


export const fileNamer = ( req: Express.Request, file: Express.Multer.File, callback: Function  ) => {
    // console.log({ file });

    if ( !file ) return callback( new Error('File is empty'), false ); // el false es para mencionar que no se está enviando el archivo

    const fileExtensions = file.mimetype.split('/')[1];

    const fileName = `${ uuid() }.${ fileExtensions }`


    callback( null, fileName );

}