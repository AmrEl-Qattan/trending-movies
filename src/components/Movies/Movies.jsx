import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { HelmetProvider ,Helmet} from "react-helmet-async";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  let mediaTybe = 'movie'
  let nums = new Array(10).fill(1).map((elem , index)=>index + 1);

  async function getTrending(page) {
    let { data } = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=24d5953b892243c9cd844457f6524ac1&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`
    );
    // console.log(data.results);
    setMovies(data.results);
  }

  useEffect(() => {
    getTrending(1);
  }, []);

  return (
    <>
    <HelmetProvider>
    <Helmet>
    <title>Trending Movies - Movies</title>
   </Helmet>
   </HelmetProvider>

      
    {movies.length > 0? <>
      <div className="row">

      <nav className="py-5">
        <ul className="pagination pagination-sm d-flex justify-content-center">
          
          {nums.map((page)=><li key={page} onClick={()=>getTrending(page)} className="page-item p-1">
            <Link className="page-link bg-transparent text-white">{page}</Link>
          </li>)}
        </ul>
        
      </nav>

        {movies.map((item , index)=> <div key={index} className="col-md-3 col-sm-6 col-lg-2 mb-5">
          <Link
            className="text-decoration-none"
            to={`/itemdetails/${item.id}/${mediaTybe}`}
          >
            <div className="position-relative">
              {item.poster_path ? (
                <img
                  loading="lazy"
                  className="w-100"
                  src={"https://image.tmdb.org/t/p/w500" + item.poster_path}
                  alt="trending movie"
                />
              ) : (
                <img
                  loading="lazy"
                  className="w-100"
                  src={"https://image.tmdb.org/t/p/w500" + item.profile_path}
                  alt="trending movie"
                />
              )}
              <h3 className="h5">
                {item.title} {item.name}
              </h3>
              {item.vote_average ? (
                <div className="vote top-0 end-0 position-absolute p-1 text-bg-warning">
                  {item.vote_average.toFixed(1)}
                </div>
              ) : (
                ""
              )}
            </div>
          </Link>
        </div>)}
      </div>

      <nav className="py-5">
        <ul className="pagination pagination-sm d-flex justify-content-center">
          
          {nums.map((page)=><li key={page} onClick={()=>getTrending(page)} className="page-item p-1">
            <Link className="page-link bg-transparent text-white">{page}</Link>
          </li>)}
          

        </ul>
      </nav>
    
    </> : <div className="d-flex vh-100 align-items-center justify-content-center">
    <i className="fas fa-spinner fa-spin fa-8x"></i>
      </div>}
      
    </>
  );
}
