import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { ApiOperationDecorator } from 'src/common/decorators/api-operation.decorator';
import { Roles } from 'src/common/decorators/role.decorator';
import { User, UserRole } from './entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserReq } from 'src/common/decorators/current-user.decorator';

@ApiTags('Users')
@Controller('users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperationDecorator({
    summary: 'Create a new user',
    description: 'Create a new user',
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperationDecorator({
    summary: 'Get all users',
    description: 'Get all users',
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @ApiOperationDecorator({
    summary: 'Get user by id',
    description: 'Get user by id',
  })
  @ApiBearerAuth()
  @Roles(UserRole.ADMIN)
  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.userService.findById(id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }
}
