const { supportedMimes } = require('@/config/fileSystem'); 
import { v4 as uuidv4 } from 'uuid';
import {SupportedMimeType} from '@/types/type'



const imageValidator = (size: number, mime: SupportedMimeType): string | null => {
    if (bytesToMb(size) > 2) {
        return "Image size must be less than 2MB";
    } else if (!supportedMimes.includes(mime)) {
        return "Image must be of type png, heic, jpg, gif, svg, jpeg only.";
    } else {
        return null;
    }
};

const bytesToMb = (bytes: number): number => {
    return bytes / (1024 * 1024);
};

const generateRandomNum = (): string => {
    return uuidv4();
};

export {
    imageValidator,
    bytesToMb,
    generateRandomNum
};
