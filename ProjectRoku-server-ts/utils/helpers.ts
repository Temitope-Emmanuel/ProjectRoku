import fs from 'fs';
import path from 'path';

export const traverseDirectory: any = async (filePath: string) => {
    const files = await fs.promises.readdir(filePath);

    const { audioFiles, supposedDirectories } = files.reduce((acc, curVal) => {
        const extension = path.extname(curVal).toLowerCase();
        const currentFilePath = path.join(filePath, curVal);

        if (path.basename(currentFilePath).startsWith('.')) return acc;
        else if (extension === '.mp3') acc.audioFiles.push(currentFilePath);
        else acc.supposedDirectories.push(currentFilePath);
        return acc;
    }, { supposedDirectories: [] as string[], audioFiles: [] as string[] });
    const directories = supposedDirectories.map(async itemPath => {
        const itemStats = await fs.promises.lstat(itemPath);
        return itemStats.isDirectory() && await traverseDirectory(itemPath)
    })
    return Promise.all(directories).then(directories => {
        return ({
            audioFiles: audioFiles.map(file => formatPath(file)),
            path: filePath,
            directories
        })

    }).catch(err => {
        console.log('this is the error', err)
    })
}

const backslashPattern = /\//;
export const formatPath = (path: string) => path.split(backslashPattern).join("\\");