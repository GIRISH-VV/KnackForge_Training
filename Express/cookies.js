import express from 'express';
const router = express.Router();

// Set a cookie
router.get('/', (req, res) => {
    res.cookie('name', 'express-app', { maxAge: 360000 }); // 360000 ms = 6 min
    res.send("Cookie is set");
});

// Fetch cookies
router.get('/fetch', (req, res) => {
    console.log(req.cookies);
    res.send('Cookies fetched, check console');
});

// Remove a cookie manually
router.get('/remove-cookie', (req, res) => {
    res.clearCookie('name');
    res.send("Cookie cleared");
});

export default router;
