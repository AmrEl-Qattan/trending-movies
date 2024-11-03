import React, { useEffect, useState } from "react";
import axios from "axios";
import MediaItem from "../MediaItem/MediaItem";
import { HelmetProvider,Helmet} from "react-helmet-async";




export default function Home() {

  const [movies, setMovies] = useState([]);
  const [tv, setTv] = useState([]);
  const [people, setPeople] = useState([]);

  async function getTrending(mediaitem , callback){
    let {data} = await axios.get(`https://api.themoviedb.org/3/trending/${mediaitem}/week?api_key=24d5953b892243c9cd844457f6524ac1`)
    // console.log(data.results);
    callback(data.results)
  }

  useEffect(()=>{
    getTrending('movie' , setMovies);
    getTrending('tv' , setTv);
    getTrending('person' , setPeople);
  },[])

  return <>
  <HelmetProvider>
  <Helmet>
    <meta http-equiv="X-UA-Compatible" content="IE=7" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <meta name="description" content="Discover the latest trending movies, top-rated releases, and must-watch films across genres. Stay updated with new releases, watch trailers, read reviews, and find your next favorite movie!" />
    <meta name="keywords" content="trending movies, latest movies, popular
    films, new releases, top-rated movies, movie reviews, watch trailers,
    upcoming movies, movie recommendations, trending actors" />
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trending Movies - Home</title>
  </Helmet>
  </HelmetProvider>

  {/* Trending movies */}

  {movies.length > 0 ? <>
  
    <div className="row py-3">
    <div className="col-md-4">
    <div className="brdr w-25 mb-3"></div>
    <h2 className="h3">Trending <br /> Movies <br /> Right Now</h2>
    <p className="text-muted">Top Trending Movies By Week</p>
    <div className="brdr w-75 mt-3"></div>
    </div>
    {movies.map((item , index)=> <MediaItem key={index} item={item}/>)}
  </div>

  {/* Trending Tv */}
  <div className="row py-3">
    <div className="col-md-4">
    <div className="brdr w-25 mb-3"></div>
    <h2 className="h3">Trending <br /> Tv <br /> Right Now</h2>
    <p className="text-muted">Top Trending tv By Week</p>
    <div className="brdr w-75 mt-3"></div>
    </div>
    {tv.map((item , index)=> <MediaItem key={index} item={item}/>)}
  </div>

  {/* Trending People */}
  <div className="row py-3">
    <div className="col-md-4">
    <div className="brdr w-25 mb-3"></div>
    <h2 className="h3">Trending <br /> People <br /> Right Now</h2>
    <p className="text-muted">Top Trending people By Week</p>
    <div className="brdr w-75 mt-3"></div>
    </div>
    {people.map((item , index)=> <MediaItem key={index} item={item}/>)}
  </div>
  </> : <div className="d-flex vh-100 align-items-center justify-content-center">
  <i className="fas fa-spinner fa-spin fa-8x"></i>
  </div> }
  
  </>;
}
