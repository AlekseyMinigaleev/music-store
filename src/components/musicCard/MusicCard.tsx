import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import CompactDiskForm from '../CompactDisc/CompactDiscForm';

interface MusicCardProps {
  music: {
    id: string;
    musicName: string;
    genre: string;
    author: string;
    performanceCount: number;
  };
}

const MusicCard: React.FC<MusicCardProps> = ({ music }) => {
  const navigate = useNavigate();

  const handleCreateCompactDisk = () => {
    // Переходим на страницу создания компакт-диска с передачей идентификатора музыкальной карточки
    navigate(`/createCompactDisk/${music.id}`);
  };

  const handleEdit = () => {
    navigate(`/editMusicCard/${music.id}`);
  };

  const handleDelete = async () => {
    try {
      const idsToDelete = [music.id];
      // Отправляем запрос на сервер для удаления данных
      await axios.delete('https://localhost:7204/api/MusicCard/delete', {
        data: { ids: idsToDelete },
      });
      // После успешного удаления данных, выполните необходимые действия, например, перенаправление на другую страницу
      // Например, перенаправляем пользователя на страницу с музыкой после удаления
      navigate('/music');
    } catch (error) {
      console.error('Error deleting music card', error);
    }
  };

  return (
    <div className="music-card">
      <h3>{music.musicName}</h3>
      <p>Автор: {music.author}</p>
      <p>Жанр: {music.genre}</p>
      <p>
        Варианты исполнения: {music.performanceCount}
        <Link to={`/performance/${music.id}`}>
          <button>Посмотреть</button>
        </Link>
      </p>
      {/* Всегда отображаем кнопку "Редактировать" */}
      <button onClick={() => handleEdit()}>Редактировать</button>
      <Link to={`/compactDisk/${music.id}`}>Посмотреть диск</Link>
      <button onClick={handleCreateCompactDisk}>Создать компактный диск</button>
      {/* Добавляем кнопку "Удалить" */}
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
};

export default MusicCard;
