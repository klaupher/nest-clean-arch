import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
  HttpCode,
  Query,
  Put,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { ListUsers } from '../application/usecases/listusers.usecase';
import { GetUser } from '../application/usecases/getuser.usecase';
import { DeleteUser } from '../application/usecases/delete-user.usecase';
import { Signin } from '../application/usecases/signin.usecase';
import { Signup } from '../application/usecases/signup.usecase';
import { UpdatePassword } from '../application/usecases/update-password.usecase';
import { UpdateUser } from '../application/usecases/update-user.usecase';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { ListUsersDto } from './dto/list-users.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('users')
export class UsersController {
  @Inject(Signup.UseCase)
  private signup: Signup.UseCase;

  @Inject(Signin.UseCase)
  private signin: Signin.UseCase;

  @Inject(UpdateUser.UseCase)
  private updateUser: UpdateUser.UseCase;

  @Inject(UpdatePassword.UseCase)
  private updatePassword: UpdatePassword.UseCase;

  @Inject(DeleteUser.UseCase)
  private deleteUser: DeleteUser.UseCase;

  @Inject(GetUser.UseCase)
  private getUser: GetUser.UseCase;

  @Inject(ListUsers.UseCase)
  private listUsers: ListUsers.UseCase;

  @Post()
  async create(@Body() signupDto: SignupDto) {
    return this.signup.execute(signupDto);
  }

  @HttpCode(200)
  @Post('login')
  async login(@Body() signinDto: SigninDto) {
    return this.signin.execute(signinDto);
  }

  @Get()
  async search(@Query() serachParam: ListUsersDto) {
    return this.listUsers.execute(serachParam);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.getUser.execute({ id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUser.execute({ id, ...updateUserDto });
  }

  @Patch(':id')
  async updateUserPassword(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.updatePassword.execute({ id, ...updatePasswordDto });
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deleteUser.execute({ id });
  }
}
