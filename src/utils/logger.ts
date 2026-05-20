import pino, { LoggerOptions } from 'pino';
import fs from 'fs';
import path from 'path';

/**
 * =========================================================
 * Create Logs Directory
 * =========================================================
 */
const logsDirPath = path.join(process.cwd(), 'logs');

if (!fs.existsSync(logsDirPath)) {
    fs.mkdirSync(logsDirPath, { recursive: true });
}

/**
 * =========================================================
 * Logger Configuration
 * =========================================================
 */
const loggerOptions: LoggerOptions = {

    /**
    * * 
    * LOG LEVEL
    * debug
    * info
    * warn
    * error
     */
    level: process.env.LOG_LEVEL || 'debug',

    timestamp: pino.stdTimeFunctions.isoTime,

    base: {
        pid: process.pid,
        environment: process.env.NODE_ENV || 'development'
    },

    formatters: {
        level(label) {
            return {
                level: label.toUpperCase()
            };
        }
    },

    redact: {
        paths: [
            'password',
            'token',
            'authorization',
            'headers.authorization'
        ],
        censor: '******'
    }
};

/**
 * =========================================================
 * Streams
 * =========================================================
 */
const streams = [

    /**
     * Console Stream
     */
    {
        level: 'debug',
        stream: process.stdout
    },

    /**
     * Application Logs File
     */
    {

        level: 'debug',
        stream: pino.destination({
            dest: './logs/application.log',
            sync: false
        })
    }

];

/**
 * =========================================================
 * Logger Instance
 * =========================================================
 */
export const logger = pino(
    loggerOptions,
    pino.multistream(streams)
);

/**
 * =========================================================
 * Logger Helper
 * =========================================================
 */
export class LoggerHelper {

    /**
     * Get Logger Instance
     */
    static getLogger() {
        return logger;
    }

    /**
     * INFO Logs
     */
    static info(message: string, metadata?: object): void {

        logger.info(metadata || {}, message);
    }

    /**
     * WARN Logs
     */
    static warn(message: string, metadata?: object): void {

        logger.warn(metadata || {}, message);
    }

    /**
     * DEBUG Logs
     */
    static debug(message: string, metadata?: object): void {

        logger.debug(metadata || {}, message);
    }

    /**
     * ERROR Logs
     */
    static error(message: string, error?: unknown): void {

        if (error instanceof Error) {

            logger.error({
                errorMessage: error.message,
                stack: error.stack,
                errorName: error.name
            }, message);

        } else {

            logger.error({
                error
            }, message);
        }
    }

    /**
     * FATAL Logs
     */
    static fatal(message: string, error?: unknown): void {

        logger.fatal({
            error
        }, message);
    }
}