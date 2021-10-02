import React, { useState} from 'react';
import  './style.css'

const Container = () => {
   const [ data, setData ] =useState([]);
   const [ username, setUsername ] = useState("");
   const [ repositories, setRepositorie ] = useState([]);
   const [isLoading, setIsloading] = useState(false);

   const onChangeHandler = e =>{
       setUsername(e.target.value);
   }

   const submitHandler = async e => {
       e.preventDefault();

       const profileGit = await fetch(`https://api.github.com/users/${username}`);
       const profileJson = await profileGit.json();
       console.log(profileJson);

        const repositories = await fetch(profileJson.repos_url);
        const reposJson = await repositories.json();

        if(profileJson) {
            setData(profileJson);
            setRepositorie(reposJson);
            setIsloading(true);
        }
   }


    return(
            <div className="container ">
                <div className="row justify-content-center align-items-center ">
                    <div className="col-4 card mt-5">
                        <h1 className="title">Perfil de GitHub</h1>
                            <div className="input-group mb-4">
                            <input 
                            type="text"
                            className="form-control" 
                            value={username}
                            onChange={onChangeHandler}
                            placeholder="Buscar aqui Usuarios GitHub..."
                            />
                            <button className="search" onClick={submitHandler}>Buscar</button>
                            </div>
                    </div> 
                </div>
                
                {isLoading ?

                <div className="row mt-4 justify-content-center align-items-center ">
                    <div className="wrapper">
                        <div className="profile">
                            <img src={data.avatar_url} className="thumbnail" alt="profile"/>
                            <h3 className="name">{data.name}</h3>
                            <p className="title">{data.location}</p>
                            <p className="description">{data.bio}</p>
                        </div>
                        <div className="social-icons">
                            <div className="icon">
                                <h4>{data.followers}</h4>
                                <p>Followers</p>
                            </div>
                            <div className="icon">
                                <h4>{data.following}</h4>
                                <p>Following</p>
                            </div>
                            <div className="icon">
                                <h4>{data.public_repos}</h4>
                                <p>Repositories</p>
                            </div>
                        </div>
                    </div>
                </div>

                    : <div> </div>
                    }
            </div>
    );
  
};

export default Container;
