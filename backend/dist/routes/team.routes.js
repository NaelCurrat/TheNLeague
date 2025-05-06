"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.teamRoutes = void 0;
const express_1 = __importDefault(require("express"));
const sqlite3_1 = require("sqlite3");
const router = express_1.default.Router();
const db = new sqlite3_1.Database('database.sqlite');
router.get('/', (req, res) => {
    db.all('SELECT * FROM teams', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});
router.get('/:id', (req, res) => {
    db.get('SELECT * FROM teams WHERE id = ?', [req.params.id], (err, row) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Équipe non trouvée' });
            return;
        }
        res.json(row);
    });
});
router.post('/', (req, res) => {
    const { name, logo, championship, countryFlag } = req.body;
    db.run('INSERT INTO teams (name, logo, championship, countryFlag) VALUES (?, ?, ?, ?)', [name, logo, championship, countryFlag], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID });
    });
});
router.put('/:id', (req, res) => {
    const { name, logo, championship, countryFlag } = req.body;
    db.run('UPDATE teams SET name = ?, logo = ?, championship = ?, countryFlag = ? WHERE id = ?', [name, logo, championship, countryFlag, req.params.id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Équipe mise à jour avec succès' });
    });
});
router.delete('/:id', (req, res) => {
    db.run('DELETE FROM teams WHERE id = ?', [req.params.id], (err) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: 'Équipe supprimée avec succès' });
    });
});
exports.teamRoutes = router;
//# sourceMappingURL=team.routes.js.map