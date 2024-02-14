


export const fileFilter = ( req: Express.Request, file: Express.Multer.File, callback: Function  ) => {
    // console.log({ file });

    if ( !file ) return callback( new Error('File is empty'), false ); // el false es para mencionar que no se está enviando el archivo


    const fileExptension = file.mimetype.split('/')[1];  // el mimetype nos indica que tipo de archivo es: png, jpg, pdf
    const validExtensions = ['jpeg', 'jpg', 'png', 'gif'];

    if ( validExtensions.includes( fileExptension ) ) {
        return callback( null, true )
    }

    callback( null, false );


}