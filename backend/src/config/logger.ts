// Import the LoggerType type from '@/types/type'
import { LoggerType } from '@/types/type';

// Import necessary modules from Winston
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;

// Define the formatting function using printf
const myFormat = format.printf(({ level, message, label, timestamp }: LoggerType) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

// Create the Winston logger with specified configurations
const logger = createLogger({
    format: combine(
        label({ label: 'USER_LEVEL!' }),
        timestamp(),
        prettyPrint(),
        format.colorize(),
        format.simple()
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error', format: format.json() }),
        new transports.File({ filename: 'debug.log', level: 'debug', format: format.json() }),
        new transports.File({ filename: 'info.log', level: 'info', format: format.json() }),
        new transports.Http({
            level: 'warn',
            format: format.json()
        }),
        new transports.Console({
            level: 'info',
            format: format.combine(
                format.colorize(),
                format.simple()
            )
        })
    ],
    exceptionHandlers: [
        new transports.File({ filename: 'exceptions.log' })
    ],
    rejectionHandlers: [
        new transports.File({ filename: 'rejections.log' })
    ]
});

// Export the logger module
module.exports = logger;
