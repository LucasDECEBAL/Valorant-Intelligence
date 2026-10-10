"use client";

import Link from 'next/link';
import {FormEvent, useState} from 'react';

export default function Login(){
  const [message,setMessage]=useState('');
  function handleSubmit(event:FormEvent<HTMLFormElement>){
    event.preventDefault();
    setMessage('La connexion sera disponible après configuration de l’authentification.');
  }
  return <main className="auth"><Link href="/" className="back">← Accueil</Link><div className="auth-box"><span className="eyebrow">ESPACE PERSONNEL</span><h1>Connexion</h1><p className="muted">La persistance nécessite une base PostgreSQL configurée.</p><form onSubmit={handleSubmit}><label>Email<input type="email" required placeholder="toi@exemple.fr"/></label><label>Mot de passe<input type="password" required minLength={8}/></label><button className="button" type="submit">Se connecter</button></form>{message&&<p className="notice" role="status">{message}</p>}<p className="muted">Pas encore de compte ? <button className="text-button" type="button" onClick={()=>setMessage('La création de compte sera disponible prochainement.')}>Créer un compte</button></p></div></main>
}
