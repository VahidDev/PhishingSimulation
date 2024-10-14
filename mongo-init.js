db = db.getSiblingDB('PhishingDb');

db.createCollection('PhishingAttempts');

db.PhishingAttempts.createIndex({ attemptId: 1 }, { unique: true });