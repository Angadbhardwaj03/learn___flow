import { WifiOff } from "lucide-react";

export function ErrorState({ message }: { message?: string }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-3 rounded-tile border border-ink-700 bg-ink-900 px-6 py-12 text-center">
      <WifiOff className="h-6 w-6 text-paper-faint" />
      <p className="text-sm font-medium text-paper">
        Couldn&apos;t reach your course data
      </p>
      <p className="max-w-sm text-xs text-paper-dim">
        {message ??
          "The Supabase connection didn't respond. Check your environment variables and try refreshing."}
      </p>
    </div>
  );
}
