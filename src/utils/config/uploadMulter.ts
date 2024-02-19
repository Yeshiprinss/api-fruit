import fs from 'node:fs';

export const saveImage = (file: Express.Multer.File): string | null =>{
    const newPath = `uploads/${file.originalname}`;
    fs.renameSync(file.path, newPath);

    return newPath;
}