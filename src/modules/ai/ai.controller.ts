import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AiService } from './ai.service';
import { GrammarCheckDto } from './dto/grammar-check.dto';
import { GenerateExerciseDto } from './dto/generate-exercise.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { ApiOperationDecorator } from 'src/common/decorators/api-operation.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Roles } from 'src/common/decorators/role.decorator';
import { UserRole } from '../user/entities/user.entity';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @ApiOperationDecorator({
    summary: 'Check grammar',
    description: 'Check grammar of a text',
  })
  @ApiBearerAuth()
  @Roles(UserRole.TEACHER)
  @Post('grammar-check')
  checkGrammar(@Body() grammarCheckDto: GrammarCheckDto) {
    return this.aiService.checkGrammar(grammarCheckDto);
  }

  @ApiOperationDecorator({
    summary: 'Generate exercise',
    description: 'Generate exercise based on a text',
  })
  @ApiBearerAuth()
  @Roles(UserRole.TEACHER)
  @Post('generate-exercise')
  generateExercise(@Body() generateExerciseDto: GenerateExerciseDto) {
    return this.aiService.generateExercise(generateExerciseDto);
  }

  @ApiOperationDecorator({
    summary: 'Generate vocabulary',
    description: 'Generate vocabulary based on a text',
  })
  @ApiBearerAuth()
  @Roles(UserRole.TEACHER)
  @Post('generate-vocabulary')
  generateVocabulary(@Body() data: { text: string }) {
    return this.aiService.generateVocabulary(data.text);
  }

  @ApiOperationDecorator({
    summary: 'Generate summary',
    description: 'Generate summary based on a text',
  })
  @ApiBearerAuth()
  @Roles(UserRole.TEACHER)
  @Post('generate-summary')
  generateSummary(@Body() data: { text: string }) {
    return this.aiService.generateSummary(data.text);
  }
}
