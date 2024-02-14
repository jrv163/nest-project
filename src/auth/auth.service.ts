import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'; // instalamos bcrypt para hasear la contraseña o encriptarla

import { User } from './entities/user.entity';
import { CreateUserDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';



@Injectable()
export class AuthService {

  constructor( // se usa el constructor para inyectar la entidad
  
  @InjectRepository(User)
  private readonly userRepository: Repository<User>,

  private readonly jwtService: JwtService,

  ) {}

  async create(createUserDto: CreateUserDto) {


    try {

      const { password, ...userData } = createUserDto;
      
      const user =  this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      }); // el create nos pide la propiedad que luzca como queremos que se cree el usuario en nuestro DTO

      await this.userRepository.save( user );
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      }; 

    } catch (error) {
        this.handleDBErrors( error )
    }


  }


  async login( loginUserDto: LoginUserDto ) {

    
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where : { email },
      select: { email: true, password: true, id: true }
    });

    if ( !user )
      throw new UnauthorizedException('Credential are not valid (email)');

    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credential are not valid (password)');

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }; 
 
  }


  async checkAuthStatus( user: User ) {

    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    }; 

  }


  private getJwtToken( payload: JwtPayload ) {


    const token = this.jwtService.sign( payload );
    return token;


  }


  private handleDBErrors( error: any ): never {

    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail ); // verificar el error en la consola cuando se crea un error en la consola

      console.log(error)

      throw new InternalServerErrorException('Please checks server logs');

  }


}
