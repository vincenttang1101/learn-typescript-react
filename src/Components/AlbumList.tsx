import { useEffect, useState } from 'react';

interface albumType {
  userId: number;
  id: number;
  title: string;
}

export const AlbumList = () => {
  const [albums, setAlbums] = useState<albumType[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const getAlbumList = () => {
    fetch('https://jsonplaceholder.typicode.com/albums')
      .then((response) => response.json())
      .then((data) => setAlbums(data))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  //   const getAlbumList = async () => {
  //     try {
  //       const response = await fetch('https://jsonplaceholder.typicode.com/albums/');
  //       const data = await response.json();
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       setAlbums(data);
  //     } catch (error) {
  //       console.error('There was a problem with the fetch operation:', error);
  //     }
  //     setIsLoading(false);
  //   };

  useEffect(() => {
    getAlbumList();
  }, []);

  if (isLoading) return <h1>Loading</h1>;

  return (
    <>
      {albums.map((album) => (
        <h5 key={album.id}>
          {album.id} - {album.title}
        </h5>
      ))}
      ;
    </>
  );
};
