import { get } from "@/composable/useApi";

export async function getLanguagesList() {
    try {
        return await get('3/configuration/languages').then(res => {
            if (res.status === 200) {
                return res.data;
            }
            return null;
        });
    } catch (e) {
        console.error('Error fetching languages list:', e);
        return null;
    }
}
