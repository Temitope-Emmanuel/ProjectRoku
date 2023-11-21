'use client';

import { IP_ADDRESS, PORT } from '#/constant';
import { ExternalLink } from '#/ui/external-link';
import QRCode from 'react-qr-code';
import { toast } from 'react-toastify';

export const handleSplit = (arg: string) => arg.split("\\")

export default function Page({
    params: { audioId },
}: {
    params: { audioId: string };
}) {
    const decodedAudioID = decodeURIComponent(audioId);
    console.log({audioId})
    const audioDetailArr = handleSplit(decodedAudioID)
    const audioName = audioDetailArr[audioDetailArr.length - 1];
    const downloadPathName = `http://${IP_ADDRESS}:${PORT}/download?filePath=${encodeURIComponent(decodedAudioID.replaceAll('\\','/'))}`
    const handleCopyClick = () => {
        const textArea = document.createElement('textarea');
        textArea.value = downloadPathName.replaceAll("\\", '/');
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast(`successfully copied link to ${audioName}`, {
            type: 'success'
        })
    }
    console.log({
        decodedAudioID,
        audioId
    })
    return (
        <div className="prose prose-sm prose-invert max-w-none flex flex-col gap-5 overflow-scroll">
            <div>
                <h1 className="text-xl font-bold">{audioName}</h1>
                <p>To download <strong><em>{audioName}</em></strong>, kindly follow the instructions below: </p>
                <ul>
                    <li>Please connect to the same network as this device</li>
                    {/* <li>You can either </li> */}
                    <ul>
                        {/* <li>You can either visit the following link <code>{`${IP_ADDRESS}:3000`}</code></li> */}
                        <li>Scan the following QR code below or visit the following link on your phone
                            <br />
                            <code onClick={handleCopyClick}>{downloadPathName}</code>
                        </li>
                    </ul>
                </ul>
                <ExternalLink href={downloadPathName}>
                    Download {audioName}
                </ExternalLink>
            </div>
            <div className='flex bg-white p-2 m-auto md:m-0' style={{ height: '256px', width: '256px' }}>
                <QRCode
                    value={downloadPathName}
                    size={256}
                    style={{
                        height: 'auto',
                        maxWidth: '100%',
                        width: '100%',
                    }}
                    viewBox={'0 0 256 256'}
                />
            </div>
        </div>
    );
}
