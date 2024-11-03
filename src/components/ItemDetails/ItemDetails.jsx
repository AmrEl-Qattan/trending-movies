import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { HelmetProvider ,Helmet} from "react-helmet-async";


export default function ItemDetails() {

  let {id,mediaType} = useParams();

  const [details, setDetails] = useState({});

  async function getTrending(id , mediaType){
    let {data} = await axios.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=24d5953b892243c9cd844457f6524ac1&language=en-US`)
    // console.log(data);
    setDetails(data)
  }

  useEffect(()=>{
    getTrending(id,mediaType);
  },[])



  return <>

    <HelmetProvider>
   <Helmet>
    <title>Trending Movies - Details</title>
   </Helmet>
   </HelmetProvider>
   
  {details? <div className="row mb-5">
    <div className="col-md-3">
    {details.poster_path?<img loading="lazy" className="w-100" src={'https://image.tmdb.org/t/p/w500'+details.poster_path} alt="trending movie" /> : 
      <img loading="lazy" className="w-100" src={'https://image.tmdb.org/t/p/w500'+details.profile_path} alt="trending movie" />}
    </div>

    <div className="col-md-9 d-flex align-items-center">
       <div>
       <h3>{details.title} {details.name}</h3>
        <h3 className="h5">{details.release_date} {details.first_air_date}</h3>
        <p className="my-3 mb-5">{details.overview} {details.biography}</p>
        {details.vote_average?<h3 >Vote Average : <span className=" text-warning">{details.vote_average.toFixed(1)}</span></h3> : ""}
        
        {details.birthday? <h3>birthday : <span className="text-white">{details.birthday}</span></h3> : ""}
        {details.place_of_birth? <h3> Place Of Birth : <span className="text-white">{details.place_of_birth}</span></h3> : ""}
        
       </div>
    </div>
  </div> : <div className="d-flex vh-100 align-items-center justify-content-center">
  <i className="fas fa-spinner fa-spin fa-8x"></i>
  </div> }
  
  
  </>;
}
