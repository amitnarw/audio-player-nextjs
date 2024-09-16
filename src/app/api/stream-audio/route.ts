import { NextResponse } from 'next/server';

const audioFiles: Record<string, string> = {
  1: 'https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3',
  2: 'https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample2.mp3',
  3: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Toreador_song_cleaned.ogg',
  4: "https://upload.wikimedia.org/wikipedia/commons/4/49/Wikipedia.ogg",
  5: "https://filesamples.com/samples/audio/mp3/Symphony%20No.6%20(1st%20movement).mp3"
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const audioId = url.searchParams.get('id');
    const remoteAudioUrl = audioFiles[audioId || ''];

    if (!remoteAudioUrl) {
      throw new Error('Invalid audio ID');
    }

    const response = await fetch(remoteAudioUrl);

    if (!response.ok) {
      throw new Error('Failed to fetch the audio file');
    }

    const audioStream = response.body;
    if (audioStream) {
      return new NextResponse(audioStream, {
        headers: {
          'Content-Type': 'audio/mpeg',
        },
      });
    }

    throw new Error('Audio stream is not available');
  } catch (error) {
    console.error('Error fetching audio:', error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
