import { useEffect, useRef, useState } from "react"
import { API_BASE_URL } from "@/constants";

function ProtectedImage({ src, alt, className, fallback, clickHandler = () => console.log('Click-cluck'), ...props }) {
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const abortControllerRef = useRef(null);

    useEffect(() => {
        async function fetchImage() {

            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        
            abortControllerRef.current = new AbortController();
            setLoading(true);
            setError(false);
            
            try {
                if (!src) {
                    return;
                }

                const token = localStorage.getItem('auth:accessToken') || localStorage.getItem('auth:guestToken');
                const response = await fetch(
                    src,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Accept': 'image/*',
                        },
                        credentials: 'include',
                        signal: abortControllerRef.current.signal
                    }
                );
            
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            
                const blob = await response.blob();
                const objectUrl = URL.createObjectURL(blob);
                setImageUrl(objectUrl);
            } catch (error) {
                if (error.name !== 'AbortError') {
                    console.error('Error loading protected image:', error);
                    setError(true);
                }
            } finally {
                setLoading(false);
            }
        };
        fetchImage();

        // очистка при размонтировании
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
            if (imageUrl) {
                URL.revokeObjectURL(imageUrl);
            }
            setImageUrl('');
        };
    }, [src])
    console.log(src)
    console.log(imageUrl)

    if (loading) {
        return (
            <div className={`image-loading ${className}`}>
                <div className="spinner"></div>
            </div>
        )
    }

    if (error || !imageUrl) {
        return fallback ? (
            <img 
                src={fallback}
                alt={alt}
                className={className}
                onClick={() => clickHandler()}/>
        ) : (
            <div className={`image-error ${className}`}>
                <span>⚠️</span>
            </div>
        )
    }
    return (
        <img
            { ...props }
            src={imageUrl}
            alt={alt}
            className={className}
            onClick={() => clickHandler()}
            onError={() => setError(true)}
        />
    )
}

export default ProtectedImage;
