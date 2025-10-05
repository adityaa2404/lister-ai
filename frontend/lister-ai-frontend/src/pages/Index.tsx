import { useState } from "react";
import { Mic2, Sparkles } from "lucide-react";
import { AudioUploader } from "@/components/AudioUploader";
import { InventoryResults } from "@/components/InventoryResults";

const Index = () => {
  const [results, setResults] = useState<{
    inventory: Record<string, number>;
    transcription: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-primary">
              <Mic2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                LISTER - AI
              </h1>
              <p className="text-sm text-muted-foreground">
                Speak your list. Get your Excel.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Hero Section */}
          {!results && (
            <div className="text-center space-y-4 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-hero border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">AI-Powered Inventory Processing</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Transform Audio into
                <span className="block bg-gradient-primary bg-clip-text text-transparent mt-2">
                  Structured Data
                </span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Upload your inventory audio recordings and let our AI extract, organize, 
                and format your data automatically.
              </p>
            </div>
          )}

          {/* Upload Section */}
          {!results ? (
            <AudioUploader onUploadComplete={setResults} />
          ) : (
            <div className="space-y-6">
              <button
                onClick={() => setResults(null)}
                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                ← Upload another audio file
              </button>
              <InventoryResults
                inventory={results.inventory}
                transcription={results.transcription}
              />
            </div>
          )}

          {/* Features */}
          {!results && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
              <div className="p-6 rounded-lg bg-card border border-border hover:shadow-elegant transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                  <Mic2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">Audio Transcription</h3>
                <p className="text-sm text-muted-foreground">
                  Accurate speech-to-text conversion for your inventory recordings
                </p>
              </div>

              <div className="p-6 rounded-lg bg-card border border-border hover:shadow-elegant transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                  <Sparkles className="h-6 w-6 text-accent" />
                </div>
                <h3 className="font-semibold mb-2">AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Smart extraction of items and quantities from your transcription
                </p>
              </div>

              <div className="p-6 rounded-lg bg-card border border-border hover:shadow-elegant transition-all duration-300">
                <div className="h-12 w-12 rounded-lg bg-gradient-hero flex items-center justify-center mb-4">
                  <svg className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold mb-2">Excel Export</h3>
                <p className="text-sm text-muted-foreground">
                  Download organized data in Excel format for easy management
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;
