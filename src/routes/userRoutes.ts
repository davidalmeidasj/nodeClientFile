import { Router } from 'express';
import { searchUsers } from '../controllers/userController';

const router = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Search for users
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: The search query
 *     responses:
 *       200:
 *         description: A list of users matching the search query
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/File'
 *       500:
 *         description: Error searching files
 */
router.get('/api/users', searchUsers);

export default router;
