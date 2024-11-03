import React from "react";
import { Link } from "react-router-dom";

export default function MediaItem({item}) {
  return <>
  
  <div className="col-md-3 col-sm-6 col-lg-2 mb-5">

    <Link className="text-decoration-none" to={`/itemdetails/${item.id}/${item.media_type}`}>
    <div className="position-relative">
      {item.poster_path?<img loading="lazy" className="w-100" src={'https://image.tmdb.org/t/p/w500'+item.poster_path} alt="trending movie" /> : 
      <img loading="lazy" className="w-100" src={'https://image.tmdb.org/t/p/w500'+item.profile_path} alt="trending movie" />}
      <h3 className="h5">{item.title} {item.name}</h3>
      {item.vote_average?<div className="vote top-0 end-0 position-absolute p-1 text-bg-warning">{item.vote_average.toFixed(1)}</div> : ""}
    </div>
    </Link>

  </div>

  </>;
}
