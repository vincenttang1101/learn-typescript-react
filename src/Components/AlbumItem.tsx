import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const AlbumItem = () => {
  const [album, setAlbum] = useState<any>('');
  const { albumId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const instance = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    timeout: 2000,
    headers: { 'X-Custom-Header': 'foobar' },
  });

  const getAlbumItem = () => {
    instance
      .get(`/albums/${albumId}`)
      .then((response) => setAlbum(response.data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    // Hỏi trainer!
    getAlbumItem();
  }, []);

  if (isLoading) return <h1>Loading</h1>;
  return (
    <>
      <h5>
        {album.id}. {album.title}
      </h5>
    </>
  );
};
