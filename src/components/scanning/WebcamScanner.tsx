import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { Camera, RotateCcw, Save, CornerUpLeft, CornerUpRight, CornerDownLeft, CornerDownRight, Toggle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle as ToggleButton } from '@/components/ui/toggle';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

interface WebcamScannerProps {
  onCapture: (data: string) => void;
}

interface Corner {
  x: number;
  y: number;
}

const WebcamScanner = ({ onCapture }: WebcamScannerProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isSmartDetectionEnabled, setIsSmartDetectionEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [corners, setCorners] = useState<Corner[]>([]);
  const [isAdjustingCorners, setIsAdjustingCorners] = useState(false);
  const { toast } = useToast();

  const capture = async () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setIsProcessing(true);
      setCapturedImage(imageSrc);
      
      if (isSmartDetectionEnabled) {
        // Simulate edge detection (replace with actual edge detection logic)
        await new Promise(resolve => setTimeout(resolve, 1500));
        setCorners([
          { x: 20, y: 20 },
          { x: 80, y: 20 },
          { x: 80, y: 80 },
          { x: 20, y: 80 }
        ]);
        toast({
          title: "Border Detection Complete",
          description: "You can now adjust the corners manually if needed.",
        });
      }
      
      setIsProcessing(false);
    }
  };

  const retake = () => {
    setCapturedImage(null);
    setCorners([]);
    setIsAdjustingCorners(false);
  };

  const handleCornerDrag = (index: number, e: React.MouseEvent) => {
    if (!isAdjustingCorners) return;
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const newCorners = [...corners];
    newCorners[index] = { x, y };
    setCorners(newCorners);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Smart Detection Toggle */}
      <div className="mb-4 flex items-center gap-2">
        <ToggleButton
          pressed={isSmartDetectionEnabled}
          onPressedChange={setIsSmartDetectionEnabled}
        >
          <Toggle className="mr-2 h-4 w-4" />
          Smart Border Detection
        </ToggleButton>
      </div>

      {/* Main Scanner Area */}
      <div className="relative w-full max-w-2xl aspect-video mb-4">
        {capturedImage ? (
          <div className="relative w-full h-full">
            <img
              src={capturedImage}
              alt="Captured"
              className="w-full h-full object-contain rounded-lg"
            />
            {/* Edge Detection Overlay */}
            {corners.length === 4 && (
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                style={{ filter: isAdjustingCorners ? 'none' : 'drop-shadow(0 0 2px rgba(0,0,0,0.5))' }}
              >
                <path
                  d={`M ${corners[0].x}% ${corners[0].y}% L ${corners[1].x}% ${corners[1].y}% L ${corners[2].x}% ${corners[2].y}% L ${corners[3].x}% ${corners[3].y}% Z`}
                  fill="none"
                  stroke="rgb(var(--primary))"
                  strokeWidth="2"
                  className="transition-all duration-200"
                />
                {isAdjustingCorners && corners.map((corner, index) => (
                  <circle
                    key={index}
                    cx={`${corner.x}%`}
                    cy={`${corner.y}%`}
                    r="6"
                    fill="rgb(var(--primary))"
                    className="cursor-move"
                    onMouseDown={(e) => handleCornerDrag(index, e)}
                  />
                ))}
              </svg>
            )}
          </div>
        ) : (
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full rounded-lg"
          />
        )}
        
        {/* Processing Indicator */}
        {isProcessing && (
          <div className="absolute inset-0 bg-background/50 flex flex-col items-center justify-center rounded-lg">
            <Progress value={65} className="w-1/2 mb-2" />
            <p className="text-sm text-muted-foreground">Detecting borders...</p>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex gap-4">
        {!capturedImage ? (
          <Button onClick={capture} disabled={isProcessing}>
            <Camera className="mr-2 h-4 w-4" />
            Capture
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={retake}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Retake
            </Button>
            {corners.length === 4 && (
              <Button
                variant="outline"
                onClick={() => setIsAdjustingCorners(!isAdjustingCorners)}
              >
                {isAdjustingCorners ? (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Confirm Corners
                  </>
                ) : (
                  <>
                    <CornerUpLeft className="mr-2 h-4 w-4" />
                    Adjust Corners
                  </>
                )}
              </Button>
            )}
            <Button onClick={() => onCapture(capturedImage)} disabled={isProcessing}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default WebcamScanner;