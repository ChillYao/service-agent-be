import express from 'express';
import jobRoutes from './routes/jobRoutes';

const app = express();
const PORT = 3000;

app.use(express.json()); // to parse JSON body

// Job routes
app.use('/jobs', jobRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

