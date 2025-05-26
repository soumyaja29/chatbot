import type { ChatSettings } from '@/types';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SidebarHeader, SidebarContent, SidebarTitle, SidebarDescription } from '@/components/ui/sidebar';

interface SettingsPanelProps {
  settings: ChatSettings;
  onSettingsChange: (newSettings: Partial<ChatSettings>) => void;
}

export function SettingsPanel({ settings, onSettingsChange }: SettingsPanelProps) {
  return (
    <>
      <SidebarHeader>
        <SidebarTitle>Chatbot Settings</SidebarTitle>
        <SidebarDescription>Customize the chatbot's behavior.</SidebarDescription>
      </SidebarHeader>
      <SidebarContent className="p-4 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="tone-select">Tone</Label>
          <Select
            value={settings.tone}
            onValueChange={(value: ChatSettings['tone']) => onSettingsChange({ tone: value })}
          >
            <SelectTrigger id="tone-select">
              <SelectValue placeholder="Select tone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="formal">Formal</SelectItem>
              <SelectItem value="friendly">Friendly</SelectItem>
              <SelectItem value="humorous">Humorous</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="style-select">Style</Label>
          <Select
            value={settings.style}
            onValueChange={(value: ChatSettings['style']) => onSettingsChange({ style: value })}
          >
            <SelectTrigger id="style-select">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="concise">Concise</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </SidebarContent>
    </>
  );
}
