"use client";

import Image from "next/image";
import { FiDownload } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { saveAudio, getAllAudios, deleteAudio } from "../utils/indexeddb";
import { useEffect, useState } from "react";

const AudioList = ({
  listType,
  showAudioList,
  handleShowPlayer,
  selection,
}: any) => {
  const [list, setList] = useState<any>();

  useEffect(() => {
    if (listType === "online") {
      fetchOnlineAudios();
    } else {
      fetchDownloadedAudios();
    }
  }, []);

  const fetchOnlineAudios = async () => {
    try {
      const response = await fetch("/api/audio");
      if (!response.ok) {
        throw new Error("Failed to fetch audio list");
      }
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.error("Failed to fetch audio list", error);
    }
  };

  const fetchDownloadedAudios = async () => {
    try {
      const allAudios = await getAllAudios();
      setList(allAudios);
    } catch (error) {
      console.error("Failed to fetch downloaded audios", error);
    }
  };

  const showAudioPlayer = () => {
    handleShowPlayer();
  };

  const selectAudio = (item: any) => {
    // let aud = listType === "online" ? item.id : item;
    // selection(aud, listType);
    selection(item, listType);
    showAudioPlayer();
  };

  const handleDownload = async (id: any) => {
    try {
      // const response = await fetch(`/api/download-audio?id=${id}`);
      const response = await fetch(`/api/download-audio?id=${id}`);
      if (!response.ok) {
        throw new Error("Failed to download audio");
      }
      const arrayBuffer = await response.arrayBuffer();
      const iddd = `audio_${Date.now()}`;
      console.log(iddd, arrayBuffer, "pppppppppp");
      await saveAudio(iddd, arrayBuffer);
      fetchOnlineAudios();
    } catch (error) {
      console.error("Failed to download audio", error);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      await deleteAudio(id);
      fetchDownloadedAudios();
    } catch (error) {
      console.error("Failed to delete audio", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-slate-600 to-slate-300 max-h-screen w-full">
      <div className="lg:mx-20 mx-10 flex flex-col">
        <div className="flex flex-row justify-between items-center h-1/12 pt-8">
          <Image
            src="/sample5.jpg"
            alt="Audio Thumbnail"
            height={200}
            width={200}
            className="lg:w-2/12 w-3/12 rounded-xl shadow-lg"
          />
          <button
            className="flex flex-row items-center gap-2 hover:bg-white/10 hover:shadow-xl p-2 rounded-lg duration-300"
            onClick={showAudioList}
          >
            <IoMdClose size={25} />
            Schließen
          </button>
        </div>
        <ul className="mt-4 flex flex-col gap-3 overflow-auto flex-1">
          {list?.length > 0 ? (
            list?.map(
              (
                item: {
                  id: number;
                  name: string;
                  detail: string;
                  duration: string;
                },
                index: number
              ) => (
                <li
                  key={item?.id}
                  className="rounded-lg py-0 px-4 bg-white/80 text-black hover:shadow-xl duration-300 cursor-pointer flex flex-row items-center"
                >
                  <div
                    className="w-full py-3"
                    onClick={() => selectAudio(item)}
                  >
                    <h1 className="font-semibold text-lg">
                      {item?.name || item?.id}
                    </h1>
                    <p className="text-sm">{item?.detail}</p>
                    <p className="text-gray-500 mt-1">{item?.duration}</p>
                  </div>
                  <div>
                    {listType === "online" ? (
                      <button
                        className="hover:bg-blue-500 hover:text-white p-3 rounded-full duration-300"
                        onClick={() => handleDownload(item?.id)}
                      >
                        <FiDownload size={30} />
                      </button>
                    ) : (
                      <button
                        className="hover:bg-red-500 hover:text-white p-3 rounded-full duration-300"
                        onClick={() => handleDelete(item?.id)}
                      >
                        <MdDeleteOutline size={30} />
                      </button>
                    )}
                  </div>
                </li>
              )
            )
          ) : (
            <p className="text-center">No audio found</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AudioList;
