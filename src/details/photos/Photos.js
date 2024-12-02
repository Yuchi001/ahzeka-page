import React, { Fragment, useState } from 'react';
import { Dialog, Stack } from "@mui/material";

export const Photos = ({ pngFiles }) => {
    const [open, setOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const imgHeight = 200;

    const handleImageClick = (image) => {
        setSelectedImage(image);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Stack width="80vw">
                <Stack paddingX="10px" alignItems="center" height={`${imgHeight + 20}px`} spacing={1} direction="row" style={{ overflowX: 'scroll', overflowY: 'scroll' }}>
                    {pngFiles.map((element, index) => (
                        <div key={index} style={{ display: 'inline-block' }}>
                            <img
                                onClick={() => handleImageClick(element.base64)}
                                src={element.base64}
                                alt=""
                                style={{
                                    borderRadius: '10px',
                                    height: `${imgHeight}px`,
                                    width: 'auto',
                                    cursor: 'pointer',
                                    transition: 'transform 0.1s ease',
                                }}
                                onMouseEnter={(e) => {
                                    e.target.style.transform = 'scale(1.05)';
                                }}
                                onMouseLeave={(e) => {
                                    e.target.style.transform = 'scale(1)';
                                }}
                            />
                        </div>
                    ))}
                </Stack>
            </Stack>

            <Dialog open={open} onClose={handleClose} maxWidth="lg">
                <img
                    src={selectedImage}
                    alt="Selected"
                    style={{ width: '100%', height: 'auto' }}
                />
            </Dialog>
        </Fragment>
    );
};
