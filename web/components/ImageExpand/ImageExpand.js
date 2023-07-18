import Image from "next/image";
import { useState } from "react";
import 'photoswipe/dist/photoswipe.css'

import { Gallery, Item } from 'react-photoswipe-gallery'

export default function ImageExpand(props) {

    const { src, alt, width, height } = props;
    console.log(props);

    const [isExpanded, setIsExpanded] = useState(false);

    const handleImageClick = () => {
        setIsExpanded(true);
    };

    return (
        <>
            <Gallery>
                <Item
                    original={src}
                    thumbnail={src}
                    width={width}
                    height={height}
                >
                    {({ ref, open }) => (

                        <Image
                            ref={ref} onClick={open}
                            src={src}
                            alt={alt}
                            fill
                            objectFit="cover"
                            className="rounded-md cursor-pointer"
                        />
                    )}
                </Item>
            </Gallery>
        </>
    )
}