import React from 'react';
import {
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import App from './App';
import { SWRConfig } from 'swr';

test('renders without crashing', () => {
  render(<App />);
});

afterEach(() => {
  jest.restoreAllMocks();
});

test('show render team data', async () => {
  jest.spyOn(global, 'fetch').mockImplementation(
    jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve({
            player: [
              {
                'idPlayer': '34145406',
                'idTeam': '133604',
                'strPlayer': 'Mikel Arteta',
                'strTeam': 'Arsenal',
                'strSport': 'Soccer',
                'strThumb':
                  'https://www.thesportsdb.com/images/media/player/thumb/kgojrb1711448509.jpg',
                'strCutout':
                  'https://www.thesportsdb.com/images/media/player/cutout/2ljkmz1586766347.png',
                'strNationality': 'Spain',
                'dateBorn': '1982-03-26',
                'strStatus': 'Active',
                'strGender': 'Male',
                'strPosition': 'Manager',
              },
            ],
          }),
      })
    ) as jest.Mock
  );

  render(
    <SWRConfig value={{ provider: () => new Map() }}>
      <App />
    </SWRConfig>
  );

  await waitForElementToBeRemoved(() => screen.queryByText('loading...'));

  const { getByText } = within(screen.getByText('Player: Mikel Arteta'));
  expect(getByText('Player: Mikel Arteta')).toBeInTheDocument();
});
