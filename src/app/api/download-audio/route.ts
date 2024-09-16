import { NextResponse } from 'next/server';

const audioFiles: Record<string, string> = {
    1: 'https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3',
    2: 'https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample2.mp3',
    3: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Toreador_song_cleaned.ogg',
    4: "https://upload.wikimedia.org/wikipedia/commons/4/49/Wikipedia.ogg",
    5: "https://fliegenglas.app/wp-content/uploads/2024/07/22gg240800.mp3"
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
        const buffer = await response.arrayBuffer();

        return new NextResponse(buffer, {
            headers: {
                'Content-Type': 'audio/mpeg',
                'Content-Disposition': `attachment; filename="${audioId}.mp3"`,
            },
        });
    } catch (error) {
        console.error('Error fetching audio:', error);
        return NextResponse.json({ error }, { status: 500 });
    }
}
