const express = require('express');
const Formation = require('../models/formations');
const router = express.Router();

// Route GET pour récupérer toutes les formations
router.get('/', async (req, res) => {
  try {
    const formations = await Formation.find();
    res.status(200).json(formations);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des formations' });
  }
});

// Route GET pour récupérer une formation par ID
router.get('/:id', async (req, res) => {
  try {
    const formation = await Formation.findById(req.params.id);
    if (!formation) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }
    res.status(200).json(formation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération de la formation' });
  }
});

router.post('/', async (req, res) => {
  const { nom, dateFormation, nombreUtilisations, thematique, prix, imageUrl } = req.body;
  console.log('Données reçues:', { nom, dateFormation, nombreUtilisations, thematique, prix, imageUrl });  // Ajout de la journalisation
  try {
    if (!imageUrl || !nom || !dateFormation || !nombreUtilisations || !thematique || !prix) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }
    const newFormation = new Formation({ nom, dateFormation, nombreUtilisations, thematique, prix, imageUrl });
    await newFormation.save();
    res.status(201).json(newFormation);
  } catch (error) {
    console.error(error);  // Journalisation de l'erreur
    res.status(500).json({ message: 'Erreur lors de l\'ajout de la formation', error: error.message });
  }
});

// Route PUT pour modifier une formation
router.put('/:id', async (req, res) => {
  const { nom, dateFormation, nombreUtilisations, thematique, prix, imageUrl } = req.body;
  try {
    const updatedFormation = await Formation.findByIdAndUpdate(
      req.params.id,
      { nom, dateFormation, nombreUtilisations, thematique, prix, imageUrl },
      { new: true }
    );
    if (!updatedFormation) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }
    res.status(200).json(updatedFormation);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la formation' });
  }
});

// Route DELETE pour supprimer une formation
router.delete('/:id', async (req, res) => {
  try {
    const deletedFormation = await Formation.findByIdAndDelete(req.params.id);
    if (!deletedFormation) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }
    res.status(200).json({ message: 'Formation supprimée avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la suppression de la formation' });
  }
});

module.exports = router;
