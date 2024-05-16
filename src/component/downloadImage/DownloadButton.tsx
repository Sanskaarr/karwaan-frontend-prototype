import React, { FC } from 'react';
import DownloadIcon from '@mui/icons-material/Download';
interface DownloadButtonProps {
    imageUrl: string;
    fileName?: string;
}

const DownloadButton: FC<DownloadButtonProps> = ({ imageUrl, fileName }) => {
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = fileName || 'downloaded-image'; // Set a default filename if not provided
        link.click();
    };

    return (
        <button onClick={handleDownload} style={{display:"flex", alignItems:"center",flexDirection:"column", justifyContent:"center"}}>
            <DownloadIcon />
            Download Image
        </button>
    );
};

export default DownloadButton;

