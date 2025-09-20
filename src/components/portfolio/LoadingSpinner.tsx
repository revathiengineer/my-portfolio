import React from 'react';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

export const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Card className="p-8 text-center">
      <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
      <p className="text-muted-foreground">Loading portfolio...</p>
    </Card>
  </div>
);

export const ErrorState: React.FC<{ error: string }> = ({ error }) => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <Card className="p-8 text-center max-w-md">
      <h2 className="text-xl font-semibold mb-2 text-destructive">Error</h2>
      <p className="text-muted-foreground">{error}</p>
    </Card>
  </div>
);