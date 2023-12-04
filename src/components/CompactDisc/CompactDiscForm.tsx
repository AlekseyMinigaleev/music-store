import React, { useState } from 'react';
import axios from 'axios';

interface CompactDiskFormProps {
  musicId: string;
  onClose: () => void;
}

const CompactDiskForm: React.FC<CompactDiskFormProps> = ({ musicId, onClose }) => {
  const [manufactoringCompanyId, setManufactoringCompanyId] = useState('');
  const [retailPrice, setRetailPrice] = useState(0);
  const [wholeSalePrice, setWholeSalePrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);

  const companies = [
      {
         id: '68E8B733-8EA5-46F3-859A-00F7A99E7177',
         name: 'Rutherford Group',
      },
      {
         id: 'CEA35BE3-F9D3-4F24-B478-64854CC7B5BC',
         name: 'Bode - Kuhlman',
      },
   ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Отправляем запрос на сервер для создания компакт диска
      await axios.post('https://localhost:7204/api/CompactDisk/Create', {
        musicId,
        manufactoringCompanyId,
        retailPrice,
        wholeSalePrice,
        countInStock,
      });

      // После успешного создания, выполните необходимые действия
      onClose();
    } catch (error) {
      console.error('Error creating compact disk', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Комапния производитель:
        <select value={manufactoringCompanyId} onChange={(e) => setManufactoringCompanyId(e.target.value)}>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </select>
      </label>
      <br />
      <label>
        Розничная цена:
        <input type="number" value={retailPrice} onChange={(e) => setRetailPrice(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Оптновая цена:
        <input type="number" value={wholeSalePrice} onChange={(e) => setWholeSalePrice(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Количество на складе:
        <input type="number" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} />
      </label>
      <br />
      <button type="submit">Создать</button>
    </form>
  );
};

export default CompactDiskForm;
