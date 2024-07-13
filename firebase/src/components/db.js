import { useEffect, useState } from "react";
import { db } from "../config/firebase";
// import { auth} from "../config/firebase";

// import { getDocs } from "firebase/firestore";
// import { collection } from "firebase/firestore";
// import { addDoc } from "firebase/firestore";
// import { deleteDoc } from "firebase/firestore";
// import { updateDoc } from "firebase/firestore";
// import { doc } from "firebase/firestore";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

// import { auth } from "../config/firebase";
//-------------------------------------------------------

export const Db = () => {
  //get Movie States
  const [movieList, setMovieList] = useState([]);

  //add New Movie States
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);

  //updated Movie States
  const [updatedTitle, setUpdatedTitle] = useState("");

  const moviesCollectionRef = collection(db, "movies");
      // console.log(moviesCollectionRef);

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

  // Delete Movie async
  const deleteMovie = async (id) => {
    const movieDoc = doc(db, "movies", id);
        // console.log(movieDoc);
    try {
      await deleteDoc(movieDoc);
      // Update movieList state immediately after deleting the document
      const updatedList = movieList.filter((movie) => movie.id !== id);
      setMovieList(updatedList);
    } catch (error) {
      console.error("Error deleting document: ", error);
    }
  };

  // const deleteMovie = async (id) => {
  //   const movieDoc = doc(db, "movies", id);
  //   await deleteDoc(movieDoc);
  // };

  //-------------------------------------------------------
  //update Movie async

  const updateMovieTitle = async (id) => {
    const movieDoc = doc(db, "movies", id);
    try {
      if (!updatedTitle) {
        throw new Error("Title cannot be empty");
      }

      await updateDoc(movieDoc, { title: updatedTitle });

      // Update movieList state immediately after updating the document
      const updatedList = movieList.map((movie) =>
        movie.id === id ? { ...movie, title: updatedTitle } : movie
      );
      setMovieList(updatedList);

      // Clear updatedTitle after updating
      setUpdatedTitle("");
      document.getElementById("titleInput").value = "";
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  // const updateMovieTitle = async (id) => {
  //   const movieDoc = doc(db, "movies", id);
  //   await updateDoc(movieDoc, { title: updatedTitle });
  // };

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
          </h1>{" "}
          <p> Data: {movie.releaseDate}</p>
      {/* //------------------------------------------------------- */}
      {/* //Delete Movie */}
          <button onClick={() => deleteMovie(movie.id)}> Delete Movie</button>
          {/* <button onClick={deleteMovie(movie.id)}> Delete Movie</button> هاي خطأ بتعمل حذف بدون نقر ع الزر والسبب يعود لوجود uniqe parameter */}

      {/* //------------------------------------------------------- */}
      {/* //update Movie */}
          <input
            id="titleInput"
            placeholder="new title..."
            onChange={(e) => setUpdatedTitle(e.target.value)}
          />
          {/* <button onClick={() => updateMovieTitle(movie.id)}>
            {" "}
            Update Title
          </button> */}
          <button
            onClick={() => updateMovieTitle(movie.id)}
            disabled={!updatedTitle}
          >
            Update Title
          </button>
        </div>
      ))}
    </>
  );
};
