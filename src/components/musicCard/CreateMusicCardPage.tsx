// components/CreateMusicCardPage.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import CreateMusicCardForm from './CreateMusicCardForm';

const CreateMusicCardPage: React.FC = () => {
  return (
    <div>
      <h2>Создать новое музыкальное произведение</h2>
      <CreateMusicCardForm onCreateSuccess={() => alert('MusicCard created successfully!')} />
      <br />
      <Link to="/">Вернуться к списку музыки</Link>
    </div>
  );
};

export default CreateMusicCardPage;
