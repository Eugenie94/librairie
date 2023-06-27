import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css'

function App() {

  // Etat d'un livre
  const [livres, setLivres] = useState([]);
  // Etat d'un  nouveau livre
  const [nouveauLivre, setNouveauLivre] = useState({
    id: '',
    titre: '',
    auteur: '',
    prix: '',
    description: ''
  });

  useEffect(() => {
    // Charger la liste des livres au chargement de l'application
    chargerLivres();
  }, []);

  const chargerLivres = async () => {
    try {
      // Appel GET /livre
      const response = await axios.get('http://localhost:3000/livre');
      // Met à jour la liste des livres
      setLivres(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const ajouterLivre = async () => {
    try {
      // Appel POST /livre
      const response = await axios.post('http://localhost:3000/livre', nouveauLivre);
      // Met à jour la liste des livres avec le nouveau livre ajouté
      setLivres(response.data);
      // Réinitialise les valeurs du formulaire
      setNouveauLivre({
        id: '',
        titre: '',
        auteur: '',
        prix: '',
        description: ''
      });
    } catch (error) {
      console.error(error);
    }
  };

  const supprimerLivre = async (id) => {
    try {
       // Appel DELETE /livre/:id
      await axios.delete(`http://localhost:3000/livre/${id}`);
      // Recharge la liste des livres après la suppression
      chargerLivres();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Liste des livres</h1>
      <div className="livres-liste">
        {livres.map(livre => (
          <div className="livre-card" key={livre.id}>
            <h3 className="livre-titre">{livre.titre}</h3>
            <p className="livre-auteur">Auteur: {livre.auteur}</p>
            <p className="livre-prix">Prix: {livre.prix}</p>
            <p className="livre-description">{livre.description}</p>
            <button className="supprimer-button" onClick={() => supprimerLivre(livre.id)}>Supprimer</button>
          </div>
        ))}
      </div>
      <h2>Ajouter un livre</h2>
      <div className="formulaire">
      <input
        type="number"
        placeholder="Id"
        value={nouveauLivre.id}
        onChange={e => setNouveauLivre({ ...nouveauLivre, id: parseInt(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Titre"
        value={nouveauLivre.titre}
        onChange={e => setNouveauLivre({ ...nouveauLivre, titre: e.target.value })}
      />
      <input
        type="text"
        placeholder="Auteur"
        value={nouveauLivre.auteur}
        onChange={e => setNouveauLivre({ ...nouveauLivre, auteur: e.target.value })}
      />
      <input
        type="text"
        placeholder="Prix"
        value={nouveauLivre.prix}
        onChange={e => setNouveauLivre({ ...nouveauLivre, prix: e.target.value })}
      />
      <input
        type="text"
        placeholder="Description"
        value={nouveauLivre.description}
        onChange={e => setNouveauLivre({ ...nouveauLivre, description: e.target.value })}
      />
<button className="ajouter-button" onClick={ajouterLivre}>Ajouter</button>
    </div>
    </div>
  );
}

export default App;
