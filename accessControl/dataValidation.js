const Joi = require('joi');

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(40).required(),
  prix: Joi.number().min(0).required(),
  description: Joi.string(),
  image: Joi.string().required(),
  category: Joi.string().required(),
});

schema.validate({
  nom: 'test1', prix: 14, description: 'Produit de test', image: 'lientdetest', category: 'testCategory'
});

try {
    const value = await schema.validateAsync({
        nom: 'test1',
        prix: 14,
        description: 'Produit de test',
        image: 'lientdetest',
        category: 'testCategory',
    });
} catch (err) {}

module.exports = schema;
