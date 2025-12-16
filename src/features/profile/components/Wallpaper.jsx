import styles from "./Avatar.module.css"
import defaultWallpaper from '@/assets/images/defaults/default-wallpaper.svg'
import Span from "@/components/ui/Label/Span";
import Checkbox from "@/components/ui/Choice/Checkbox";
import { useState } from "react";
import imageCompression from 'browser-image-compression';
import ProtectedImage from "@/components/ui/Image/ProtectedImage";

function Wallpaper({ variant = "wallpaper", changeWallpaper, src, isProtected, privacyValue, ...props }) {
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
        <>
            <div className={`${styles.span}`}>
                Фон:
                {isProtected && <Checkbox forItem={props.name} privacyValue={privacyValue}/>}
            </div>
            <label htmlFor={variant}
                className={styles.label}>
                <ProtectedImage
                    src={previewUrl ? previewUrl: src} alt="Preview"
                    className={`${styles.wallpaper} ${loading ? styles.effects : ''}`}
                    fallback={defaultWallpaper}
                />
                <Span variant="link">
                    Выберите фото обоев
                </Span>
                <input hidden id={variant} 
                    onChange={handleFileChange}
                    type="file"
                    accept=".jpg,.jpeg,.png,.gif"></input>
            </label>
        </>
    )
}

export default Wallpaper;