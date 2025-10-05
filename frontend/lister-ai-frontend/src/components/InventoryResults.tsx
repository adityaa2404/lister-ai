import { Package, Download, Loader2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface InventoryResultsProps {
  inventory: Record<string, number>;
  transcription: string;
}

export const InventoryResults = ({ inventory, transcription }: InventoryResultsProps) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/download-excel");
      
      if (!response.ok) {
        throw new Error("Download failed");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "inventory_records.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: "Downloaded!",
        description: "Inventory Excel file downloaded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to download Excel file",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  const itemCount = Object.keys(inventory).length;
  const totalItems = Object.values(inventory).reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 bg-gradient-hero border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Unique Items</p>
              <p className="text-3xl font-bold text-primary">{itemCount}</p>
            </div>
            <Package className="h-10 w-10 text-primary opacity-50" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-hero border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Count</p>
              <p className="text-3xl font-bold text-accent">{totalItems}</p>
            </div>
            <Package className="h-10 w-10 text-accent opacity-50" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-primary text-primary-foreground border-0">
          <Button
            onClick={handleDownload}
            disabled={isDownloading}
            className="w-full h-full bg-transparent hover:bg-white/10 border-0"
          >
            {isDownloading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Downloading...
              </>
            ) : (
              <>
                <Download className="mr-2 h-5 w-5" />
                Download Excel
              </>
            )}
          </Button>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card className="p-6 shadow-elegant">
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Inventory Items
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 font-semibold">Item</th>
                <th className="text-right py-3 px-4 font-semibold">Count</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(inventory).map(([item, count], index) => (
                <tr
                  key={item}
                  className="border-b border-border/50 hover:bg-gradient-hero transition-colors"
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <td className="py-3 px-4">{item}</td>
                  <td className="text-right py-3 px-4">
                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold">
                      {count}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Transcription */}
      <Card className="p-6 shadow-elegant">
        <h3 className="text-xl font-semibold mb-4">Transcription</h3>
        <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
          {transcription}
        </p>
      </Card>
    </div>
  );
};
