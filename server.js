const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

const BASE_URL = 'https://rickandmortyapi.com/api/character';

app.get('/', async (req, res) => {
  const { page = 1, name, status, species, type, gender } = req.query;
  let url = `${BASE_URL}?page=${page}`;

  if (name) url += `&name=${name}`;
  if (status) url += `&status=${status}`;
  if (species) url += `&species=${species}`;
  if (type) url += `&type=${type}`;
  if (gender) url += `&gender=${gender}`;

  try {
    const response = await axios.get(url);
    res.render('index', { data: response.data, query: req.query });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).render('error', { message: 'Error fetching data' });
  }
});

app.get('/character/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const response = await axios.get(`${BASE_URL}/${id}`);
      res.render('character', { character: response.data });
    } catch (error) {
      console.error('Error fetching character details:', error.message);
      res.status(500).render('error', { message: 'Error fetching character details' });
    }
  });

app.listen(3000, () => console.log('Server running on port 3000'));