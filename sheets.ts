type Sheet = {
    id: number,
    numbers: Array<number>
}

type Thing = {
    [key: number]: Array<
        {
           sheetId: number,
           neighbors: Array<number>,
           missingNeighbors: Array<number>
        }
    >
}

type Result = {
    isBingo?: boolean,
    isDouble?: boolean,
    isBlank?: boolean,
    isPoint?: boolean,
    bingoCombo?: Array<number>,
    updatedBingoThing: Thing
}

export const sheets = [
    {
        id: 0,
        numbers:
            [
                91, 70, 39, 63,  7,
                25, 46, 82, 18, 54,
                79, 68, 13, 22, 86,
                2, 57, 35, 94, 40,
                43,  1, 72, 26, 80
            ]
    },
    {
        id: 1,
        numbers:
            [
                10, 81, 54, 29, 47,
                64,  4, 76, 13, 92,
                70, 95, 50, 44, 16,
                28, 26, 33, 77, 40,
                11, 53, 89, 56,  2
            ]
    },
    {
        id: 2,
        numbers:
            [
                99, 99, 99, 99, 99,
                99, 99, 99, 99, 99,
                99, 99, 99, 99, 99,
                99, 99, 99, 99, 99,
                99, 99, 99, 99, 99
            ]
    },
    {
        id: 3,
        numbers:
            [
                999, 999, 999, 999, 999,
                999, 999, 999, 999, 999,
                999, 999, 999, 999, 999,
                999, 999, 999, 999, 999,
                999, 999, 999, 999, 999
            ]
    },
    {
        id: 4,
        numbers:
            [
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0,
                0, 0, 0, 0, 0
            ]
    }
];

export const createTheBingoThing = (sheets: Array<Sheet>) => {
    const theThing: Thing = {};
    sheets.map(sheet => {
        sheet.numbers.map(num => theThing[num] = []);
    });

    const addNeighbors = (bingo: Array<number>, sheetId: number) => bingo.map(x => {
        const neighbors = [];
        for (let n = 0; n < 5; n++) {
            if (bingo[n] !== x) {
                neighbors.push(bingo[n]);
            }
        }
        theThing[x].push({
            sheetId,
            neighbors: neighbors,
            missingNeighbors: neighbors
        });
    });

    sheets.map(sheet => {
        // rows
        const v = sheet.numbers;
        const id = sheet.id;
        for (let i = 0; i < 25; i += 5) {
            // get all values from this row
            const bingo = [v[i], v[i + 1], v[i + 2], v[i + 3], v[i + 4]];
            // add all bingo values except itself to each member as neighbors
            addNeighbors(bingo, id);
        }
        // cols
        for (let i = 0; i < 5; i++) {
            // get all values from this row
            const bingo = [v[i], v[i + 5], v[i + 10], v[i + 15], v[i + 20]];
            // add all bingo values except itself to each member as neighbors
            addNeighbors(bingo, id);
        }

        // \ diagonal
        const bingoTopLeftBottomRight = [v[0], v[6], v[12], v[18], v[24]];
        addNeighbors(bingoTopLeftBottomRight, id);

        // / diagonal
        const bingoBottomLeftTopRight = [v[20], v[16], v[12], v[8], v[4]];
        addNeighbors(bingoBottomLeftTopRight, id);

    });
    console.log(theThing);
    return theThing;
};

export const bingoCheck = (cap: number, theThing: Thing, myCaps: Array<number>): Result => {
    const entry = theThing[cap];

    if (entry === undefined) {
        if (myCaps.includes(cap)) {
            return {
                isDouble: true,
                updatedBingoThing: theThing
            }
        }

        return {
            isBlank: true,
            updatedBingoThing: theThing
        }
    }

    if (entry.some(bingos => bingos.missingNeighbors.length === 0)) {
        const theBingo = entry.find(bingo => bingo.missingNeighbors.length === 0);
        return {
            isBingo: true,
            updatedBingoThing: theThing,
			// @ts-ignore
            bingoCombo: [...theBingo.neighbors, cap]
        }
    } else {
        // remove itself as missing from its neighbors
        entry.map(bingo => {
            bingo.missingNeighbors.map(x =>
                theThing[x].map(y => {
                    const i = y.missingNeighbors.findIndex(z => z === cap);
                    y.missingNeighbors.splice(i, 1);
                }
            ));
        });
        delete theThing[cap];
        return {
            isPoint: true,
            updatedBingoThing: theThing
        }
    }
};