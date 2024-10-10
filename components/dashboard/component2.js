import React, { useState, useEffect } from "react";
import FilesHelper from "../../helper/files";
 
import dynamic from "next/dynamic";
const FileViewer = dynamic(() => import('react-file-viewer'), { ssr: false });
 
//to get the file extension
//this.props.file_name.split('.').pop(),
 
const Component2 = () => {
    const [fileUrl, setFileUrl] = useState(null);
    const [videoUrl, setVideoUrl] = useState(null);
    const file_type = "jpg";
    const video_type = "mp4";
    useEffect(() => {
        async function fetchFile() {
            const file_name = "adv_98.JPG";
            const url = await FilesHelper.getFile(file_name);
            setFileUrl(url);
        }
 
        fetchFile();
    }, []);
 
    useEffect(() => {
        async function fetchVideo() {
            const file_name = "tt.mp4";
            const url = await FilesHelper.getFile(file_name);
            setVideoUrl(url);
        }
        fetchVideo();
    }, []);
 
    return (
        <div>
            
            
        </div>
    );
};
 
export default Component2;
