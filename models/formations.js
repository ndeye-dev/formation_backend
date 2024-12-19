const mongoose = require('mongoose');

const formationSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: [true, 'Le nom de la formation est requis'],
    trim: true
  },
  dateFormation: {
    type: Date,
    required: [true, 'La date de la formation est requise']
  },
  nombreUtilisations: {
    type: Number,
    default: 0
  },
  thematique: {
    type: String,
    required: [true, 'La thématique de la formation est requise']
  },
  prix: {
    type: Number,
    required: [true, 'Le prix de la formation est requis'],
    min: [0, 'Le prix ne peut pas être négatif']
  }
}, { timestamps: true });

const Formation = mongoose.model('Formation', formationSchema);

module.exports = Formation;
