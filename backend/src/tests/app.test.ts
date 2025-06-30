import request from 'supertest';
import { app } from '../index';
import { Request, Response, NextFunction } from 'express'; // Import the necessary types

describe('GET /', () => {
    it('responds with API info', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message', 'API de Gestión de Candidatos ATS');
        expect(response.body).toHaveProperty('version');
        expect(response.body).toHaveProperty('status', 'running');
    });
});
