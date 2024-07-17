/*
 * @lc app=leetcode id=401 lang=typescript
 *
 * [401] Binary Watch
 */

// @lc code=start
function timeFormatter(hour: number, minute: number): string {
    return `${hour}:${minute < 10 ? '0' + minute : minute}`;
}

function readBinaryWatch(turnedOn: number): string[] {
    if (turnedOn > 8) {
        return [];
    }

    const hours: number[] = [1, 2, 4, 8];
    const minutes: number[] = [1, 2, 4, 8, 16, 32];
    const result: string[] = [];

    const backtrack = (
        hour: number,
        minute: number,
        turnedOn: number,
        hours: number[],
        minutes: number[],
        isCalcHour: boolean
    ): void => {
        if (turnedOn === 0) {
            result.push(timeFormatter(hour, minute));

            return;
        }

        if (isCalcHour) {
            for (const i in hours) {
                const tmpHour = hours[i];
                if (hour + tmpHour < 12) {
                    const tmpHours = hours.slice(+i + 1);
                    backtrack(
                        hour + tmpHour,
                        minute,
                        turnedOn - 1,
                        tmpHours,
                        minutes,
                        true
                    );
                }
            }
        }

        for (const i in minutes) {
            const tmpMinute = minutes[i];
            if (minute + tmpMinute < 60) {
                const tmpMintues = minutes.slice(+i + 1);
                backtrack(
                    hour,
                    minute + tmpMinute,
                    turnedOn - 1,
                    hours,
                    tmpMintues,
                    false
                );
            }
        }
    };

    backtrack(0, 0, turnedOn, hours, minutes, true);

    return result;
}
// @lc code=end
