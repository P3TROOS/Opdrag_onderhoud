// User identity: persistence, password verification, token issuance.

import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createPool } from '../config/database.js';

const pool = createPool();
const JWT_SECRET = process.env.JWT_SECRET;

export async function registerUser(email, password) {
  const hashedPassword = await bcryptjs.hash(password, 10);
  const [result] = await pool.query(
    'INSERT INTO users (email, password_hash) VALUES (?, ?)',
    [email, hashedPassword],
  );
  return result.insertId;
}

export async function findUserByEmail(email) {
  const [rows] = await pool.query('SELECT id, email, password_hash FROM users WHERE email = ?', [email]);
  return rows[0] || null;
}

export async function verifyPassword(plainPassword, hashedPassword) {
  return bcryptjs.compare(plainPassword, hashedPassword);
}

export async function generateToken(userId, email) {
  return jwt.sign(
    { sub: userId, email },
    JWT_SECRET,
    { expiresIn: '7d' },
  );
}

