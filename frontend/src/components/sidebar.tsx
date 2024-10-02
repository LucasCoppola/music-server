import { Plus } from "lucide-react";
import Login from "./login";
import SearchInput from "./search";
import { Button } from "./ui/button";
import UploadSong from "./upload-song";

export default function Sidebar() {
  return (
    <div className="w-56 p-4 bg-[#121212] flex flex-col space-y-6">
      <div className="space-y-3">
        <Login />
        <SearchInput />
      </div>

      <div className="text-xs">All Tracks</div>

      <div className="flex items-center justify-between dark">
        <span className="text-xs font-semibold text-gray-400">Playlists</span>
        <Button variant="ghost" size="icon" className="h-6 w-6">
          <Plus className="h-3 w-3" />
          <span className="sr-only">Add Playlist</span>
        </Button>
      </div>

      <div className="space-y-2 flex-grow">
        <div className="text-xs">YouTube</div>
        <div className="text-xs">SoundCloud</div>
      </div>
      <UploadSong />
    </div>
  );
}
