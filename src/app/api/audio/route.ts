import { NextResponse } from 'next/server';

const audioList = [
    {
        id: 1,
        name: 'Sample 1',
        image: "sample1.jpg",
        detail: 'qwerty uiop',
        duration: "02:30",
        // url: 'https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3',
    },
    {
        id: 2,
        name: 'Sample 2',
        image: "sample2.jpg",
        detail: 'q eeq qe qwe ',
        duration: "02:22",
        // url: 'https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample2.mp3',
    },
    {
        id: 3,
        name: 'Sample 3',
        image: "sample3.jpg",
        detail: 'asdqwe qa',
        duration: "01:20",
        // url: 'https://upload.wikimedia.org/wikipedia/commons/4/40/Toreador_song_cleaned.ogg',
    },
    {
        id: 4,
        name: 'Sample 4',
        image: "sample4.jpg",
        detail: 'et egr tew',
        duration: "07:43",
        // url: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Wikipedia.ogg',
    },
    {
        id: 5,
        name: 'Sample 5',
        image: "sample5.jpg",
        detail: 'j 729bedwahei',
        duration: "04:05",
        // url: 'https://filesamples.com/samples/audio/mp3/Symphony%20No.6%20(1st%20movement).mp3',
    },
];

export async function GET() {
    return NextResponse.json(audioList);
}