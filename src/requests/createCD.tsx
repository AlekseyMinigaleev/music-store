import axios, { AxiosResponse } from 'axios';

export interface CreateCompactDiskRequest {
  MusicId: string;
  ManufactoringCompanyId: string;
  RetailPrice: number;
  WholeSalePrice: number;
  CountInStock: number;
}
// Замените URL на фактический URL вашего сервера
const apiBaseUrl = 'https://localhost:7204/api/';

export async function createCompactDisk(request: CreateCompactDiskRequest): Promise<AxiosResponse> {
  const url = `${apiBaseUrl}CompactDisk/Create`;

  try {
    const response = await axios.post(url, request, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json',
      },
    });

    if(response.status >300 )
      console.log (response.statusText);

    return response;
  } catch (error) {
    // Обработка ошибок (можете добавить свою логику обработки ошибок)
    console.error('Error creating compact disk:', error);
    throw error;
  }
}