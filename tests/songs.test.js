import { songs } from '../src/data'; 
import { getAllArtists, getSongsFromArtist, orderAlphabetically, orderByYear, songsByGenre, minutsToSeconds, getLongestSong } from '../src/songs';


//Exercice 1
describe('function "get all artists"', () => {
    it('should be declared', () => {
        expect(typeof getAllArtists).toBe('function');
    });

    it('should return an array', () => {
        expect(getAllArtists(songs) instanceof Array).toBe(true);
    });

    it('should return a new array, not update the original one', () => {
        expect(getAllArtists(songs)).not.toEqual(songs);
    });

    it('should return a new array with the same length as the original one', () => {
        const testArr = [
            {
                title: "Baby, I Love You",
                year: 1980,
                artist: "The Ramones",
                album: "End of the Century",
                duration: "3min 50sec",
                genre: ["Rock", "Punk"]
            },
            {
                title: "April 29, 1992",
                year: 1996,
                artist: "Sublime",
                album: "Sublime",
                duration: "4min 30sec",
                genre: ["Rock", "Punk", "Reggae", "Ska"]
            }
        ];
        expect(getAllArtists(testArr)).toEqual([
            'The Ramones',
            'Sublime'
        ]);
    });
});

//Exercise 2
describe('function "getSongsFromArtist"', () => {
    it('should be declared', () => {
        expect(typeof getSongsFromArtist).toBe('function');
    });

    it('should return an array', () => {
        expect(getSongsFromArtist(songs) instanceof Array).toBe(true);
    });

    it('should return a new array, not update the original one', () => {
        expect(getSongsFromArtist(songs)).not.toEqual(songs);
    });

    it('should return a new array with the songs from artist', () => {
        const testArr = [
            {
                title: "When You Gonna Learn?",
                year: 1993,
                artist: "Jamiroquai",
                album: "Emergency on Planet Earth",
                duration: "3min 50sec",
                genre: ["Jazz", "Funk", "Pop"]
            },
            {
                title: "Back to Black",
                year: 2006,
                artist: "Amy Winehouse",
                album: "Back to Black",
                duration: "4min 01sec",
                genre: ["Jazz", "R&B", "Blues", "Soul", "Ska"]
            }
        ];
        expect(getSongsFromArtist(testArr, 'Jamiroquai')).toEqual([
            {
                title: "When You Gonna Learn?",
                year: 1993,
                artist: "Jamiroquai",
                album: "Emergency on Planet Earth",
                duration: "3min 50sec",
                genre: ["Jazz", "Funk", "Pop"]
            }
        ]);
    });
});

//Exercise 3
describe('function "orderAlphabetically"', () => {
    it('should be declared', () => {
        expect(typeof orderAlphabetically).toBe('function');
    });

    it('should return an array', () => {
        expect(typeof orderAlphabetically([])).toBe('object');
    });

    it('should return a new array, not update the original one', () => {
        const arr = [{ title:'xyz' },{ title: 'abc'}];
        orderAlphabetically(arr);
        expect(arr[0].title).toEqual('xyz')
    });

    it('should only return the title of the song, each value should be a string', () => {
        expect(typeof orderAlphabetically([{ title: 'aab' }])[0]).toBe('string');
    });

    it('should return all items when the array passed has fewer than 3 items', () => {
        const arr = [{ title: 'aab'}, {title: 'bab'}];
        expect(orderAlphabetically(arr)).toHaveLength(2);
    });

    it('should order them alphabetically.', () => {
        const arr = [
          { title: 'aab' },
          { title: 'aaa' },
          { title: 'abc' },
          { title: 'acb' },
          { title: 'abb' }
        ];
        expect(orderAlphabetically(arr)).toEqual([
          'aaa',
          'aab',
          'abb',
          'abc',
          'acb'
        ]);
      });

    it('should return the top 10 after ordering them alphabetically', () => {
        const arr = [
            { title: 'aab' },
            { title: 'bab' },
            { title: 'anc' },
            { title: 'cag' },
            { title: 'apo' },
            { title: 'dfr' },
            { title: 'eio' },
            { title: 'bbb' },
            { title: 'hyu' },
            { title: 'acb' },
            { title: 'acs' },
            { title: 'aaa' },
            { title: 'jkl' },
            { title: 'agb' },
            { title: 'afb' }
        ];
        expect(orderAlphabetically(arr)).toEqual([
            'aaa',
            'aab',
            'acb',
            'acs',
            'afb',
            'agb',
            'anc',
            'apo',
            'bab',
            'bbb'
        ]);
    });
});

//Exercise 4
describe('function "orderByYear"', () => {
    it('should be declared', () => {
        expect(typeof orderByYear).toBe('function');
    });
    it('should return an array', () => {
        expect(typeof orderByYear(songs)).toBe('object');
    });
    it('should return a new array, not update the original one', () => {
        const arr = [];
        expect(orderByYear(arr)).not.toBe(arr);
    });
    it('should return the element in a single element array', () => {
        expect(orderByYear([{ year: 1984 }])).toEqual([{ year: 1984 }]);
    });
    it('should return the new array in ascending order', () => {
        expect(orderByYear([{ year: 2000 }, { year: 1975 }, { year: 1984 }])).toEqual([{ year: 1975 }, { year: 1984 }, { year: 2000 }]);
    });
    it('should order songs with the same year by their title, alphabetically', () => {
        expect(orderByYear([
            { title: 'abc', year: 2000 },
            { title: 'bac', year: 1984 },
            { title: 'aab', year: 1984 }
        ])).toEqual([
            { title: 'aab', year: 1984 },
            { title: 'bac', year: 1984 },
            { title: 'abc', year: 2000 }
        ]);
    });
});

//Exercise 5
describe('function "songsByGenre"', () => {
    it('should be declared', () => {
        expect(typeof songsByGenre).toBe('function');
    });
    it('should return an array', () => {
        expect(typeof songsByGenre(songs)).toBe('object');
    });
    it('should return a new array, not update the original one', () => {
        expect(songsByGenre(songs)).not.toEqual(songs);
    });
    it('should return a new array with the songs with the genre asked', () => {
        const arr = [
            {
                title: "Island in the Sun",
                year: 2001,
                artist: "Weezer",
                album: "Weezer",
                duration: "3min 21sec",
                genre: ["Rock", "Pop"]
            },
            {
                title: "Hell",
                year: 1996,
                artist: "Squirrel Nut Zippers",
                album: "Hot",
                duration: "3min 13sec",
                genre: ["Jazz"]
            },
            {
                title: "Back to Black",
                year: 2006,
                artist: "Amy Winehouse",
                album: "Back to Black",
                duration: "4min 01sec",
                genre: ["Jazz", "R&B", "Blues", "Soul", "Ska"]
            }
        ];
        expect(songsByGenre(arr, 'Jazz')).toEqual([
            {
                title: "Hell",
                year: 1996,
                artist: "Squirrel Nut Zippers",
                album: "Hot",
                duration: "3min 13sec",
                genre: ["Jazz"]
            },
            {
                title: "Back to Black",
                year: 2006,
                artist: "Amy Winehouse",
                album: "Back to Black",
                duration: "4min 01sec",
                genre: ["Jazz", "R&B", "Blues", "Soul", "Ska"]
            }
        ]);
    });
});

//Exercise 6
describe('function "minutsToSeconds"', () => {
    it('should be declared', () => {
        expect(typeof minutsToSeconds).toBe('function');
    });
    it('should return an array', () => {
        expect(minutsToSeconds(songs) instanceof Array).toBe(true);
    });
    it('should return a new array, not update the original one', () => {
        expect(minutsToSeconds(songs)).not.toEqual(songs);
    });
    it('should return a new array of songs with duration as a number', () => {
        expect(typeof minutsToSeconds(songs)[0].duration).toBe('number');
    });
    it('should return an array of songs with the correct duration for a 3min 30sec song', () => {
        const arr = [{ duration: '3min 30sec' }];
        expect(minutsToSeconds(arr)[0].duration).toBe(210);
    });
    it('should return an array of songs with the correct duration for a 0min 56sec song', () => {
        const arr = [{ duration: '0min 56sec' }];
        expect(minutsToSeconds(arr)[0].duration).toBe(56);
    });
    it('should return an array of songs with the correct duration for a 10min 00sec song', () => {
        const arr = [{ duration: '10min 00sec' }];
        expect(minutsToSeconds(arr)[0].duration).toBe(600);
    });
});

//Exercise 7
describe('function "getLongestSong"', () => {
    it('should be declared', () => {
        expect(typeof getLongestSong).toBe('function');
    });
    it('should return an array', () => {
        expect(getLongestSong(songs) instanceof Array).toBe(true);
    });
    it('should return a new array, not update the original one', () => {
        expect(getLongestSong(songs)).not.toEqual(songs);
    });
    //Bug in review
    /* it('should return an array of songs with duration as a number', () => {
        expect(typeof getLongestSong(songs)[0].duration).toBe('number');
    }); */
    it('should return an array of songs with the longest song', () => {
        const arr = [
            { title: "Lust For Life", duration: "2min 35sec" },
            { title: "Here Comes Your Man", duration: "5min 12sec" }
        ];
        expect(getLongestSong(arr)).toEqual([
            { title: 'Here Comes Your Man', duration: 312 }
        ]);
    });
    it('should return an array of objects that share the same duration', () => {
        const arr = [
            { title: "Lust For Life", duration: "5min 12sec" },
            { title: "Here Comes Your Man", duration: "3min 20sec" },
            { title: "Enjoy", duration: "5min 12sec" }
        ];
        expect(getLongestSong(arr)).toEqual([
            { title: "Lust For Life", duration: 312 },
            { title: "Enjoy", duration: 312 }
        ]);
    });
});

//Exercise 8
//Write the getShortestSong() test