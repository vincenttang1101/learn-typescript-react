import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export const AlbumItem = () => {
  const [album, setAlbum] = useState<any>('');
  const { albumId } = useParams();

  const [isLoading, setIsLoading] = useState(true);

  const getAlbumItem = () => {
    fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`)
      .then((response) => response.json())
      .then((data) => setAlbum(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  //   const getAlbumItem = async () => {
  //     try {
  //       const response = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
  //       const data = await response.json();

  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       setAlbum(data);
  //     } catch (error) {
  //       console.error('There was a problem with the fetch operation:', error);
  //     }
  //     setIsLoading(false);
  //   };

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
