import React, { FormEvent, useState } from 'react';
import './App.css';
import useSWR from 'swr';
import { Player } from './types/Player';
import { toast } from 'react-toastify';

function App() {
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const fetcher = (url: string) => fetch(url).then((r) => r.json());

  const {
    data: dataPlayers,
    error: errorPlayers,
    isLoading: isLoadingPlayers,
  }: { data: { player: Player[] }; error: any; isLoading: boolean } = useSWR(
    'http://localhost:4000/teams',
    fetcher
  );

  if (errorPlayers) return <div>failed to load</div>;
  if (isLoadingPlayers) return <div>loading...</div>;

  const PlayerListItem = (player: Player) => {
    return (
      <li key={player.idPlayer}>
        <div className='flex flex-row gap-2'>
          <img
            className='rounded-full'
            width='100px'
            height='100px'
            src={player.strThumb}
            alt={player.strPlayer}></img>
          <div className='flex flex-col text-left justify-center'>
            <div>Player: {player.strPlayer}</div>
            <div>Team: {player.strTeam}</div>
            <div>Position: {player.strPosition}</div>
          </div>
        </div>
      </li>
    );
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const response = await fetch('http://localhost:4000/teams', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, city }),
    });

    if (!response.ok) {
      const error = await response.json();
      error.message.forEach((message: string) =>
        toast.error(message.charAt(0).toUpperCase() + message.slice(1))
      );
    } else {
      toast.success('A team has been created successfully.');
    }
  };

  return (
    <div className='App h-lvh w-lvh content-center bg-[url(../images/field.jpg)] bg-cover'>
      <div className='flex flex-row h-[80%] w-[50%] justify-between justify-self-center bg-white rounded p-4'>
        <div className='flex h-full overflow-auto'>
          <ul className='flex flex-col gap-2'>
            {dataPlayers.player.map((player) => {
              return PlayerListItem(player);
            })}
          </ul>
        </div>
        <div className='flex flex-1 flex-col self-center items-center'>
          <form
            className='border-2 border-teal-50 rounded p-2 w-[50%]'
            onSubmit={handleSubmit}>
            <h2 className='pb-2'>Team Creation</h2>
            <label className='flex'>Enter team name:</label>
            <input
              className='flex border-2 border-gray-100 rounded'
              // required
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className='flex'>Enter city:</label>
            <input
              className='flex border-2 border-gray-100 rounded'
              // required
              type='text'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              className='flex justify-self-center border-2 border-blue-100 rounded mt-2 pl-1 pr-1'
              type='submit'
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
