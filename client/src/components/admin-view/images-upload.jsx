import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useEffect, useRef } from "react";
import { Button } from "../ui/button";
import axios from "axios";
import { Skeleton } from "../ui/skeleton";

function ProductImageUpload({
    imageFiles,
    setImageFiles,
    imageLoadingState,
    uploadedImageUrls,
    setUploadedImageUrls,
    setImageLoadingState,
    isEditMode,
    isCustomStyling = false,
}) {
    const inputRef = useRef(null);

    console.log(isEditMode, "isEditMode");

    function handleImageFileChange(event) {
        console.log(event.target.files, "event.target.files");

        const selectedFiles = Array.from(event.target.files); // Convert the FileList to an array

        if (selectedFiles.length) {
            setImageFiles((prevFiles) => [...prevFiles, ...selectedFiles]); // Append new files to the existing array
        }
    }
    
    function handleDragOver(event) {
        event.preventDefault();
      }

    function handleDrop(event) {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files); // Convert FileList to an array

        if (droppedFiles.length) {
            setImageFiles((prevFiles) => [...prevFiles, ...droppedFiles]); // Append dropped files to the state
        }
    }

    function handleRemoveImage(index) {
        setImageFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // Remove the file at the given index
    }

    function handleClearAllImages() {
        setImageFiles([]); // Clear all files
        if (inputRef.current) {
            inputRef.current.value = ""; // Reset the input field
        }
    }

    async function uploadImagesToCloudinary() {
        setImageLoadingState(true);

        // Use a Promise.all to upload all files concurrently
        const uploadPromises = imageFiles.map(async (file) => {
            const data = new FormData();
            data.append("my_file", file);
            const response = await axios.post(
                "http://localhost:5000/api/admin/products/upload-image",
                data
            );
            console.log(response, "response");

            // Return the uploaded image URL if successful
            return response?.data?.success ? response.data.result.url : null;
        });

        // Wait for all uploads to finish
        const uploadedUrls = await Promise.all(uploadPromises);

        // Filter out nulls and update the state with successful URLs
        const successfulUploads = uploadedUrls.filter((url) => url !== null);
        setUploadedImageUrls(successfulUploads); // Store all uploaded URLs in state

        setImageLoadingState(false);
    }

    // Use effect to trigger image upload on change
    useEffect(() => {
        if (imageFiles.length > 0) uploadImagesToCloudinary();
    }, [imageFiles]);


    return (
        <div
            className={`w-full mt-4 ${isCustomStyling ? "" : "max-w-md mx-auto"}`}
        >
            <Label className="text-lg font-semibold mb-2 block">Upload Images</Label>
            <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`${isEditMode ? "opacity-60" : ""} border-2 border-dashed rounded-lg p-4`}
            >
                <Input
                    id="image-upload"
                    type="file"
                    className="hidden"
                    ref={inputRef}
                    multiple
                    onChange={handleImageFileChange}
                    disabled={isEditMode}
                />

                {/* Show prompt to upload images when none are uploaded */}
                {imageFiles.length === 0 ? (
                    <Label
                        htmlFor="image-upload"
                        className={`${isEditMode ? "cursor-not-allowed" : ""} flex flex-col items-center justify-center h-32 cursor-pointer`}
                    >
                        <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
                        <span>Drag & drop or click to upload images</span>
                    </Label>
                ) : imageLoadingState ? (
                    <Skeleton className="h-10 bg-gray-100" />
                ) : (
                    <div className="space-y-2">
                        {/* Loop through the imageFiles and display each one */}
                        {imageFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <FileIcon className="w-8 text-primary mr-2 h-8" />
                                </div>
                                <p className="text-sm font-medium">{file.name}</p>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-foreground"
                                    onClick={() => handleRemoveImage(index)}  // Remove specific file
                                >
                                    <XIcon className="w-4 h-4" />
                                    <span className="sr-only">Remove File</span>
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Button to clear all images */}
            {imageFiles.length > 0 && (
                <Button
                    variant="outline"
                    className="mt-4"
                    onClick={handleClearAllImages}
                >
                    Clear All Images
                </Button>
            )}
        </div>
    );
}

export default ProductImageUpload;
