import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

interface ManufacturingCompany {
   id: string;
   name: string;
 }

const CreateCompactDiskPage: React.FC = ({ }) => {
  const { musicId } = useParams<{ musicId: string }>();
  const navigate = useNavigate();
  const [manufactoringCompanyId, setManufactoringCompanyId] = useState('');
  const [retailPrice, setRetailPrice] = useState(0);
  const [wholeSalePrice, setWholeSalePrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [manufacturingCompanies, setManufacturingCompanies] = useState<ManufacturingCompany[]>([]);
  const [selectedCompanyId, setSelectedCompanyId] = useState('');

  useEffect(() => {
   // Жестко закодированный массив производителей
   const hardcodedManufacturingCompanies: ManufacturingCompany[] = [
     { id: '68E8B733-8EA5-46F3-859A-00F7A99E7177', name: 'Rutherford Group' },
     { id: 'CEA35BE3-F9D3-4F24-B478-64854CC7B5BC', name: 'Bode - Kuhlman' },
   ];

   setManufacturingCompanies(hardcodedManufacturingCompanies);
 }, []);

  const handleCreateCompactDisk = async () => {
    try {
      // Отправляем запрос на сервер для создания компакт-диска
      await axios.post('https://localhost:7204/api/CompactDisk/create', {
        musicId,
        manufactoringCompanyId,
        retailPrice,
        wholeSalePrice,
        countInStock,
      });

      // После успешного создания компакт-диска, перенаправляем пользователя на страницу с музыкальной карточкой
      navigate(`/music`);
    } catch (error) {
      console.error('Error creating compact disk', error);
    }
  };

  const jopa = (е:string)=>{
   setManufactoringCompanyId(е);
   setSelectedCompanyId(е);
  }

  return (
    <div>
      <h2>Создать компактный диск</h2>
      <label>
        компания производитель:
        <select value={selectedCompanyId} onChange={(e) => jopa(e.target.value)}>
          <option value="">вберите компанию</option>
          {manufacturingCompanies.map((company) => (
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
        Оптовая цена:
        <input type="number" value={wholeSalePrice} onChange={(e) => setWholeSalePrice(Number(e.target.value))} />
      </label>
      <br />
      <label>
        Количество на складе:
        <input type="number" value={countInStock} onChange={(e) => setCountInStock(Number(e.target.value))} />
      </label>
      <br />
      <button onClick={handleCreateCompactDisk}>Создать</button>
    </div>
  );
};

export default CreateCompactDiskPage;
