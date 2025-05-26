import { Settings } from 'lucide-react';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/80 px-4 backdrop-blur md:px-6">
      <h1 className="text-xl font-semibold">MindBooth</h1>
      <SidebarTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Open Settings</span>
        </Button>
      </SidebarTrigger>
    </header>
  );
}
