import React, { useEffect, useState } from "react";
import axios from "axios";

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  patronomyc: string;
}

interface Ensemble {
  id: string;
  type: string;
  name: string;
  perfomancesCount: number;
  musicants: any[]; // Замените any на тип, который соответствует структуре объекта Ensemble
}

interface Performance {
  id: string; // Теперь включаем id
  place: string;
  name: string;
  ensembleId: string;
  duration: string;
  tempo: number;
  interpretation: string;
}

interface CreateMusicCardFormProps {
  onCreateSuccess: () => void;
}

const tempos = [
  "Grave",
  "Largo",
  "Largamente",
  "Adagio",
  "Lento",
  "Lentamente",
  "Larghetto",
  "AndanteAssai",
  "Adagietto",
  "Andante",
  "AndanteMaestoso",
  "AndanteMosso",
  "Comodo",
  "Comodamente",
  "AndanteNonTroppo",
  "AndanteConMoto",
  "Andantino",
  "ModeratoAssai",
  "Moderato",
  "ConMoto",
  "AllegrettoModerato",
  "Allegretto",
  "AllegrettoMosso",
  "Animato",
  "AnimatoAssai",
  "AllegroModerato",
  "TempoDiMarcia",
  "AllegroMaNonTroppo",
  "AllegroTranquillo",
  "Allegro",
  "AllegroMolto",
  "AllegroAssai",
  "AllegroAgitato",
  "AllegroAnimato",
  "AllegroVivace",
  "Vivo",
  "Vivace",
  "Presto",
  "Prestissimo",
];

const CreateMusicCardForm: React.FC<CreateMusicCardFormProps> = ({
  onCreateSuccess,
}) => {
  const [musicName, setMusicName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [authors, setAuthors] = useState<Author[]>([]);
  const [ensembles, setEnsembles] = useState<Ensemble[]>([]);
  const [performances, setPerformances] = useState<Performance[]>([]); // Теперь массив будет содержать объекты Performance
  const [newPerformance, setNewPerformance] = useState<Performance>({
    id: "", // Добавляем id
    place: "",
    name: "",
    ensembleId: "",
    duration: "",
    tempo: 0,
    interpretation: "",
  });

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7204/api/SongWriter"
        );
        setAuthors(response.data);
      } catch (error) {
        console.error("Error fetching authors", error);
      }
    };

    const fetchEnsembles = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7204/api/Ensemble/Get"
        );
        setEnsembles(response.data);
      } catch (error) {
        console.error("Error fetching ensembles", error);
      }
    };

    fetchAuthors();
    fetchEnsembles();
  }, []);

  const handleAddPerformance = async () => {
    try {
      // Выполняем запрос на создание Performance и получаем его данные
      const response = await axios.post<Performance>(
        "https://localhost:7204/api/Performance/Create",
        newPerformance
      );

      // Добавляем объект Performance в массив performances
      setPerformances((prevPerformances) => [
        ...prevPerformances,
        response.data,
      ]);

      // Сбрасываем форму создания Performance
      setNewPerformance({
        id: "",
        place: "",
        name: "",
        ensembleId: "",
        duration: "",
        tempo: 0,
        interpretation: "",
      });
    } catch (error) {
      console.error("Error creating performance", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post("https://localhost:7204/api/MusicCard/create", {
        name: musicName,
        genre,
        authorId,
        performances,
      });

      // Опционально: выполните необходимые действия после успешного создания
      onCreateSuccess();
    } catch (error) {
      console.error("Error creating music card", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Название:
        <input
          type="text"
          value={musicName}
          onChange={(e) => setMusicName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Жанр:
        <input
          type="text"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />
      </label>
      <br />
      <label>
        Автор:
        <select
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option value="">Выберите автора</option>
          {authors.map((author) => (
            <option key={author.id} value={author.id}>
              {`${author.firstName} ${author.lastName} ${author.patronomyc}`}
            </option>
          ))}
        </select>
      </label>
      <br />
      <div>
        <h3>Добавить вариант исполнения</h3>
        <label>
          Место исполнения:
          <input
            type="text"
            value={newPerformance.place}
            onChange={(e) =>
              setNewPerformance({ ...newPerformance, place: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Имя:
          <input
            type="text"
            value={newPerformance.name}
            onChange={(e) =>
              setNewPerformance({ ...newPerformance, name: e.target.value })
            }
          />
        </label>
        <br />
        <label>
          Ансамбль:
          <select
            value={newPerformance.ensembleId}
            onChange={(e) =>
              setNewPerformance({
                ...newPerformance,
                ensembleId: e.target.value,
              })
            }
          >
            <option value="">Выберите ансамбль</option>
            {ensembles.map((ensemble) => (
              <option key={ensemble.id} value={ensemble.id}>
                {ensemble.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Длительность:
          <input
            type="text"
            value={newPerformance.duration}
            onChange={(e) =>
              setNewPerformance({
                ...newPerformance,
                duration: e.target.value,
              })
            }
          />
        </label>
        <br />
        <label>
          Темп:
          <select
            value={newPerformance.tempo}
            onChange={(e) =>
              setNewPerformance({
                ...newPerformance,
                tempo: Number(e.target.value),
              })
            }
          >
            {tempos.map((tempo, index) => (
              <option key={index} value={index}>
                {tempo}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          Интерпретация:
          <input
            type="text"
            value={newPerformance.interpretation}
            onChange={(e) =>
              setNewPerformance({
                ...newPerformance,
                interpretation: e.target.value,
              })
            }
          />
        </label>
        <br />
        <button type="button" onClick={handleAddPerformance}>
          Добавить
        </button>
        <br />
        {/* Список добавленных Performances */}
        <ul>
          {performances.map((performance) => (
            <li key={performance.id}>{`${performance.name}`}</li>
          ))}
        </ul>
      </div>
      <br />
      <button type="submit">Создать</button>
    </form>
  );
};

export default CreateMusicCardForm;
