import { useI18n } from 'vue-i18n';

export function useTimeAgoMessage() {
    const { t, locale } = useI18n();
    function setTimeAgoMessage(timestamp: string | Date) {
        const now = new Date();
        let date: Date;
        if (typeof timestamp === 'string') {
            if (timestamp.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}\.\d+$/)) {
                const isoFormat = timestamp.replace(' ', 'T') + 'Z';
                date = new Date(isoFormat);
            } else {
                date = new Date(timestamp);
            }
        } else {
            date = timestamp;
        }

        const userOffset = now.getTimezoneOffset() * 60000;
        const localDate = new Date(date.getTime() - userOffset);

        const diffMs = now.getTime() - localDate.getTime();

        const diffSeconds = Math.floor(diffMs / 1000);

        if (diffSeconds < 60) {
            return { value: t('TIME_AGO.JUST_NOW') };
        }

        if (diffSeconds < 3600) {
            const minutes = Math.floor(diffSeconds / 60);
            if (minutes === 1) {
                return { value: t('TIME_AGO.MINUTE_AGO') };
            }
            return { value: t('TIME_AGO.MINUTES_AGO', { n: minutes }) };
        }

        if (diffSeconds < 86400) {
            const hours = Math.floor(diffSeconds / 3600);
            if (hours === 1) {
                return { value: t('TIME_AGO.HOUR_AGO') };
            }
            return { value: t('TIME_AGO.HOURS_AGO', { n: hours }) };
        }

        if (diffSeconds < 604800) {
            const days = Math.floor(diffSeconds / 86400);
            if (days === 1) {
                return { value: t('TIME_AGO.DAY_AGO') };
            }
            return { value: t('TIME_AGO.DAYS_AGO', { n: days }) };
        }

        if (diffSeconds < 2592000) {
            const weeks = Math.floor(diffSeconds / 604800);
            if (weeks === 1) {
                return { value: t('TIME_AGO.WEEK_AGO') };
            }
            return { value: t('TIME_AGO.WEEKS_AGO', { n: weeks }) };
        }

        if (diffSeconds < 31536000) {
            const months = Math.floor(diffSeconds / 2592000);
            if (months === 1) {
                return { value: t('TIME_AGO.MONTH_AGO') };
            }
            return { value: t('TIME_AGO.MONTHS_AGO', { n: months }) };
        }

        const years = Math.floor(diffSeconds / 31536000);
        if (years === 1) {
            return { value: t('TIME_AGO.YEAR_AGO') };
        }
        return { value: t('TIME_AGO.YEARS_AGO', { n: years }) };
    }

    return {
        setTimeAgoMessage,
    }
}
