import * as config from 'config';

const secret = config.get('jwtSecret');

export const jwtConstants = {
    secret,
};