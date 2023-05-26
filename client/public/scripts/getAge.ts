export function getYears(dob: Date) {
    const month_diff = Date.now() - dob.getTime();

    const age_dt = new Date(month_diff);

    const year = age_dt.getUTCFullYear();

    return Math.abs(year - 1970);
}

export function declOfNum(n: number, text_forms: string[]) {
    n = Math.abs(n) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) {
        return text_forms[2];
    }
    if (n1 > 1 && n1 < 5) {
        return text_forms[1];
    }
    if (n1 == 1) {
        return text_forms[0];
    }
    return text_forms[2];
}