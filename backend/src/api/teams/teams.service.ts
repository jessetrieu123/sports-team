import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Player } from 'src/models/Player';
import { Team } from 'src/models/Team';

@Injectable()
export class TeamsService {
  async getTeams(): Promise<Player[]> {
    try {
      const response = await axios.get(
        'https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?t=Arsenal'
      );
      return response.data as Player[];
    } catch (error) {
      console.error(error);
      throw Error('Error fetching team.');
    }
  }

  createTeam(name: string, city: string): Team {
    return { name, city };
  }
}
