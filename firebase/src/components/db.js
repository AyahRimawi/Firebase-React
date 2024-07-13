import { useEffect, useState } from "react";
import { db } from "../config/firebase";
// import { getFireStore } from "firebase/firestore";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
// import { auth } from "../config/firebase";
//-------------------------------------------------------

export const Db = () => {
  //get Movie States
  const [movieList, setMovieList] = useState([]);

  //add New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  const moviesCollectionRef = collection(db, "movies");
//-------------------------------------------------------
  //get Movie async
  
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
  useEffect(() => {
    getMovieList();
  }, []);
//----------------------------------------------------
  //add New Movie async

  const onSubmitMovie = async () => {
    try {
      await addDoc(moviesCollectionRef, {
        title: newMovieTitle,
        releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
        // userId: auth?.currentUser?.uid,
      });
      getMovieList();
    } catch (err) {
      console.error(err);
    }
  };
//-------------------------------------------------------
  return (
    <>
      {/* add New Movie */}
      <div>
        <input
          placeholder="Movie title..."
          onChange={(e) => setNewMovieTitle(e.target.value)}
        />
        <input
          placeholder="Release Date..."
          type="number"
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
        />
        <input
          type="checkbox"
          checked={isNewMovieOscar}
          onChange={(e) => setIsNewMovieOscar(e.target.checked)}
        />
        <label> Received an Oscar</label>
        <button onClick={onSubmitMovie}> Submit Movie</button>
      </div>
      {/* //------------------------------------------------------- */}
      
      {/* get Movie */}
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
