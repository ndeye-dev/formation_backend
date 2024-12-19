const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formationRoutes = require('./routes/formationRoute');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
mongoose.connect('mongodb+srv://projetapp:basedonnee@cluster0.lzatl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => {
    console.log('Connexion réussie à MongoDB');
  })
  .catch((error) => {
    console.error('Erreur lors de la connexion à MongoDB :', error);
  });

// Routes
app.use('/api/formations', formationRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
