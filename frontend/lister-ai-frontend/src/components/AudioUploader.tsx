import { useState, useCallback } from "react";
import { Upload, Loader2, FileAudio } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface AudioUploaderProps {
  onUploadComplete: (data: { inventory: Record<string, number>; transcription: string }) => void;
}

export const AudioUploader = ({ onUploadComplete }: AudioUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelection(files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileSelection(files[0]);
    }
  };

  const handleFileSelection = (file: File) => {
    if (!file.type.startsWith('audio/')) {
      toast({
        title: "Invalid File",
        description: "Please upload an audio file",
        variant: "destructive",
      });
      return;
    }
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:8000/process-audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUploadComplete(data);
      
      toast({
        title: "Success!",
        description: "Audio processed successfully",
      });
      
      setSelectedFile(null);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process audio. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card className="p-8 shadow-elegant border-2 border-dashed transition-all duration-300 hover:shadow-glow">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex flex-col items-center justify-center space-y-6 transition-all duration-300 ${
          isDragging ? "scale-105 opacity-80" : ""
        }`}
      >
        <div className="p-6 rounded-full bg-gradient-hero">
          {isUploading ? (
            <Loader2 className="h-16 w-16 text-primary animate-spin" />
          ) : (
            <Upload className="h-16 w-16 text-primary" />
          )}
        </div>

        <div className="text-center space-y-2">
          <h3 className="text-2xl font-semibold">Upload Audio File</h3>
          <p className="text-muted-foreground max-w-md">
            Drag and drop your audio file here, or click to browse
          </p>
        </div>

        {selectedFile && (
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-hero rounded-lg">
            <FileAudio className="h-5 w-5 text-primary" />
            <span className="font-medium">{selectedFile.name}</span>
          </div>
        )}

        <div className="flex gap-4">
          <label htmlFor="audio-upload">
            <Button variant="outline" className="cursor-pointer" asChild>
              <span>Browse Files</span>
            </Button>
            <input
              id="audio-upload"
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={handleFileInput}
              disabled={isUploading}
            />
          </label>

          {selectedFile && (
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="bg-gradient-primary hover:opacity-90 transition-opacity"
            >
              {isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Process Audio"
              )}
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
