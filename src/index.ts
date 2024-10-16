import app from './app';
require('dotenv').config();

// const PORT = 3333;
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} - ${new Date()}`);
});
