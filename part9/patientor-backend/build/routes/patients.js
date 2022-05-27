"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(patientService_1.default.getEntries());
});
router.post('/', (req, res) => {
    try {
        const newPatientEntry = (0, utils_1.default)(req.body);
        const addedEntry = patientService_1.default.addEntry(newPatientEntry);
        res.json(addedEntry);
    }
    catch (error) {
        let errorMessage = 'An error occured.';
        if (error instanceof Error) {
            errorMessage += ` Error: ${error.message}`;
        }
        res.status(400).send(errorMessage);
    }
});
exports.default = router;
