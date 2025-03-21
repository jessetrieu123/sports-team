import {
  Controller,
  Get,
  Post,
  Body,
  NotFoundException,
  HttpStatus,
  UseInterceptors,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Player } from 'src/models/Player';
import { CreateTeamsDto } from './dto/create-team-dto';
import { CacheInterceptor } from '@nestjs/cache-manager';

@Controller('teams')
@UseInterceptors(CacheInterceptor)
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) {}

  @Get()
  async getTeams(): Promise<Player[]> {
    try {
      return this.teamsService.getTeams();
    } catch (error) {
      console.error(error);
      throw new NotFoundException({
        status: HttpStatus.NOT_FOUND,
        code: 'NOT_FOUND',
        message: 'Error fetching team.',
      });
    }
  }

  @Post()
  createTeam(@Body() { name, city }: CreateTeamsDto): CreateTeamsDto {
    return this.teamsService.createTeam(name, city);
  }
}
