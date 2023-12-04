import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';

export interface AuthorForSelect {
  id: string;
  fullName: string;
}

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  patronomyc: string;
}

const EditMusicCardPage: React.FC = ({ }) => {
  const { musicId } = useParams<{ musicId: string }>();
  const navigate = useNavigate();

  const [editedMusicName, setEditedMusicName] = useState('');
  const [editedGenre, setEditedGenre] = useState('');
  const [editedAuthorId, setEditedAuthorId] = useState('');

  // Новое состояние для хранения загруженных авторов
  const [loadedAuthors, setLoadedAuthors] = useState<AuthorForSelect[]>([]);

  useEffect(() => {
    const fetchMusicCard = async () => {
      try {
        const response = await axios.get(`https://localhost:7204/api/MusicCard/Get/${musicId}`);
        const musicCardData = response.data;

        // Заполняем форму данными из полученной музыкальной карточки
        setEditedMusicName(musicCardData.musicName);
        setEditedGenre(musicCardData.genre);
        setEditedAuthorId(musicCardData.authorId);
      } catch (error) {
        console.error('Error fetching music card data', error);
      }
    };

    const fetchAuthors = async () => {
      try {
        // Загружаем авторов
        const response = await axios.get<Author[]>('https://localhost:7204/api/SongWriter');
        const loadedAuthors = response.data.map(author => ({
          id: author.id,
          fullName: `${author.firstName} ${author.lastName} ${author.patronomyc}`,
        }));
        setLoadedAuthors(loadedAuthors);
      } catch (error) {
        console.error('Error fetching authors', error);
      }
    };

    fetchMusicCard();
    fetchAuthors();
  }, [musicId]);

  const handleSave = async () => {
    try {
      await axios.put(`https://localhost:7204/api/MusicCard/update`, {
        musicCardId: musicId,
        name: editedMusicName,
        genre: editedGenre,
        authorId: editedAuthorId,
      });

      // После успешного обновления данных, перенаправляем пользователя на страницу с музыкальной карточкой
      navigate(`/music`);
    } catch (error) {
      console.error('Error updating music card', error);
    }
  };

  return (
    <div>
      <h2>Обнвоить музыкальное произведение</h2>
      <label>
        Имя:
        <input type="text" value={editedMusicName} onChange={(e) => setEditedMusicName(e.target.value)} />
      </label>
      <br />
      <label>
        Автор:
        <select value={editedAuthorId} onChange={(e) => setEditedAuthorId(e.target.value)}>
          <option value="">Выберите автора</option>
          {loadedAuthors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.fullName}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Жанр:
        <input type="text" value={editedGenre} onChange={(e) => setEditedGenre(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
      
      {/* Кнопка для возврата на страницу http://localhost:3000/music */}
      <Link to="/music">
        <button>Вернуться назад</button>
      </Link>
    </div>
  );
};

export default EditMusicCardPage;
