import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { CacheModule } from '@nestjs/cache-manager';

describe('TeamsController', () => {
  let controller: TeamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CacheModule.register()],
      controllers: [TeamsController],
      providers: [TeamsService],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
  });

  it('should return name and city of the team', () => {
    const result = { name: 'team name', city: 'arsenal' };

    expect(controller.createTeam(result)).toStrictEqual(result);
  });
});
