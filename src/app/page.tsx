"use client";

import { useState } from "react";
import FliegenglasAudioPlayer from "./components/FliegenglasAudioPlayer";
import AudioList from "./components/AudioList";

const Home: React.FC = () => {
  const [showList, setShowList] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const [listType, setListType] = useState([]);
  const [selectedAudio, setSelectedAudio] = useState<any>();

  const [selectedAudioAndType, setSelectedAudioAndType] = useState({
    audio: "",
    type: "",
  });

  const handleShowList = (type: any) => {
    setShowList(!showList);
    setListType(type);
  };

  const showAudioList = () => {
    setShowList(!showList);
  };

  const showAudioListAndHidePlayer = () => {
    setShowList(true);
    setShowPlayer(false);
  };

  const handleShowPlayer = () => {
    setShowPlayer(!showPlayer);
    showAudioList();
  };

  const handleCloseBothListPlayer = () => {
    setShowList(false);
    setShowPlayer(false);
  };

  const selection = (audio: any, type: string) => {
    setSelectedAudioAndType({ audio, type });
  };

  return (
    <div>
      {!showList && !showPlayer && (
        <div className="mx-20 flex flex-row gap-5 h-screen justify-center items-center">
          <button
            className="border hover:bg-white hover:text-black rounded-lg p-10 duration-300 text-xl"
            onClick={() => handleShowList("online")}
          >
            Online audios
          </button>
          <button
            className="border hover:bg-white hover:text-black rounded-lg p-10 duration-300 text-xl"
            onClick={() => handleShowList("offline")}
          >
            Offline audios
          </button>
        </div>
      )}
      <div
        className={`transition-opacity duration-500 ease-in-out ${
          showList ? "opacity-100" : "opacity-0"
        }`}
      >
        {showList && (
          <AudioList
            listType={listType}
            showAudioList={showAudioList}
            handleShowPlayer={handleShowPlayer}
            selection={selection}
          />
        )}
      </div>
      <div
        className={`transition-transform duration-500 ease-in-out flex items-center justify-center ${
          showPlayer ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {showPlayer && (
          <FliegenglasAudioPlayer
            audioDetail={selectedAudioAndType}
            handleShowPlayer={handleShowPlayer}
            showAudioListAndHidePlayer={showAudioListAndHidePlayer}
            handleCloseBothListPlayer={handleCloseBothListPlayer}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
