import styles from "./Avatar.module.css"
import Span from "../generals/Span"
import { useState } from "react";
import imageCompression from 'browser-image-compression';

function Wallpaper({ variant = "wallpaper", changeWallpaper, src, ...props }) {
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);

    const compressImage = async (file) => {
        const options = {
            maxSizeMB: 0.01,           // Максимальный размер в MB
            useWebWorker: true,
            fileType: file.type
        };

        try {
            const compressedFile = await imageCompression(file, options);
            const renamedFile = new File([
                await compressedFile.arrayBuffer()],
                `wallpaper.${file.name.split('.')[1]}`,
                {type: file.type}
            )
            const renamedUrl = URL.createObjectURL(renamedFile);
            setPreviewUrl(renamedUrl);
            if (changeWallpaper) {
                changeWallpaper(renamedFile);
                console.log(renamedFile)
            }
        } catch (error) {
            console.error('Ошибка сжатия:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);
        if (file && file.type.startsWith('image/')) {
            setLoading(true);
            compressImage(file);
        }
    };

    return (
        <label htmlFor={variant}
            className={styles.label}>
            <img src={previewUrl ? previewUrl: src} alt="Preview"
                className={`${styles.wallpaper} ${loading ? styles.effects : ''}`}/>
            <Span variant="link">
                Выберите фото обоев
            </Span>
            <input hidden id={variant} 
                onChange={handleFileChange}
                type="file"
                accept=".jpg,.jpeg,.png,.gif"></input>
        </label>
    )
}

export default Wallpaper;