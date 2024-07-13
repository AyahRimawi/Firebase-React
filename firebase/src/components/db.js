import { useEffect, useState } from "react";
import { db } from "../config/firebase";
// import { getFireStore } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";

export const Db = () => {
  const [movieList, setMovieList] = useState([]);

  const moviesCollectionRef = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      //read the data from database
      //set the movie list
      try {
        const data = await getDocs(moviesCollectionRef);
        const filterredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovieList(filterredData);
        console.log(filterredData);
      } catch (error) {
        console.error(error);
      }
    };
    getMovieList();
  }, []);

return (
  <>
    {movieList.map((movie) => (
      <div key={movie.id}>
        <h1 style={{ color: movie.receivedAnOscar ? "green" : "red" }}>
          {movie.title}
        </h1>
        <p> Data: {movie.releaseDate}</p>
      </div>
    ))}
  </>
);

};
